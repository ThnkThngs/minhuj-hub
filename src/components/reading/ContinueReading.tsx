import { useAllReadingProgress } from "@/hooks/use-reading-progress";
import { manuscripts } from "@/config/manuscripts";
import { BookOpen, ChevronRight, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ContinueReading() {
  const { allProgress } = useAllReadingProgress();
  const { toast } = useToast();

  // Find the most recently read manuscript
  const sortedProgress = [...allProgress].sort(
    (a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime()
  );

  const lastRead = sortedProgress[0];

  if (!lastRead) {
    return null;
  }

  const manuscript = manuscripts.find((m) => m.id === lastRead.manuscriptId);
  if (!manuscript) return null;

  const chapter = manuscript.chapters.find((c) => c.id === lastRead.lastChapterId);
  if (!chapter) return null;

  const totalChapters = manuscript.chapters.length;
  const readCount = lastRead.readChapters.length;
  const progressPercent = Math.round((readCount / totalChapters) * 100);
  const timeAgo = formatDistanceToNow(new Date(lastRead.lastReadAt), { addSuffix: true });

  const handleShareProgress = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareText = `📚 Reading Progress\n\nI'm reading "${manuscript.title}" in the Minhuj Reading Hub!\nProgress: ${readCount}/${totalChapters} chapters (${progressPercent}%)\nCurrently on: Chapter ${chapter.number} - ${chapter.title}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Reading Progress",
          text: shareText,
        });
      } catch (e) {
        // User cancelled or error - silently fail
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied!",
        description: "Progress copied to clipboard.",
      });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-accent" />
        Continue Reading
      </h2>
      <Link
        to={`/library/manuscript/${manuscript.id}?chapter=${chapter.id}`}
        className="block p-4 rounded-xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20 hover:border-accent/40 transition-all group"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm text-accent font-medium">
                {manuscript.title}
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-accent"
                onClick={handleShareProgress}
              >
                <Share2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            <p className="font-display font-bold text-foreground group-hover:text-accent transition-colors truncate">
              Chapter {chapter.number}: {chapter.title}
            </p>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span>{readCount}/{totalChapters} chapters</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <ChevronRight className="w-5 h-5 text-accent" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
