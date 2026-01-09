import { cn } from "@/lib/utils";
import { Check, BookOpen } from "lucide-react";
import { Chapter } from "@/config/manuscripts";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChapterListProps {
  chapters: Chapter[];
  activeChapterId: string;
  onChapterSelect: (chapterId: string) => void;
  isChapterRead: (chapterId: string) => boolean;
}

export function ChapterList({
  chapters,
  activeChapterId,
  onChapterSelect,
  isChapterRead,
}: ChapterListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-2">
        {chapters.map((chapter) => {
          const isActive = chapter.id === activeChapterId;
          const isRead = isChapterRead(chapter.id);

          return (
            <button
              key={chapter.id}
              onClick={() => onChapterSelect(chapter.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200",
                "flex items-start gap-3 group",
                isActive
                  ? "bg-accent/20 border border-accent/30"
                  : "hover:bg-secondary/30 border border-transparent"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  "text-xs font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : isRead
                    ? "bg-accent/20 text-accent"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {isRead ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  chapter.number
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate transition-colors",
                    isActive ? "text-accent" : "text-foreground"
                  )}
                >
                  {chapter.title}
                </p>
                {chapter.arabicTitle && (
                  <p className="text-xs text-muted-foreground truncate mt-0.5 font-arabic">
                    {chapter.arabicTitle}
                  </p>
                )}
              </div>
              {isActive && (
                <BookOpen className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
