import { Clock, ArrowUpRight, Calendar, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SessionStatsProps {
  totalSessions: number;
  totalMinutes: number;
  totalArrows: number;
  weekSessions: number;
  weekMinutes: number;
  weekArrows: number;
}

export function SessionStats({
  totalSessions,
  totalMinutes,
  totalArrows,
  weekSessions,
  weekMinutes,
  weekArrows,
}: SessionStatsProps) {
  const formatHours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Card className="bg-card border-border/50">
        <CardContent className="p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="font-display text-2xl font-bold">{weekSessions}</div>
          <div className="text-xs text-muted-foreground">This Week</div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border/50">
        <CardContent className="p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
            <Clock className="h-5 w-5 text-accent" />
          </div>
          <div className="font-display text-2xl font-bold">{formatHours(weekMinutes)}</div>
          <div className="text-xs text-muted-foreground">Week Time</div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border/50">
        <CardContent className="p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
            <ArrowUpRight className="h-5 w-5 text-success" />
          </div>
          <div className="font-display text-2xl font-bold">{weekArrows.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Week Arrows</div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border/50">
        <CardContent className="p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
            <Target className="h-5 w-5 text-foreground" />
          </div>
          <div className="font-display text-2xl font-bold">{totalSessions}</div>
          <div className="text-xs text-muted-foreground">All Time</div>
        </CardContent>
      </Card>
    </div>
  );
}
