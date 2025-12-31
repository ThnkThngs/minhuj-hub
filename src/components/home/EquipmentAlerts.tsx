import { Link } from "react-router-dom";
import { Wrench, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EquipmentAlerts() {
  const alerts: { id: string; item: string; message: string }[] = [];

  if (alerts.length === 0) {
    return (
      <Link to="/equipment">
        <Card className="border-dashed hover:shadow-warm transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Equipment Alerts
              </CardTitle>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add your equipment to receive maintenance reminders.
            </p>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to="/equipment">
      <Card className="border-destructive/50 hover:shadow-warm transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-destructive flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Equipment Alerts
            </CardTitle>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id}>
              <p className="text-sm font-medium">{alert.item}</p>
              <p className="text-xs text-muted-foreground">{alert.message}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
