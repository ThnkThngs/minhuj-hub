import { Link } from "react-router-dom";
import { Target, BookOpen, Crosshair, Library } from "lucide-react";
import { CornerFrame } from "@/components/ui/corner-frame";

const actions = [
  {
    to: "/sessions",
    icon: Target,
    label: "New Session",
    description: "AI-generated training plans based on classical manuscripts",
  },
  {
    to: "/analyze",
    icon: Crosshair,
    label: "Analyze",
    description: "Upload your form for AI technique analysis",
  },
  {
    to: "/stories",
    icon: BookOpen,
    label: "Heritage Stories",
    description: "Discover tales of the Sahaba and archery tradition",
  },
  {
    to: "/library",
    icon: Library,
    label: "Library",
    description: "Browse classical archery manuscripts",
  },
];

export function QuickActions() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link key={action.to} to={action.to} className="group">
              <CornerFrame className="bg-card hover:bg-secondary/50 border border-border/50 p-8 h-full transition-all duration-300">
                <div className="flex flex-col gap-4">
                  <action.icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                      {action.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CornerFrame>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
