import { Link } from "react-router-dom";
import { Award, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CornerFrame } from "@/components/ui/corner-frame";

export function ProgressSummary() {
  const currentRank = "Beginner";
  const currentXP = 0;
  const nextLevelXP = 100;
  const progressPercent = (currentXP / nextLevelXP) * 100;

  return (
    <Link to="/progress" className="block group">
      <CornerFrame className="bg-card border border-border/50 p-6 hover:bg-secondary/30 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm uppercase tracking-wider">Your Progress</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-semibold">{currentRank}</span>
            <span className="text-xs text-muted-foreground">
              {currentXP} / {nextLevelXP} XP
            </span>
          </div>
          <Progress value={progressPercent} className="h-1 bg-secondary" />
        </div>
      </CornerFrame>
    </Link>
  );
}
