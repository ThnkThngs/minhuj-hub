import { Plus, Crosshair, Wrench, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CornerFrame } from "@/components/ui/corner-frame";

export default function Equipment() {
  return (
    <div className="animate-fade-in">
      <div className="container py-12 space-y-8">
        {/* Hero Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Equipment
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your archery gear and maintenance
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Empty State Card */}
        <CornerFrame className="bg-card border border-border/50 p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Crosshair className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                No Equipment Yet
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Add your bows, arrows, and accessories to track maintenance schedules and performance notes
              </p>
            </div>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary/50">
              <Plus className="mr-2 h-5 w-5" />
              Add First Item
            </Button>
          </div>
        </CornerFrame>

        {/* Maintenance Alerts Section */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl font-semibold">Maintenance Alerts</h2>
          
          <Card className="bg-card border-border/50">
            <CardContent className="py-12 text-center">
              <div className="space-y-4">
                <div className="flex justify-center gap-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    <span>No maintenance due</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>0 alerts</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Add equipment to receive maintenance reminders
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
