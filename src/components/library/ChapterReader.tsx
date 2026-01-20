import { Chapter } from "@/config/manuscripts";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef, useCallback, useEffect } from "react";

interface ChapterReaderProps {
  chapter: Chapter;
  totalChapters: number;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isRead: boolean;
  onMarkRead: () => void;
  initialScrollPosition?: number;
  onScrollPositionChange?: (position: number) => void;
}

export function ChapterReader({
  chapter,
  totalChapters,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isRead,
  onMarkRead,
  initialScrollPosition = 0,
  onScrollPositionChange,
}: ChapterReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Restore scroll position on mount or chapter change
  useEffect(() => {
    if (scrollRef.current && initialScrollPosition > 0) {
      const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        const scrollHeight = viewport.scrollHeight - viewport.clientHeight;
        const targetScroll = (initialScrollPosition / 100) * scrollHeight;
        viewport.scrollTop = targetScroll;
      }
    }
  }, [chapter.id, initialScrollPosition]);

  // Handle scroll with debounce
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    if (!onScrollPositionChange) return;

    const target = event.currentTarget.querySelector('[data-radix-scroll-area-viewport]');
    if (!target) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const scrollHeight = target.scrollHeight - target.clientHeight;
      const scrollPercent = scrollHeight > 0 ? Math.round((target.scrollTop / scrollHeight) * 100) : 0;
      onScrollPositionChange(scrollPercent);
    }, 2000); // Save every 2 seconds of no scrolling
  }, [onScrollPositionChange]);

  return (
    <div className="flex flex-col h-full">
      {/* Chapter Header */}
      <div className="flex-shrink-0 border-b border-border/30 pb-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Chapter {chapter.number}</span>
          <span>•</span>
          <span>{totalChapters} chapters total</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {chapter.title}
        </h2>
        {chapter.arabicTitle && (
          <p className="text-lg text-accent mt-1 font-arabic">
            {chapter.arabicTitle}
          </p>
        )}
      </div>

      {/* Chapter Content */}
      <ScrollArea 
        ref={scrollRef}
        className="flex-1 pr-4"
        onScrollCapture={handleScroll}
      >
        <div className="prose prose-invert max-w-none">
          {chapter.content.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="text-muted-foreground leading-relaxed mb-4 text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Key Points */}
        {chapter.keyPoints && chapter.keyPoints.length > 0 && (
          <div className="mt-8 p-4 rounded-lg bg-secondary/20 border border-border/30">
            <h3 className="font-display font-bold text-sm text-accent mb-3">
              Key Points
            </h3>
            <ul className="space-y-2">
              {chapter.keyPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-accent mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mark as Read */}
        <div className="mt-6 mb-8">
          <Button
            variant={isRead ? "secondary" : "default"}
            onClick={onMarkRead}
            className="w-full gap-2"
          >
            {isRead ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Marked as Read
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" />
                Mark as Read
              </>
            )}
          </Button>
        </div>
      </ScrollArea>

      {/* Navigation Footer */}
      <div className="flex-shrink-0 border-t border-border/30 pt-4 mt-4 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="flex-1 gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={onNext}
          disabled={!hasNext}
          className="flex-1 gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
