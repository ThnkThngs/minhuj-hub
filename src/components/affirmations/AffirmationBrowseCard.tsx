import { Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { DailyAffirmation } from "@/config/affirmations";
import { cn } from "@/lib/utils";

interface AffirmationBrowseCardProps {
  affirmation: DailyAffirmation;
  isToday?: boolean;
  isSaved: boolean;
  onToggleSave: () => void;
  onClick: () => void;
}

const getCategoryColor = (category: DailyAffirmation["category"]) => {
  switch (category) {
    case "hadith":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "wisdom":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "virtue":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "health":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
  }
};

const getCategoryLabel = (category: DailyAffirmation["category"]) => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export function AffirmationBrowseCard({
  affirmation,
  isToday = false,
  isSaved,
  onToggleSave,
  onClick,
}: AffirmationBrowseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={cn(
          "relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/40",
          isToday 
            ? "border-primary/50 bg-gradient-to-br from-primary/10 via-background to-background" 
            : "border-border/50 bg-card"
        )}
        onClick={onClick}
      >
        {/* Today indicator */}
        {isToday && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent" />
        )}
        
        <CardContent className="p-5 space-y-4">
          {/* Header with badges */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {isToday && (
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                  Today
                </Badge>
              )}
              <Badge 
                variant="outline" 
                className={`text-xs ${getCategoryColor(affirmation.category)}`}
              >
                {getCategoryLabel(affirmation.category)}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 shrink-0",
                isSaved 
                  ? "text-primary hover:text-primary/80" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave();
              }}
            >
              <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
            </Button>
          </div>
          
          {/* Affirmation text */}
          <blockquote className="text-foreground font-medium leading-relaxed">
            "{affirmation.affirmation}"
          </blockquote>
          
          {/* Source */}
          <p className="text-sm text-muted-foreground">
            — {affirmation.source}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
