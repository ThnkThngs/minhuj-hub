import { Link } from "react-router-dom";
import { Award, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ProgressSummary() {
  const currentRank = "Beginner";
  const currentXP = 0;
  const nextLevelXP = 100;
  const progressPercent = (currentXP / nextLevelXP) * 100;

  return (
    <Link to="/progress" className="block group">
      <div className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 p-6 hover:border-accent/50 hover:shadow-neon-cyan transition-all">
        {/* Accent corner */}
        <div 
          className="absolute top-0 right-0 w-20 h-20 bg-accent/10"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
        />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-sm uppercase tracking-wider">Your Progress</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold">{currentRank}</span>
              <span className="text-xs text-muted-foreground">
                {currentXP} / {nextLevelXP} XP
              </span>
            </div>
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}