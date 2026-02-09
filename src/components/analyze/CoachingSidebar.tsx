import { Target, AlertTriangle, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const checkpoints = [
  { label: "Bow Arm", detail: "Should be straight (170-180°)" },
  { label: "Draw Elbow", detail: "Should be level or high (150-160°)" },
  { label: "Shoulders", detail: "Aligned, not hunched (85-95°)" },
  { label: "Anchor Point", detail: "Consistent position at jaw/cheek" },
];

const safetyTips = [
  "Bent bow arm increases risk of elbow hyperextension",
  "Low draw elbow can cause shoulder impingement",
  "Hunched shoulders lead to neck and back strain",
  "Inconsistent anchor increases facial injury risk",
];

export function CoachingSidebar() {
  return (
    <div className="space-y-4">
      {/* Key Checkpoints */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-bold">Key Checkpoints</h3>
          </div>
          <div className="space-y-2.5">
            {checkpoints.map((cp) => (
              <div key={cp.label} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{cp.label}</p>
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
