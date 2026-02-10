import { Target, AlertTriangle, Sparkles, TrendingUp, TrendingDown, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnalysisData {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  keyRecommendation: string;
}

interface CoachingSidebarProps {
  analysisData?: AnalysisData | null;
}

const checkpoints = [
  { label: "Bow Arm", detail: "Should be straight (170-180°)", keywords: ["bow arm", "arm", "elbow"] },
  { label: "Draw Elbow", detail: "Should be level or high (150-160°)", keywords: ["draw", "elbow", "pull"] },
  { label: "Shoulders", detail: "Aligned, not hunched (85-95°)", keywords: ["shoulder", "alignment", "posture"] },
  { label: "Anchor Point", detail: "Consistent position at jaw/cheek", keywords: ["anchor", "jaw", "cheek", "face"] },
];

const safetyTips = [
  "Bent bow arm increases risk of elbow hyperextension",
  "Low draw elbow can cause shoulder impingement",
  "Hunched shoulders lead to neck and back strain",
  "Inconsistent anchor increases facial injury risk",
];

function matchesCheckpoint(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

export function CoachingSidebar({ analysisData }: CoachingSidebarProps) {
  const hasResults = !!analysisData;

  // Determine which checkpoints are strengths vs need improvement
  const checkpointStatus = checkpoints.map((cp) => {
    if (!hasResults) return { ...cp, status: "neutral" as const };
    const isStrength = analysisData.strengths.some((s) => matchesCheckpoint(s, cp.keywords));
    const needsWork = analysisData.improvements.some((s) => matchesCheckpoint(s, cp.keywords));
    return {
      ...cp,
      status: isStrength ? ("good" as const) : needsWork ? ("improve" as const) : ("neutral" as const),
    };
  });

  const scoreColor =
    !hasResults ? "text-muted-foreground" :
    analysisData.overallScore >= 8 ? "text-green-400" :
    analysisData.overallScore >= 6 ? "text-amber-400" : "text-red-400";

  return (
    <div className="space-y-4">
      {/* Dynamic Score + Recommendation */}
      {hasResults && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                <h3 className="font-display text-sm font-bold">AI Coaching</h3>
              </div>
              <span className={`text-2xl font-bold ${scoreColor}`}>
                {analysisData.overallScore.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {analysisData.keyRecommendation}
            </p>
            {analysisData.improvements.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Focus Areas</p>
                <div className="flex flex-wrap gap-1.5">
                  {analysisData.improvements.slice(0, 3).map((imp, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] border-amber-400/30 text-amber-400">
                      {imp.length > 30 ? imp.substring(0, 30) + "…" : imp}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Key Checkpoints */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-bold">Key Checkpoints</h3>
          </div>
          <div className="space-y-2.5">
            {checkpointStatus.map((cp) => (
              <div key={cp.label} className="flex items-start gap-2.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    cp.status === "good" ? "bg-green-400" :
                    cp.status === "improve" ? "bg-amber-400" :
                    "bg-primary"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium">{cp.label}</p>
                    {cp.status === "good" && <TrendingUp className="h-3 w-3 text-green-400" />}
                    {cp.status === "improve" && <TrendingDown className="h-3 w-3 text-amber-400" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{cp.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Injury Prevention */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <h3 className="font-display text-sm font-bold">Injury Prevention</h3>
          </div>
          <ul className="space-y-2">
            {safetyTips.map((tip, i) => (
              <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Sunnah Connection */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-bold">Train with Excellence</h3>
          </div>
          <blockquote className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
            "Allah loves that when anyone of you does a job, he does it with perfection (itqan)."
            <span className="block mt-1 not-italic text-[10px]">— Sahih Al-Albani</span>
          </blockquote>
          <p className="text-xs text-muted-foreground">
            Perfect your form not just for accuracy, but as an act of worship through excellence.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
