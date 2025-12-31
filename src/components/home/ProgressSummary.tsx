import { Link } from "react-router-dom";
import { Award, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProgressSummary() {
  const currentRank = "Beginner";
  const currentXP = 0;
  const nextLevelXP = 100;
  const progressPercent = (currentXP / nextLevelXP) * 100;

  return (
    <Link to="/progress">
      <Card className="hover:shadow-warm transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" />
              Your Progress
            </CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-display font-semibold">{currentRank}</span>
            <span className="text-xs text-muted-foreground">
              {currentXP} / {nextLevelXP} XP
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </CardContent>
      </Card>
    </Link>
  );
}
