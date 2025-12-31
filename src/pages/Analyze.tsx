import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analyze() {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-display font-bold">Technique Analyzer</h1>
        <p className="text-muted-foreground">AI-powered form analysis for traditional archery</p>
      </div>

      <Card className="border-2 border-dashed border-primary/30">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Camera className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-display">Analyze Your Form</CardTitle>
          <CardDescription>
            Upload a photo or video of your shooting form for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 pb-6">
          <Button variant="default" className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
          <Button variant="outline" className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-display font-semibold">Analysis History</h2>
        <Card className="bg-muted/50">
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>No analyses yet.</p>
            <p className="text-sm mt-1">Upload your first photo to get AI feedback!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
