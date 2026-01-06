import { CheckCircle2, AlertCircle, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ExtractedFrame } from "./FrameTimeline";

interface FrameAnalysisResult {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  keyRecommendation: string;
  techniquesIdentified: string[];
}

interface FrameAnalysisViewProps {
  frame: ExtractedFrame;
  analysis: FrameAnalysisResult | null;
  frameIndex: number;
  totalFrames: number;
  onPrevFrame: () => void;
  onNextFrame: () => void;
}

export function FrameAnalysisView({
  frame,
  analysis,
  frameIndex,
  totalFrames,
  onPrevFrame,
  onNextFrame,
}: FrameAnalysisViewProps) {
  const getScoreBadge = (score: number) => {
    if (score >= 8) {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Excellent</Badge>;
    }
    if (score >= 6) {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Good</Badge>;
    }
    return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Needs Work</Badge>;
  };

  return (
    <div className="space-y-4">
      {/* Frame Navigation Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevFrame}
          disabled={frameIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Prev
        </Button>
        <div className="text-center">
          <h3 className="font-semibold">{frame.label}</h3>
          <p className="text-xs text-muted-foreground">
            Frame {frameIndex + 1} of {totalFrames}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onNextFrame}
          disabled={frameIndex === totalFrames - 1}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Frame Image */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
        <img
          src={frame.imageData}
          alt={frame.label}
          className="w-full h-full object-contain"
        />
        {analysis && (
          <div className="absolute top-3 right-3">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
              analysis.overallScore >= 8 ? "bg-green-500/90 text-white" :
              analysis.overallScore >= 6 ? "bg-yellow-500/90 text-white" :
              "bg-red-500/90 text-white"
            )}>
              {analysis.overallScore.toFixed(1)}
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysis ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rating:</span>
            {getScoreBadge(analysis.overallScore)}
          </div>

          {/* Strengths */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Strengths
            </h4>
            <ul className="space-y-1">
              {analysis.strengths.map((strength, i) => (
                <li key={i} className="text-sm text-muted-foreground pl-6">
                  • {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Areas to Improve
            </h4>
            <ul className="space-y-1">
              {analysis.improvements.map((improvement, i) => (
                <li key={i} className="text-sm text-muted-foreground pl-6">
                  • {improvement}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Recommendation */}
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm">{analysis.keyRecommendation}</p>
            </div>
          </div>

          {/* Techniques */}
          {analysis.techniquesIdentified.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {analysis.techniquesIdentified.map((technique, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {technique}
                </Badge>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">Click "Analyze" on this frame to get feedback</p>
        </div>
      )}
    </div>
  );
}
