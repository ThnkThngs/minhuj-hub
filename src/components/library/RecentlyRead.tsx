import { useAllReadingProgress } from "@/hooks/use-reading-progress";
import { manuscripts } from "@/config/manuscripts";
import { Link } from "react-router-dom";
import { BookOpen, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function RecentlyRead() {
  const { allProgress } = useAllReadingProgress();

  // Sort by lastReadAt descending, take top 3
  const recentlyRead = allProgress
    .filter((p) => p.readChapters.length > 0)
    .sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime())
    .slice(0, 3)
    .map((p) => {
      const manuscript = manuscripts.find((m) => m.id === p.manuscriptId);
      if (!manuscript) return null;
      const lastChapter = manuscript.chapters.find((c) => c.id === p.lastChapterId);
      const progressPercent = Math.round(
        (p.readChapters.length / manuscript.chapters.length) * 100
      );
      return { progress: p, manuscript, lastChapter, progressPercent };
    })
    .filter((x): x is { progress: typeof allProgress[number]; manuscript: typeof manuscripts[number]; lastChapter: typeof manuscripts[number]["chapters"][number] | undefined; progressPercent: number } => x !== null);

  if (recentlyRead.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <h2 className="font-display text-lg font-bold">Recently Read</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {recentlyRead.map(({ progress, manuscript, lastChapter, progressPercent }) => (
          <Link
            key={manuscript.id}
            to={`/library/manuscript/${manuscript.id}${lastChapter ? `?chapter=${lastChapter.id}` : ""}`}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/30 hover:border-primary/30 hover:bg-secondary/30 transition-all group"
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                {manuscript.title}
              </h3>
              {lastChapter && (
                <p className="text-xs text-muted-foreground truncate">
                  Ch. {lastChapter.number}: {lastChapter.title}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex-1 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/70 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {progressPercent}%
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(progress.lastReadAt), { addSuffix: true })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
