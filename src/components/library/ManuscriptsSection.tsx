import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CornerFrame } from "@/components/ui/corner-frame";
import { manuscripts } from "@/config/manuscripts";
import { useAllReadingProgress } from "@/hooks/use-reading-progress";

export function ManuscriptsSection() {
  const navigate = useNavigate();
  const { getProgressForManuscript } = useAllReadingProgress();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Source Manuscripts</h2>
        <span className="text-sm text-muted-foreground">
          {manuscripts.length} texts available
        </span>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {manuscripts.map((manuscript) => {
          const progress = getProgressForManuscript(manuscript.id);
          const readCount = progress?.readChapters.length || 0;
          const totalChapters = manuscript.chapters.length;
          const progressPercent = Math.round((readCount / totalChapters) * 100);

          return (
            <CornerFrame
              key={manuscript.id}
              onClick={() => navigate(`/library/manuscript/${manuscript.id}`)}
              className="bg-card/50 border border-border/30 p-4 cursor-pointer group hover:bg-secondary/20 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <manuscript.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="font-display font-bold text-sm group-hover:text-accent transition-colors truncate">
                    {manuscript.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {manuscript.subtitle}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-accent">
                      {totalChapters} chapters
                      {readCount > 0 && ` • ${progressPercent}% read`}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            </CornerFrame>
          );
        })}
      </div>
    </div>
  );
}
