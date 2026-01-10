import { format } from "date-fns";
import { Clock, ArrowUpRight, Target, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { TrainingSession, SessionMood } from "@/hooks/use-training-sessions";
import { techniques } from "@/config/library";

const moodEmojis: Record<SessionMood, string> = {
  focused: "🎯",
  improving: "💪",
  energized: "⚡",
  tired: "😴",
  struggling: "😤",
};

interface SessionCardProps {
  session: TrainingSession;
  onDelete: (id: string) => void;
}

export function SessionCard({ session, onDelete }: SessionCardProps) {
  const sessionDate = new Date(session.session_date);
  const techniqueNames = session.techniques_practiced
    .map((id) => techniques.find((t) => t.id === id)?.title)
    .filter(Boolean);

  return (
    <Card className="bg-card border-border/50 hover:border-primary/30 transition-colors group">
      <CardContent className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            {/* Date and Mood */}
            <div className="flex items-center gap-3">
              <div className="font-display font-semibold text-lg">
                {format(sessionDate, "MMM d")}
              </div>
              <span className="text-muted-foreground text-sm">
                {format(sessionDate, "EEEE")}
              </span>
              {session.mood && (
                <span className="text-xl" title={session.mood}>
                  {moodEmojis[session.mood]}
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{session.duration_minutes} min</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <ArrowUpRight className="h-4 w-4" />
                <span>{session.arrows_shot} arrows</span>
              </div>
            </div>

            {/* Techniques */}
            {techniqueNames.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {techniqueNames.slice(0, 3).map((name) => (
                  <Badge key={name} variant="secondary" className="text-xs">
                    <Target className="h-3 w-3 mr-1" />
                    {name}
                  </Badge>
                ))}
                {techniqueNames.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{techniqueNames.length - 3} more
                  </Badge>
                )}
              </div>
            )}

            {/* Notes */}
            {session.notes && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {session.notes}
              </p>
            )}
          </div>

          {/* Delete Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this session?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This session will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(session.id)}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
