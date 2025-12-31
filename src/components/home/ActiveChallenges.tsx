import { Link } from "react-router-dom";
import { Trophy, ChevronRight } from "lucide-react";

export function ActiveChallenges() {
  const activeChallenges: { id: string; title: string; progress: number }[] = [];

  if (activeChallenges.length === 0) {
    return (
      <Link to="/community" className="block group">
        <div className="relative overflow-hidden bg-card/30 backdrop-blur-sm border border-dashed border-border/50 p-6 hover:border-primary/50 hover:shadow-neon-orange transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm uppercase tracking-wider">Active Challenges</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground">
            No active challenges. Join one to compete with fellow archers!
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/community" className="block group">
      <div className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 p-6 hover:border-primary/50 hover:shadow-neon-orange transition-all">
        {/* Accent corner */}
        <div 
          className="absolute top-0 right-0 w-16 h-16 bg-primary/10"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
        />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm uppercase tracking-wider">Active Challenges</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="space-y-2">
            {activeChallenges.map((challenge) => (
              <div key={challenge.id} className="flex items-center justify-between">
                <span className="text-sm font-medium">{challenge.title}</span>
                <span className="text-xs text-muted-foreground">{challenge.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}