import { cn } from "@/lib/utils";
import type { ExtractedFrame } from "./FrameTimeline";

interface FrameAnalysisResult {
  overallScore: number;
}

interface ScoreProgressionChartProps {
  frames: ExtractedFrame[];
  frameAnalyses: Record<string, FrameAnalysisResult>;
  selectedIndex: number;
  onSelectFrame: (index: number) => void;
}

export function ScoreProgressionChart({
  frames,
  frameAnalyses,
  selectedIndex,
  onSelectFrame,
}: ScoreProgressionChartProps) {
  const analyzedFrames = frames.filter((f) => frameAnalyses[f.id]);
  
  if (analyzedFrames.length < 2) {
    return null;
  }

  const scores = frames.map((f) => frameAnalyses[f.id]?.overallScore ?? null);
  const maxScore = 10;
  const minScore = 0;
  const range = maxScore - minScore;

  const getY = (score: number | null) => {
    if (score === null) return null;
    return 100 - ((score - minScore) / range) * 100;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "#22c55e";
    if (score >= 6) return "#eab308";
    return "#ef4444";
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">Score Progression</h4>
      <div className="relative h-24 bg-muted/30 rounded-lg p-2">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-2 bottom-2 w-6 flex flex-col justify-between text-[10px] text-muted-foreground">
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-6 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div className="border-t border-dashed border-border/50" />
            <div className="border-t border-dashed border-border/50" />
            <div className="border-t border-dashed border-border/50" />
          </div>

          {/* Score points and lines */}
          <svg className="absolute inset-0 w-full h-full overflow-visible">
            {/* Connect lines */}
            {scores.map((score, i) => {
              if (i === 0 || score === null) return null;
              const prevScore = scores[i - 1];
              if (prevScore === null) return null;

              const x1 = `${((i - 1) / (frames.length - 1)) * 100}%`;
              const x2 = `${(i / (frames.length - 1)) * 100}%`;
              const y1 = `${getY(prevScore)}%`;
              const y2 = `${getY(score)}%`;

              return (
                <line
                  key={`line-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                />
              );
            })}

            {/* Score points */}
            {scores.map((score, i) => {
              if (score === null) return null;
              const x = `${(i / (frames.length - 1)) * 100}%`;
              const y = `${getY(score)}%`;
              const isSelected = i === selectedIndex;

              return (
                <g key={`point-${i}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 8 : 6}
                    fill={getScoreColor(score)}
                    stroke={isSelected ? "hsl(var(--primary))" : "none"}
                    strokeWidth="2"
                    className="cursor-pointer transition-all"
                    onClick={() => onSelectFrame(i)}
                  />
                  <text
                    x={x}
                    y={y}
                    dy="-12"
                    textAnchor="middle"
                    className="text-[10px] fill-foreground font-medium"
                  >
                    {score.toFixed(1)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* X-axis labels */}
        <div className="ml-6 mt-1 flex justify-between text-[9px] text-muted-foreground">
          {frames.map((frame, i) => (
            <button
              key={frame.id}
              onClick={() => onSelectFrame(i)}
              className={cn(
                "truncate max-w-[60px] transition-colors",
                i === selectedIndex && "text-primary font-medium"
              )}
            >
              {frame.label.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
