import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { DailyAffirmation } from "@/config/affirmations";

interface AffirmationTeaserProps {
  affirmation: DailyAffirmation;
  onReadMore: () => void;
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

export function AffirmationTeaser({ affirmation, onReadMore }: AffirmationTeaserProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <CardContent className="p-5 relative">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Today's Sunnah Reminder
                </h3>
                <Badge 
                  variant="outline" 
                  className={`text-xs shrink-0 ${getCategoryColor(affirmation.category)}`}
                >
                  {getCategoryLabel(affirmation.category)}
                </Badge>
              </div>
              
              <blockquote className="text-foreground font-medium leading-relaxed">
                "{affirmation.affirmation}"
              </blockquote>
              
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground truncate">
                  — {affirmation.source}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onReadMore}
                  className="text-primary hover:text-primary hover:bg-primary/10 shrink-0"
                >
                  Read More →
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
