import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccentType } from "@/config/theme";

interface ActionCardProps {
  to: string;
  icon: LucideIcon;
  label: string;
  description: string;
  accent: AccentType;
}

export function ActionCard({ to, icon: Icon, label, description, accent }: ActionCardProps) {
  const isPrimary = accent === "primary";
  
  return (
    <Link to={to} className="group">
      <div 
        className={cn(
          "relative overflow-hidden p-6 md:p-8 h-full transition-all duration-300",
          "bg-card/50 backdrop-blur-sm border border-border/50",
          isPrimary 
            ? "hover:border-primary/50 hover:shadow-neon-orange" 
            : "hover:border-accent/50 hover:shadow-neon-cyan"
        )}
      >
        {/* Corner accent */}
        <div 
          className={cn(
            "absolute top-0 left-0 w-16 h-16",
            isPrimary ? "bg-primary/10" : "bg-accent/10"
          )}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          }}
        />
        
        <div className="relative flex flex-col gap-4">
          <Icon 
            className={cn(
              "h-6 w-6",
              isPrimary ? "text-primary" : "text-accent"
            )} 
          />
          <div>
            <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
              {label}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Bottom line accent */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 h-0.5",
            "transform scale-x-0 group-hover:scale-x-100",
            "transition-transform duration-300 origin-left",
            isPrimary ? "bg-primary" : "bg-accent"
          )}
        />
      </div>
    </Link>
  );
}
