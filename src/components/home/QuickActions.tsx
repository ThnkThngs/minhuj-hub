import { Link } from "react-router-dom";
import { Target, BookOpen, Crosshair, Library } from "lucide-react";

const actions = [
  {
    to: "/sessions",
    icon: Target,
    label: "New Session",
    description: "AI-generated training plans based on classical manuscripts",
    color: "cyan" as const,
  },
  {
    to: "/analyze",
    icon: Crosshair,
    label: "Analyze",
    description: "Upload your form for AI technique analysis",
    color: "orange" as const,
  },
  {
    to: "/stories",
    icon: BookOpen,
    label: "Heritage Stories",
    description: "Discover tales of the Sahaba and archery tradition",
    color: "cyan" as const,
  },
  {
    to: "/library",
    icon: Library,
    label: "Library",
    description: "Browse classical archery manuscripts",
    color: "orange" as const,
  },
];

export function QuickActions() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link key={action.to} to={action.to} className="group">
              <div 
                className={`
                  relative overflow-hidden p-6 md:p-8 h-full transition-all duration-300
                  bg-card/50 backdrop-blur-sm border border-border/50
                  hover:border-${action.color === 'cyan' ? 'accent' : 'primary'}/50
                  ${action.color === 'cyan' ? 'hover:shadow-neon-cyan' : 'hover:shadow-neon-orange'}
                `}
              >
                {/* Corner accent */}
                <div 
                  className={`
                    absolute top-0 left-0 w-16 h-16 
                    ${action.color === 'cyan' ? 'bg-accent/10' : 'bg-primary/10'}
                  `}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                  }}
                />
                
                <div className="relative flex flex-col gap-4">
                  <action.icon 
                    className={`h-6 w-6 ${action.color === 'cyan' ? 'text-accent' : 'text-primary'}`} 
                  />
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {action.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>

                {/* Bottom line accent */}
                <div 
                  className={`
                    absolute bottom-0 left-0 right-0 h-0.5 
                    transform scale-x-0 group-hover:scale-x-100 
                    transition-transform duration-300 origin-left
                    ${action.color === 'cyan' ? 'bg-accent' : 'bg-primary'}
                  `}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}