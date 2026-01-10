import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DailyAffirmation } from "@/config/affirmations";
import { Bookmark, BookmarkCheck, Share2, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DailyAffirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  affirmation: DailyAffirmation;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function DailyAffirmationDialog({
  open,
  onOpenChange,
  affirmation,
  isSaved,
  onToggleSave,
}: DailyAffirmationDialogProps) {
  const handleShare = async () => {
    const shareText = `${affirmation.affirmation}\n\n— ${affirmation.source}\n\n${affirmation.companionStory.narrative}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Daily Sunnah Reminder",
          text: shareText,
        });
      } catch (e) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard",
        description: "The affirmation has been copied to your clipboard.",
      });
    }
  };

  const getCategoryColor = (category: DailyAffirmation["category"]) => {
    switch (category) {
      case "hadith":
        return "text-primary";
      case "wisdom":
        return "text-accent";
      case "virtue":
        return "text-green-400";
      case "health":
        return "text-cyan-400";
      default:
        return "text-primary";
    }
  };

  const getCategoryLabel = (category: DailyAffirmation["category"]) => {
    switch (category) {
      case "hadith":
        return "Hadith";
      case "wisdom":
        return "Wisdom";
      case "virtue":
        return "Virtue";
      case "health":
        return "Health";
      default:
        return category;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.15)]">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Daily Sunnah Reminder
            </span>
            <Sparkles className="h-5 w-5" />
          </div>
          <DialogTitle className="sr-only">Daily Affirmation</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Main Affirmation */}
          <div className="text-center space-y-4">
            {affirmation.arabicText && (
              <p className="text-xl font-arabic text-primary/80 leading-relaxed">
                {affirmation.arabicText}
              </p>
            )}
            <blockquote className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
              "{affirmation.affirmation}"
            </blockquote>
            <p className="text-sm text-muted-foreground">
              — {affirmation.source}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <span className={`text-xs uppercase tracking-wider ${getCategoryColor(affirmation.category)}`}>
              {getCategoryLabel(affirmation.category)}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          {/* Companion Story */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3 border border-primary/10">
            <h3 className="font-semibold text-foreground">
              {affirmation.companionStory.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {affirmation.companionStory.narrative}
            </p>
            <div className="flex items-start gap-2 pt-2 border-t border-primary/10">
              <Sparkles className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
              <p className="text-sm text-accent">
                <span className="font-medium">Benefit:</span>{" "}
                {affirmation.companionStory.benefit}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSave}
              className={isSaved ? "text-primary" : "text-muted-foreground"}
            >
              {isSaved ? (
                <BookmarkCheck className="h-4 w-4 mr-2" />
              ) : (
                <Bookmark className="h-4 w-4 mr-2" />
              )}
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-muted-foreground"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
