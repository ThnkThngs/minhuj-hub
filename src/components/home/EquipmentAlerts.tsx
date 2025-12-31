import { Link } from "react-router-dom";
import { Wrench, ChevronRight } from "lucide-react";
import { CornerFrame } from "@/components/ui/corner-frame";

export function EquipmentAlerts() {
  const alerts: { id: string; item: string; message: string }[] = [];

  if (alerts.length === 0) {
    return (
      <Link to="/equipment" className="block group">
        <CornerFrame className="bg-card border border-dashed border-border/50 p-6 hover:bg-secondary/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wrench className="h-4 w-4" />
              <span className="text-sm uppercase tracking-wider">Equipment Alerts</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground">
            Add your equipment to receive maintenance reminders.
          </p>
        </CornerFrame>
      </Link>
    );
  }

  return (
    <Link to="/equipment" className="block group">
      <CornerFrame className="bg-card border border-destructive/30 p-6 hover:bg-secondary/30 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-destructive">
            <Wrench className="h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">Equipment Alerts</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id}>
              <p className="text-sm font-medium">{alert.item}</p>
              <p className="text-xs text-muted-foreground">{alert.message}</p>
            </div>
          ))}
        </div>
      </CornerFrame>
    </Link>
  );
}
