import { Target, Sparkles, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CornerFrame } from "@/components/ui/corner-frame";

export default function Sessions() {
  return (
    <div className="animate-fade-in">
      <div className="container py-6 md:py-12 space-y-6 md:space-y-8">
        {/* Hero Header */}
        <div className="space-y-1 md:space-y-2">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Session Architect
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            AI-powered personalized training sessions
          </p>
        </div>

        {/* Generate New Session Card */}
        <CornerFrame className="bg-card border border-border/50 p-5 md:p-8 lg:p-12">
          <div className="text-center space-y-4 md:space-y-6">
            <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            <div className="space-y-2 md:space-y-3">
              <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold">
                Generate New Session
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                Let AI create a personalized training plan based on your level, focus area, and the classical manuscripts
              </p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 md:px-8">
              <Target className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Create Session
            </Button>
          </div>
        </CornerFrame>

        {/* My Sessions Section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="font-display text-xl md:text-2xl font-semibold">My Sessions</h2>
          
          <Card className="bg-card border-border/50">
            <CardContent className="py-8 md:py-12 text-center">
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-sm md:text-base">No sessions</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-sm md:text-base">0 hours trained</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm md:text-base">
                  Generate your first session to begin your training journey
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
