import { Heart, BookOpen, Target, Clock, Lightbulb, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { type Technique, difficultyConfig, techniques } from "@/config/library";
import { useTechniqueFavorites } from "@/hooks/use-technique-favorites";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Practice tips for techniques (could be extended in library.ts)
const practiceTips: Record<string, string[]> = {
  "thumb-draw": [
    "Start with a light bow (20-25 lbs)",
    "Use a thumb ring for protection",
    "Practice the grip without drawing first",
    "Focus on consistent anchor point",
  ],
  "mamluk-stance": [
    "Practice stance against a wall for alignment",
    "Film yourself to check shoulder position",
    "Hold stance for 30 seconds to build stability",
  ],
  "instinctive-aiming": [
    "Start at close range (5-10 meters)",
    "Focus on the target, not the arrow tip",
    "Shoot at least 50 arrows daily for muscle memory",
  ],
  default: [
    "Start with slow, deliberate movements",
    "Focus on form before speed",
    "Record yourself to identify issues",
    "Practice consistently, even briefly",
  ],
};

// Related techniques mapping
const relatedTechniques: Record<string, string[]> = {
  "thumb-draw": ["three-finger-draw", "khatra-draw", "clean-release"],
  "three-finger-draw": ["thumb-draw", "clean-release"],
  "mamluk-stance": ["oblique-stance", "archer-breath"],
  "instinctive-aiming": ["gap-shooting", "meditative-focus"],
  "clean-release": ["dead-release", "thumb-draw"],
};

interface TechniqueDetailDrawerProps {
  technique: Technique | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TechniqueDetailDrawer({
  technique,
  open,
  onOpenChange,
}: TechniqueDetailDrawerProps) {
  const { isFavorite, toggleFavorite } = useTechniqueFavorites();
  const navigate = useNavigate();

  if (!technique) return null;

  const tips = practiceTips[technique.id] || practiceTips.default;
  const related = (relatedTechniques[technique.id] || [])
    .map((id) => techniques.find((t) => t.id === id))
    .filter(Boolean) as Technique[];
  const difficulty = difficultyConfig[technique.difficulty];
  const IconComponent = technique.icon;
  const favorited = isFavorite(technique.id);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 bg-card border-border">
        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {/* Header */}
            <SheetHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <SheetTitle className="font-display text-xl text-left">
                      {technique.title}
                    </SheetTitle>
                    {technique.arabicTitle && (
                      <SheetDescription className="text-base text-primary/80 font-medium text-left">
                        {technique.arabicTitle}
                      </SheetDescription>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(technique.id)}
                  className={cn(
                    "shrink-0",
                    favorited && "text-destructive hover:text-destructive"
                  )}
                >
                  <Heart className={cn("h-5 w-5", favorited && "fill-current")} />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge className={cn("border", difficulty.color)}>
                  {difficulty.label}
                </Badge>
                {technique.duration && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{technique.duration}</span>
                  </div>
                )}
              </div>
            </SheetHeader>

            <Separator className="bg-border/50" />

            {/* Description */}
            <div className="space-y-2">
              <p className="text-foreground leading-relaxed">
                {technique.description}
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Key Points
              </h4>
              <ul className="space-y-2">
                {technique.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-success mt-0.5">✓</span>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Source Manuscript */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Source Manuscript
              </h4>
              <button
                onClick={() => {
                  onOpenChange(false);
                  navigate("/library");
                }}
                className="w-full p-3 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors text-left group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{technique.source}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            </div>

            {/* Practice Tips */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-accent" />
                Practice Tips
              </h4>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm p-2 rounded bg-accent/5 border border-accent/10"
                  >
                    <span className="text-accent">💡</span>
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Techniques */}
            {related.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-display font-semibold">Related Techniques</h4>
                <div className="flex flex-wrap gap-2">
                  {related.map((rel) => (
                    <Badge
                      key={rel.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary transition-colors"
                      onClick={() => {
                        // This would ideally switch to the related technique
                        // For now, just highlight it exists
                      }}
                    >
                      {rel.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1"
                onClick={() => {
                  onOpenChange(false);
                  navigate("/sessions");
                }}
              >
                <Target className="mr-2 h-4 w-4" />
                Add to Session
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
