import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Stories() {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-display font-bold">Heritage Stories</h1>
        <p className="text-muted-foreground">Discover the rich history of Islamic archery</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-accent/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-accent" />
          </div>
          <CardTitle className="font-display">Discover a Story</CardTitle>
          <CardDescription>
            AI-generated stories about the Sahaba and Islamic archery tradition
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <Button className="gradient-gold text-accent-foreground font-semibold">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Story
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-display font-semibold">Saved Stories</h2>
        <Card className="bg-muted/50">
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>No saved stories yet.</p>
            <p className="text-sm mt-1">Discover your first heritage story!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
