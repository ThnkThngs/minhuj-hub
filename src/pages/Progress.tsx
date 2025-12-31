import { Flame, Target, Award, TrendingUp, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CornerFrame } from "@/components/ui/corner-frame";

export default function ProgressPage() {
  return (
    <div className="animate-fade-in">
      <div className="container py-12 space-y-8">
        {/* Hero Header */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Your Progress
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your archery journey and achievements
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <CornerFrame className="bg-card border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Flame className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold">0</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CornerFrame>

          <CornerFrame className="bg-card border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold">0</p>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </div>
            </div>
          </CornerFrame>
        </div>

        {/* Archer Rank */}
        <CornerFrame className="bg-card border border-border/50 p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold">Archer Rank</h3>
                <p className="text-muted-foreground">Novice</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress to Apprentice</span>
                <span className="text-primary font-medium">0 / 100 XP</span>
              </div>
              <Progress value={0} className="h-2 bg-secondary" />
            </div>
          </div>
        </CornerFrame>

        {/* Performance Trends */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-semibold">Performance Trends</h2>
          
          <Card className="bg-card border-border/50">
            <CardContent className="py-12 text-center">
              <div className="space-y-4">
                <div className="flex justify-center gap-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>No data yet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>0% improvement</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Complete training sessions to see your progress trends
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
