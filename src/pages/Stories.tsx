import { BookOpen, Sparkles, Scroll, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CornerFrame } from "@/components/ui/corner-frame";

export default function Stories() {
  return (
    <div className="animate-fade-in">
      <div className="container py-12 space-y-8">
        {/* Hero Header */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Heritage Stories
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover the rich history of Islamic archery
          </p>
        </div>

        {/* Generate Story Card */}
        <CornerFrame className="bg-card border border-border/50 p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Discover a Story
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                AI-generated stories about the Sahaba and the rich tradition of Islamic archery through the ages
              </p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Story
            </Button>
          </div>
        </CornerFrame>

        {/* Saved Stories Section */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-semibold">Saved Stories</h2>
          
          <Card className="bg-card border-border/50">
            <CardContent className="py-12 text-center">
              <div className="space-y-4">
                <div className="flex justify-center gap-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Scroll className="h-5 w-5" />
                    <span>No stories saved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    <span>0 favorites</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Discover your first heritage story to learn from the masters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
