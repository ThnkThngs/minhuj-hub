import { Link } from "react-router-dom";
import { Trophy, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ActiveChallenges() {
  const activeChallenges: { id: string; title: string; progress: number }[] = [];

  if (activeChallenges.length === 0) {
    return (
      <Link to="/community">
        <Card className="border-dashed hover:shadow-warm transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Trophy className="h-4 w-4 text-accent" />
                Active Challenges
              </CardTitle>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No active challenges. Join one to compete with fellow archers!
            </p>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to="/community">
      <Card className="hover:shadow-warm transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Trophy className="h-4 w-4 text-accent" />
              Active Challenges
            </CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {activeChallenges.map((challenge) => (
            <div key={challenge.id} className="flex items-center justify-between">
              <span className="text-sm font-medium">{challenge.title}</span>
              <span className="text-xs text-muted-foreground">{challenge.progress}%</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
