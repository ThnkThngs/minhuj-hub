import { Camera, Upload, History, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CornerFrame } from "@/components/ui/corner-frame";

export default function Analyze() {
  return (
    <div className="animate-fade-in">
      <div className="container py-12 space-y-8">
        {/* Hero Header */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Technique Analyzer
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered form analysis for traditional archery
          </p>
        </div>

        {/* Analyze Form Card */}
        <CornerFrame className="bg-card border border-border/50 p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Analyze Your Form
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload a photo or video of your shooting form for AI analysis based on classical techniques
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <Camera className="mr-2 h-5 w-5" />
                Take Photo
              </Button>
              <Button size="lg" variant="outline" className="flex-1 border-border hover:bg-secondary/50">
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
              </Button>
            </div>
          </div>
        </CornerFrame>

        {/* Analysis History Section */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-semibold">Analysis History</h2>
          
          <Card className="bg-card border-border/50">
            <CardContent className="py-12 text-center">
              <div className="space-y-4">
                <div className="flex justify-center gap-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    <span>No analyses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>0 improvements</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Upload your first photo to get AI feedback on your technique
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
