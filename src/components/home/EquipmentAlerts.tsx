import { Link } from "react-router-dom";
import { Wrench, ChevronRight } from "lucide-react";

export function EquipmentAlerts() {
  const alerts: { id: string; item: string; message: string }[] = [];

  if (alerts.length === 0) {
    return (
      <Link to="/equipment" className="block group">
        <div className="relative overflow-hidden bg-card/30 backdrop-blur-sm border border-dashed border-border/50 p-6 hover:border-accent/50 hover:shadow-neon-cyan transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wrench className="h-4 w-4 text-accent" />
              <span className="text-sm uppercase tracking-wider">Equipment Alerts</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
          </div>
          <p className="text-sm text-muted-foreground">
            Add your equipment to receive maintenance reminders.
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/equipment" className="block group">
      <div className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-destructive/30 p-6 hover:border-destructive/50 transition-all">
        {/* Alert corner */}
        <div 
          className="absolute top-0 right-0 w-16 h-16 bg-destructive/10"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
        />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-destructive">
              <Wrench className="h-4 w-4" />
              <span className="text-sm uppercase tracking-wider">Equipment Alerts</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
          </div>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id}>
                <p className="text-sm font-medium">{alert.item}</p>
                <p className="text-xs text-muted-foreground">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}