import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CornerFrame } from "@/components/ui/corner-frame";
import { Button } from "@/components/ui/button";
import { ExpandableChapterItem } from "./ExpandableChapterItem";
import { useReadingProgress } from "@/hooks/use-reading-progress";
import type { LucideIcon } from "lucide-react";

interface Chapter {
  id: string;
  number: number;
  title: string;
  arabicTitle?: string;
  content: string;
  keyPoints?: string[];
}

interface Manuscript {
  id: string;
  title: string;
  subtitle: string;
  author?: string;
  description: string;
  icon: LucideIcon;
  chapters: Chapter[];
}

interface ExpandableManuscriptCardProps {
  manuscript: Manuscript;
}

export function ExpandableManuscriptCard({ manuscript }: ExpandableManuscriptCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { isChapterRead, markChapterRead, getReadCount } = useReadingProgress(manuscript.id);

  const readCount = getReadCount();
  const totalChapters = manuscript.chapters.length;
  const progressPercent = Math.round((readCount / totalChapters) * 100);
  const Icon = manuscript.icon;

  return (
    <CornerFrame
      className={cn(
        "bg-card/50 border border-border/30 overflow-hidden transition-all duration-300",
        isExpanded ? "border-accent/40" : "hover:bg-secondary/20 hover:border-accent/30"
      )}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-start gap-3 text-left"
      >
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
          isExpanded ? "bg-accent/20" : "bg-accent/10"
        )}>
          <Icon className="h-5 w-5 text-accent" />
        </div>
        
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn(
              "font-display font-bold text-sm transition-colors",
              isExpanded && "text-accent"
            )}>
              {manuscript.title}
            </h3>
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-0.5",
                isExpanded && "rotate-180 text-accent"
              )} 
            />
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {manuscript.subtitle}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-accent">
              {totalChapters} chapters
            </span>
            {readCount > 0 && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {progressPercent}% read
                </span>
              </>
            )}
          </div>
          
          {/* Progress bar */}
          {readCount > 0 && (
            <div className="w-full h-1 bg-secondary/50 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/20">
              {/* Description */}
              <div className="px-4 py-3 bg-secondary/10">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {manuscript.description}
                </p>
              </div>

              {/* Chapter List */}
              <div className="max-h-[400px] overflow-y-auto">
                {manuscript.chapters.map((chapter) => (
                  <ExpandableChapterItem
                    key={chapter.id}
                    chapter={chapter}
                    isRead={isChapterRead(chapter.id)}
                    onMarkRead={() => markChapterRead(chapter.id)}
                  />
                ))}
              </div>

              {/* Footer with link to full reader */}
              <div className="p-3 border-t border-border/20 bg-secondary/5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/library/manuscript/${manuscript.id}`);
                  }}
                  className="w-full text-xs text-muted-foreground hover:text-accent group"
                >
                  <span>Open Full Manuscript Reader</span>
                  <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CornerFrame>
  );
}
