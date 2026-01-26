import { useState } from "react";
import { ChevronDown, ChevronRight, Check, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Chapter {
  id: string;
  number: number;
  title: string;
  arabicTitle?: string;
  content: string;
  keyPoints?: string[];
}

interface ExpandableChapterItemProps {
  chapter: Chapter;
  manuscriptId: string;
  isRead: boolean;
  onMarkRead: () => void;
}

export function ExpandableChapterItem({ 
  chapter, 
  manuscriptId,
  isRead, 
  onMarkRead 
}: ExpandableChapterItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="border-b border-border/20 last:border-b-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between p-3 text-left",
          "hover:bg-secondary/30 transition-colors",
          isExpanded && "bg-secondary/20"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs font-medium text-accent">
            {chapter.number}
          </span>
          <div className="min-w-0">
            <span className={cn(
              "text-sm font-medium truncate block",
              isRead && "text-muted-foreground"
            )}>
              {chapter.title}
            </span>
            {chapter.arabicTitle && (
              <span className="text-xs text-muted-foreground truncate block font-arabic">
                {chapter.arabicTitle}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {isRead && (
            <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
              <Check className="h-3 w-3 mr-1" />
              Read
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/library/manuscript/${manuscriptId}?chapter=${chapter.id}`);
            }}
            className="text-xs gap-1 h-7 px-2"
          >
            Read
            <ChevronRight className="h-3 w-3" />
          </Button>
          <ChevronDown 
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isExpanded && "rotate-180"
            )} 
          />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 space-y-4 bg-secondary/10">
              {/* Chapter Content */}
              <ScrollArea className="max-h-[300px]">
                <div className="prose prose-sm prose-invert max-w-none">
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                    {chapter.content}
                  </p>
                </div>
              </ScrollArea>

              {/* Key Points */}
              {chapter.keyPoints && chapter.keyPoints.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border/20">
                  <h4 className="text-xs font-semibold text-accent uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="h-3 w-3" />
                    Key Points
                  </h4>
                  <ul className="space-y-1.5">
                    {chapter.keyPoints.map((point, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-2 text-xs text-muted-foreground"
                      >
                        <span className="text-accent mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mark as Read Button */}
              <div className="flex justify-end pt-2">
                <Button
                  variant={isRead ? "outline" : "default"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkRead();
                  }}
                  className={cn(
                    "text-xs",
                    isRead && "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20"
                  )}
                >
                  {isRead ? (
                    <>
                      <Check className="h-3 w-3 mr-1.5" />
                      Marked as Read
                    </>
                  ) : (
                    "Mark as Read"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
