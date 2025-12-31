import { Link } from "react-router-dom";
import { Target, BookOpen, Camera, Library } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const actions = [
  {
    to: "/sessions",
    icon: Target,
    label: "New Session",
    description: "AI training plan",
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    to: "/analyze",
    icon: Camera,
    label: "Analyze",
    description: "Check your form",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    to: "/stories",
    icon: BookOpen,
    label: "Stories",
    description: "Heritage tales",
    gradient: "from-success/20 to-success/5",
    iconColor: "text-success",
  },
  {
    to: "/library",
    icon: Library,
    label: "Library",
    description: "Classical texts",
    gradient: "from-primary/10 to-accent/5",
    iconColor: "text-primary",
  },
];

export function QuickActions() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link key={action.to} to={action.to}>
            <Card
              className={cn(
                "h-full transition-all hover:shadow-warm hover:scale-[1.02] active:scale-[0.98]",
                `bg-gradient-to-br ${action.gradient}`
              )}
            >
              <CardContent className="p-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg bg-background/80 flex items-center justify-center mb-3",
                    action.iconColor
                  )}
                >
                  <action.icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-sm">{action.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
