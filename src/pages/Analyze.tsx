import { useState, useRef } from "react";
import { Camera, Upload, History, CheckCircle, Loader2, X, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CornerFrame } from "@/components/ui/corner-frame";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAnalysisHistory, AnalysisResult } from "@/hooks/use-analysis-history";

interface AnalysisResponse {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  keyRecommendation: string;
  techniquesIdentified: string[];
  error?: string;
}

export default function Analyze() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
  
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

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, or WEBP)");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setCurrentResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

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
          body: JSON.stringify({ imageData: selectedImage }),
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

      // Compress image for storage
      const thumbnail = await compressImage(selectedImage, 200);
      
      const result = saveToHistory({
        thumbnail,
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
    setSelectedImage(null);
    setCurrentResult(null);
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
        {score}
      </span>
    );
  };

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
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Main Analysis Card */}
        {!selectedImage ? (
          <CornerFrame className="bg-card border border-border/50 p-6 md:p-8 lg:p-12">
            <div className="text-center space-y-4 md:space-y-6">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera className="h-8 w-8 md:h-10 md:w-10 text-primary" />
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
                  Upload Image
                </Button>
              </div>
            </div>
          </CornerFrame>
        ) : !currentResult ? (
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
                    src={selectedImage} 
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
                    onClick={handleAnalyze}
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
        ) : (
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
                      src={selectedImage} 
                      alt="Analyzed archery form" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  {/* Strengths */}
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

                  {/* Improvements */}
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

                  {/* Key Recommendation */}
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                      💡 Key Recommendation
                    </h3>
                    <p className="text-sm">{currentResult.keyRecommendation}</p>
                  </div>

                  {/* Techniques */}
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
                    Upload your first photo to get AI feedback on your technique
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
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded overflow-hidden bg-secondary/30 flex-shrink-0">
                        <img 
                          src={item.thumbnail} 
                          alt="Analysis thumbnail" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {renderScoreBadge(item.overallScore)}
                          <div>
                            <p className="text-sm font-medium">
                              {new Date(item.analyzedAt).toLocaleDateString()}
                            </p>
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
                          <p className="text-xs">{item.keyRecommendation}</p>
                        </div>
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
