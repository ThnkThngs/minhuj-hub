import { quickActions } from "@/config/navigation";
import { ActionCard } from "./ActionCard";

export function QuickActions() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <ActionCard
              key={action.to}
              to={action.to}
              icon={action.icon}
              label={action.label}
              description={action.description}
              accent={action.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
