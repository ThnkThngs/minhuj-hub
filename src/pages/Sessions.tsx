import { Target, Sparkles, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CornerFrame } from "@/components/ui/corner-frame";

export default function Sessions() {
  return (
    <div className="animate-fade-in">
      <div className="container py-12 space-y-8">
        {/* Hero Header */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Session Architect
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered personalized training sessions
          </p>
        </div>

        {/* Generate New Session Card */}
        <CornerFrame className="bg-card border border-border/50 p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Generate New Session
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Let AI create a personalized training plan based on your level, focus area, and the classical manuscripts
              </p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              <Target className="mr-2 h-5 w-5" />
              Create Session
            </Button>
          </div>
        </CornerFrame>

        {/* My Sessions Section */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-semibold">My Sessions</h2>
          
          <Card className="bg-card border-border/50">
            <CardContent className="py-12 text-center">
              <div className="space-y-4">
                <div className="flex justify-center gap-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>No sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>0 hours trained</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
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
