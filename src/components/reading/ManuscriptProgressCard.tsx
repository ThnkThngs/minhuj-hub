import { Manuscript } from "@/config/manuscripts";
import { useAllReadingProgress } from "@/hooks/use-reading-progress";
import { Link } from "react-router-dom";
import { ScrollText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ManuscriptProgressCardProps {
  manuscript: Manuscript;
}

export function ManuscriptProgressCard({ manuscript }: ManuscriptProgressCardProps) {
  const { getProgressForManuscript } = useAllReadingProgress();
  const progress = getProgressForManuscript(manuscript.id);
  const { toast } = useToast();

  const totalChapters = manuscript.chapters.length;
  const readCount = progress?.readChapters.length || 0;
  const progressPercent = Math.round((readCount / totalChapters) * 100);

  const handleShareProgress = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const lastChapter = progress?.lastChapterId 
      ? manuscript.chapters.find((c) => c.id === progress.lastChapterId)
      : null;

    const shareText = `📚 Reading Progress\n\nI'm reading "${manuscript.title}" in the Minhuj Reading Hub!\nProgress: ${readCount}/${totalChapters} chapters (${progressPercent}%)${lastChapter ? `\nCurrently on: Chapter ${lastChapter.number} - ${lastChapter.title}` : ""}`;

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
    <Link
      to={`/library/manuscript/${manuscript.id}`}
      className="block p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-accent/30 hover:bg-secondary/30 transition-all group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <ScrollText className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-foreground group-hover:text-accent transition-colors truncate">
            {manuscript.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {manuscript.subtitle}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-accent flex-shrink-0"
          onClick={handleShareProgress}
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-muted-foreground">
          {readCount}/{totalChapters} chapters
        </span>
        <span className="text-accent font-medium">{progressPercent}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {progress && readCount > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          Last read: Chapter{" "}
          {manuscript.chapters.find((c) => c.id === progress.lastChapterId)?.number || "?"}
        </p>
      )}
    </Link>
  );
}
