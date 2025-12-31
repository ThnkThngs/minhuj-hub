import { TrendingUp, Flame, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProgressPage() {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-display font-bold">My Progress</h1>
        <p className="text-muted-foreground">Track your archery journey</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Flame className="h-4 w-4 text-accent" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-bold">0</p>
            <p className="text-xs text-muted-foreground">days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display font-bold">0</p>
            <p className="text-xs text-muted-foreground">completed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            Archer Rank
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Beginner</span>
            <span className="text-sm text-muted-foreground">0 / 100 XP</span>
          </div>
          <Progress value={0} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Complete sessions and challenges to earn XP and level up!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Performance Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          <p>Start logging practice sessions to see your trends!</p>
        </CardContent>
      </Card>
    </div>
  );
}
