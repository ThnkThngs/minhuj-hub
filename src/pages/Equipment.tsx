import { Plus, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Equipment() {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-display font-bold">Equipment</h1>
          <p className="text-muted-foreground text-sm">Manage your archery gear</p>
        </div>
        <Button size="sm" className="gradient-gold text-accent-foreground">
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>

      <Card className="border-2 border-dashed border-muted">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Crosshair className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="font-display">No Equipment Yet</CardTitle>
          <CardDescription>
            Add your bows, arrows, and accessories to track maintenance and performance
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add First Item
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
