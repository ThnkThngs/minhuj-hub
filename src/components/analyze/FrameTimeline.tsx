import { ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ExtractedFrame {
  id: string;
  timestamp: number;
  imageData: string;
  label: string;
}

interface FrameAnalysisResult {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  keyRecommendation: string;
  techniquesIdentified: string[];
}

interface FrameTimelineProps {
  frames: ExtractedFrame[];
  selectedIndex: number;
  onSelectFrame: (index: number) => void;
  frameAnalyses: Record<string, FrameAnalysisResult>;
  analyzingFrameId: string | null;
  onAnalyzeFrame: (frame: ExtractedFrame) => void;
  onAnalyzeAllFrames: () => void;
  isAnalyzingAll: boolean;
}

export function FrameTimeline({
  frames,
  selectedIndex,
  onSelectFrame,
  frameAnalyses,
  analyzingFrameId,
  onAnalyzeFrame,
  onAnalyzeAllFrames,
  isAnalyzingAll,
}: FrameTimelineProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Frame Timeline</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={onAnalyzeAllFrames}
          disabled={isAnalyzingAll || frames.length === 0}
        >
          {isAnalyzingAll ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-3 w-3" />
              Analyze All
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => onSelectFrame(Math.max(0, selectedIndex - 1))}
          disabled={selectedIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {frames.map((frame, index) => {
              const analysis = frameAnalyses[frame.id];
              const isAnalyzing = analyzingFrameId === frame.id;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={frame.id}
                  onClick={() => onSelectFrame(index)}
                  className={cn(
                    "relative shrink-0 rounded-lg border-2 transition-all",
                    isSelected
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="w-20 h-14 rounded-md overflow-hidden">
                    <img
                      src={frame.imageData}
                      alt={frame.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-md opacity-0 hover:opacity-100 transition-opacity">
                    {isAnalyzing ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : !analysis ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAnalyzeFrame(frame);
                        }}
                      >
                        Analyze
                      </Button>
                    ) : null}
                  </div>
                  <div className="mt-1 text-center">
                    <p className="text-[10px] font-medium truncate px-1">{frame.label}</p>
                    {analysis && (
                      <p className={cn("text-xs font-bold", getScoreColor(analysis.overallScore))}>
                        {analysis.overallScore.toFixed(1)}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={() => onSelectFrame(Math.min(frames.length - 1, selectedIndex + 1))}
          disabled={selectedIndex === frames.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
