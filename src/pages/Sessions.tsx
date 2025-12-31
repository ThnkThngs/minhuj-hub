import { Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Sessions() {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-display font-bold">Session Architect</h1>
        <p className="text-muted-foreground">AI-powered personalized training sessions</p>
      </div>

      <Card className="border-2 border-dashed border-accent/30">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="font-display">Generate New Session</CardTitle>
          <CardDescription>
            Let AI create a personalized training plan based on your level and focus area
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <Button className="gradient-gold text-accent-foreground font-semibold">
            <Target className="mr-2 h-4 w-4" />
            Create Session
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-display font-semibold">My Sessions</h2>
        <Card className="bg-muted/50">
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>No saved sessions yet.</p>
            <p className="text-sm mt-1">Generate your first session to get started!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
