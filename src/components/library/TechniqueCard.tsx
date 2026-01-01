import { Clock, BookOpen, ChevronRight } from "lucide-react";
import { CornerFrame } from "@/components/ui/corner-frame";
import { Badge } from "@/components/ui/badge";
import { type Technique, difficultyConfig } from "@/config/library";

interface TechniqueCardProps {
  technique: Technique;
  onClick?: () => void;
}

export function TechniqueCard({ technique, onClick }: TechniqueCardProps) {
  const difficulty = difficultyConfig[technique.difficulty];
  const Icon = technique.icon;

  return (
    <CornerFrame
      className="bg-card border border-border/50 p-5 cursor-pointer group hover:bg-secondary/30 hover:border-primary/30 transition-all duration-300"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:shadow-neon-orange transition-all duration-300">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
                {technique.title}
              </h3>
              {technique.arabicTitle && (
                <p className="text-sm text-muted-foreground font-medium">
                  {technique.arabicTitle}
                </p>
              )}
            </div>
          </div>
          <Badge variant="outline" className={`${difficulty.color} text-xs`}>
            {difficulty.label}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {technique.description}
        </p>

        {/* Key Points Preview */}
        <div className="flex flex-wrap gap-1.5">
          {technique.keyPoints.slice(0, 2).map((point, index) => (
            <span
              key={index}
              className="text-xs bg-secondary/50 text-secondary-foreground px-2 py-1 rounded"
            >
              {point}
            </span>
          ))}
          {technique.keyPoints.length > 2 && (
            <span className="text-xs text-muted-foreground px-2 py-1">
              +{technique.keyPoints.length - 2} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {technique.source}
            </span>
            {technique.duration && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {technique.duration}
              </span>
            )}
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </CornerFrame>
  );
}
