import { useState, useRef } from "react";
import { Camera, Upload, History, CheckCircle, Loader2, X, Trash2, ChevronDown, ChevronUp, Video, Film, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CornerFrame } from "@/components/ui/corner-frame";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAnalysisHistory, AnalysisResult, FrameAnalysis } from "@/hooks/use-analysis-history";
import { FrameTimeline, ExtractedFrame } from "@/components/analyze/FrameTimeline";
import { FrameAnalysisView } from "@/components/analyze/FrameAnalysisView";
import { ScoreProgressionChart } from "@/components/analyze/ScoreProgressionChart";

interface AnalysisResponse {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  keyRecommendation: string;
  techniquesIdentified: string[];
  error?: string;
}

const FRAME_LABELS = [
  "Setup",
  "Draw Start",
  "Mid Draw",
  "Anchor",
  "Aim",
  "Release",
  "Follow-through",
];

export default function Analyze() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
  
  // Video frame analysis state
  const [extractedFrames, setExtractedFrames] = useState<ExtractedFrame[]>([]);
  const [isExtractingFrames, setIsExtractingFrames] = useState(false);
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
  const [frameAnalyses, setFrameAnalyses] = useState<Record<string, AnalysisResponse>>({});
  const [analyzingFrameId, setAnalyzingFrameId] = useState<string | null>(null);
  const [isAnalyzingAll, setIsAnalyzingAll] = useState(false);
  
  const { history, saveToHistory, deleteFromHistory, totalAnalyses } = useAnalysisHistory();

  const compressImage = (dataUrl: string, maxWidth = 800): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.src = dataUrl;
    });
  };

  const extractVideoFrames = async (videoUrl: string): Promise<ExtractedFrame[]> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.src = videoUrl;
      video.muted = true;
      
      video.onloadedmetadata = async () => {
        const duration = video.duration;
        const frames: ExtractedFrame[] = [];
        const numFrames = Math.min(FRAME_LABELS.length, Math.max(3, Math.floor(duration)));
        
        for (let i = 0; i < numFrames; i++) {
          const timestamp = (duration / (numFrames + 1)) * (i + 1);
          video.currentTime = timestamp;
          
          await new Promise<void>((res) => {
            video.onseeked = () => res();
          });
          
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(video, 0, 0);
          
          frames.push({
            id: crypto.randomUUID(),
            timestamp,
            imageData: canvas.toDataURL("image/jpeg", 0.8),
            label: FRAME_LABELS[i] || `Frame ${i + 1}`,
          });
        }
        
        resolve(frames);
      };
      
      video.onerror = () => reject(new Error("Failed to load video"));
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast.error("Please select an image or video file");
      return;
    }

    const maxSize = isVideo ? 40 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File must be under ${isVideo ? "40MB" : "10MB"}`);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedMedia(dataUrl);
      setMediaType(isVideo ? "video" : "image");
      setCurrentResult(null);
      setExtractedFrames([]);
      setFrameAnalyses({});
      setSelectedFrameIndex(0);

      if (isVideo) {
        setIsExtractingFrames(true);
        try {
          const frames = await extractVideoFrames(dataUrl);
          setExtractedFrames(frames);
          toast.success(`${frames.length} key frames extracted from video`);
        } catch {
          toast.error("Could not extract frames from video");
        } finally {
          setIsExtractingFrames(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const analyzeFrame = async (frame: ExtractedFrame): Promise<AnalysisResponse | null> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-technique`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageData: frame.imageData, frameLabel: frame.label }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please wait and try again.");
          return null;
        }
        if (response.status === 402) {
          toast.error("AI credits depleted.");
          return null;
        }
        throw new Error("Analysis failed");
      }

      const data: AnalysisResponse = await response.json();
      if (data.error) throw new Error(data.error);
      return data;
    } catch (error) {
      console.error("Frame analysis error:", error);
      return null;
    }
  };

  const handleAnalyzeFrame = async (frame: ExtractedFrame) => {
    setAnalyzingFrameId(frame.id);
    const result = await analyzeFrame(frame);
    if (result) {
      setFrameAnalyses((prev) => ({ ...prev, [frame.id]: result }));
      toast.success(`${frame.label} analyzed`);
    } else {
      toast.error("Could not analyze this frame");
    }
    setAnalyzingFrameId(null);
  };

  const handleAnalyzeAllFrames = async () => {
    if (extractedFrames.length === 0) return;
    
    setIsAnalyzingAll(true);
    const results: Record<string, AnalysisResponse> = { ...frameAnalyses };
    
    for (const frame of extractedFrames) {
      if (results[frame.id]) continue;
      
      setAnalyzingFrameId(frame.id);
      const result = await analyzeFrame(frame);
      if (result) {
        results[frame.id] = result;
        setFrameAnalyses((prev) => ({ ...prev, [frame.id]: result }));
      }
      
      await new Promise((r) => setTimeout(r, 500));
    }
    
    setAnalyzingFrameId(null);
    setIsAnalyzingAll(false);
    
    const analyzedResults = Object.values(results);
    if (analyzedResults.length > 0) {
      const avgScore = analyzedResults.reduce((sum, r) => sum + r.overallScore, 0) / analyzedResults.length;
      const thumbnail = await compressImage(extractedFrames[0]?.imageData || "", 200);
      
      const frameAnalysesForHistory: FrameAnalysis[] = extractedFrames
        .filter((f) => results[f.id])
        .map((f) => {
          const result = results[f.id];
          return {
            frameId: f.id,
            timestamp: f.timestamp,
            label: f.label,
            thumbnail: f.imageData.substring(0, 100) + "...",
            overallScore: result.overallScore,
            strengths: result.strengths,
            improvements: result.improvements,
            keyRecommendation: result.keyRecommendation,
            techniquesIdentified: result.techniquesIdentified,
          };
        });
      
      saveToHistory({
        thumbnail,
        mediaType: "video",
        overallScore: avgScore,
        strengths: [...new Set(analyzedResults.flatMap((r) => r.strengths))].slice(0, 5),
        improvements: [...new Set(analyzedResults.flatMap((r) => r.improvements))].slice(0, 5),
        keyRecommendation: analyzedResults[0]?.keyRecommendation || "",
        techniquesIdentified: [...new Set(analyzedResults.flatMap((r) => r.techniquesIdentified))],
        frameAnalyses: frameAnalysesForHistory,
      });
      
      toast.success(`All ${analyzedResults.length} frames analyzed. Average: ${avgScore.toFixed(1)}/10`);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedMedia || mediaType !== "image") return;

    setIsAnalyzing(true);
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-technique`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageData: selectedMedia }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please wait a moment and try again.");
          return;
        }
        if (response.status === 402) {
          toast.error("AI credits depleted. Please add credits to continue.");
          return;
        }
        throw new Error("Analysis failed");
      }

      const data: AnalysisResponse = await response.json();
      
      if (data.error) {
        toast.error(data.error);
        return;
      }

      const thumbnail = await compressImage(selectedMedia, 200);
      
      const result = saveToHistory({
        thumbnail,
        mediaType: "image",
        overallScore: data.overallScore,
        strengths: data.strengths,
        improvements: data.improvements,
        keyRecommendation: data.keyRecommendation,
        techniquesIdentified: data.techniquesIdentified,
      });

      setCurrentResult(result);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedMedia(null);
    setMediaType(null);
    setCurrentResult(null);
    setExtractedFrames([]);
    setFrameAnalyses({});
    setSelectedFrameIndex(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderScoreBadge = (score: number) => {
    const color = score >= 8 ? "bg-green-500/20 text-green-400" :
                  score >= 6 ? "bg-amber-500/20 text-amber-400" :
                  "bg-red-500/20 text-red-400";
    return (
      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-xl font-bold ${color}`}>
        {score.toFixed(1)}
      </span>
    );
  };

  const selectedFrame = extractedFrames[selectedFrameIndex];

  return (
    <div className="animate-fade-in">
      <div className="container py-6 md:py-12 space-y-6 md:space-y-8">
        {/* Hero Header */}
        <div className="space-y-1 md:space-y-2">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Technique Analyzer
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            AI-powered form analysis for traditional archery
          </p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Main Upload Section */}
        {!selectedMedia && (
          <CornerFrame className="bg-card border border-border/50 p-6 md:p-8 lg:p-12">
            <div className="text-center space-y-4 md:space-y-6">
              <div className="flex justify-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Video className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
              </div>
              <div className="space-y-2 md:space-y-3">
                <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold">
                  Analyze Your Form
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                  Upload a photo or video of your shooting form for AI analysis based on classical techniques
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
                <Button 
                  size="lg" 
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Take Photo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1 border-border hover:bg-secondary/50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Upload Media
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Images up to 10MB • Videos up to 40MB
              </p>
            </div>
          </CornerFrame>
        )}

        {/* Image Analysis View */}
        {selectedMedia && mediaType === "image" && !currentResult && (
          <CornerFrame className="bg-card border border-border/50 p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <h2 className="font-display text-xl md:text-2xl font-bold">Preview</h2>
                <Button variant="ghost" size="icon" onClick={handleReset}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-64 rounded-lg overflow-hidden bg-secondary/30">
                  <img 
                    src={selectedMedia} 
                    alt="Selected archery form" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left space-y-4">
                  <p className="text-muted-foreground">
                    Ready to analyze your form using classical Islamic archery techniques.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    onClick={handleAnalyzeImage}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Form"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CornerFrame>
        )}

        {/* Image Results View */}
        {selectedMedia && mediaType === "image" && currentResult && (
          <CornerFrame className="bg-card border border-border/50 p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="font-display text-xl md:text-2xl font-bold">Analysis Results</h2>
                  {renderScoreBadge(currentResult.overallScore)}
                </div>
                <Button variant="ghost" size="icon" onClick={handleReset}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="aspect-square rounded-lg overflow-hidden bg-secondary/30">
                    <img 
                      src={selectedMedia} 
                      alt="Analyzed archery form" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wide">
                      ✓ Strengths
                    </h3>
                    <ul className="space-y-1">
                      {currentResult.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide">
                      ↑ Areas to Improve
                    </h3>
                    <ul className="space-y-1">
                      {currentResult.improvements.map((imp, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                      💡 Key Recommendation
                    </h3>
                    <p className="text-sm">{currentResult.keyRecommendation}</p>
                  </div>

                  {currentResult.techniquesIdentified.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {currentResult.techniquesIdentified.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border/50">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleReset}
                >
                  Analyze Another
                </Button>
              </div>
            </div>
          </CornerFrame>
        )}

        {/* Video Frame Analysis View */}
        {selectedMedia && mediaType === "video" && (
          <div className="space-y-4">
            {/* Video Preview */}
            <CornerFrame className="bg-card border border-border/50 p-6 md:p-8">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h2 className="font-display text-xl md:text-2xl font-bold">Video Preview</h2>
                  <Button variant="ghost" size="icon" onClick={handleReset}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="aspect-video rounded-lg overflow-hidden bg-secondary/30">
                  <video
                    src={selectedMedia}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {isExtractingFrames && (
                  <div className="flex items-center justify-center gap-2 py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Extracting frames...</span>
                  </div>
                )}
              </div>
            </CornerFrame>

            {/* Frame Timeline */}
            {extractedFrames.length > 0 && (
              <Card className="bg-card border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Film className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Frame-by-Frame Analysis</CardTitle>
                  </div>
                  <CardDescription>
                    Analyze each phase of your shot sequence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FrameTimeline
                    frames={extractedFrames}
                    selectedIndex={selectedFrameIndex}
                    onSelectFrame={setSelectedFrameIndex}
                    frameAnalyses={frameAnalyses}
                    analyzingFrameId={analyzingFrameId}
                    onAnalyzeFrame={handleAnalyzeFrame}
                    onAnalyzeAllFrames={handleAnalyzeAllFrames}
                    isAnalyzingAll={isAnalyzingAll}
                  />

                  <ScoreProgressionChart
                    frames={extractedFrames}
                    frameAnalyses={frameAnalyses}
                    selectedIndex={selectedFrameIndex}
                    onSelectFrame={setSelectedFrameIndex}
                  />

                  {selectedFrame && (
                    <FrameAnalysisView
                      frame={selectedFrame}
                      analysis={frameAnalyses[selectedFrame.id] || null}
                      frameIndex={selectedFrameIndex}
                      totalFrames={extractedFrames.length}
                      onPrevFrame={() => setSelectedFrameIndex(Math.max(0, selectedFrameIndex - 1))}
                      onNextFrame={() => setSelectedFrameIndex(Math.min(extractedFrames.length - 1, selectedFrameIndex + 1))}
                    />
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Analysis History Section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="font-display text-xl md:text-2xl font-semibold">Analysis History</h2>
          
          {history.length === 0 ? (
            <Card className="bg-card border-border/50">
              <CardContent className="py-8 md:py-12 text-center">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <History className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="text-sm md:text-base">No analyses</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="text-sm md:text-base">{totalAnalyses} improvements</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Upload your first photo or video to get AI feedback on your technique
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <Card key={item.id} className="bg-card border-border/50 overflow-hidden">
                  <CardContent className="p-4">
                    <div 
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => setExpandedHistoryId(expandedHistoryId === item.id ? null : item.id)}
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded overflow-hidden bg-secondary/30 flex-shrink-0 relative">
                        <img 
                          src={item.thumbnail} 
                          alt="Analysis thumbnail" 
                          className="w-full h-full object-cover"
                        />
                        {item.mediaType === "video" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Video className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {renderScoreBadge(item.overallScore)}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">
                                {new Date(item.analyzedAt).toLocaleDateString()}
                              </p>
                              {item.mediaType === "video" && item.frameAnalyses && (
                                <Badge variant="outline" className="text-xs">
                                  {item.frameAnalyses.length} frames
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.keyRecommendation.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFromHistory(item.id);
                            toast.success("Analysis deleted");
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        {expandedHistoryId === item.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {expandedHistoryId === item.id && (
                      <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-green-400 uppercase">Strengths</h4>
                            <ul className="space-y-1">
                              {item.strengths.map((s, i) => (
                                <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-amber-400 uppercase">Improvements</h4>
                            <ul className="space-y-1">
                              {item.improvements.map((imp, i) => (
                                <li key={i} className="text-xs text-muted-foreground">• {imp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="p-3 rounded bg-primary/10 border border-primary/20">
                          <span className="text-xs font-semibold">💡 </span>
                          <span className="text-xs">{item.keyRecommendation}</span>
                        </div>

                        {/* Frame breakdown for videos */}
                        {item.frameAnalyses && item.frameAnalyses.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground">Frame Scores</h4>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                              {item.frameAnalyses.map((frame) => (
                                <div key={frame.frameId} className="shrink-0 text-center">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                                    frame.overallScore >= 8 ? "bg-green-500/20 text-green-400" :
                                    frame.overallScore >= 6 ? "bg-amber-500/20 text-amber-400" :
                                    "bg-red-500/20 text-red-400"
                                  }`}>
                                    {frame.overallScore.toFixed(1)}
                                  </div>
                                  <p className="text-[10px] mt-1 text-muted-foreground">{frame.label}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
