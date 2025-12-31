import { NavLink } from "react-router-dom";
import { Home, Target, BookOpen, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/sessions", icon: Target, label: "Sessions" },
  { to: "/stories", icon: BookOpen, label: "Stories" },
  { to: "/progress", icon: TrendingUp, label: "Progress" },
  { to: "/community", icon: Users, label: "Community" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px]",
                isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-transform",
                    isActive && "scale-110"
                  )}
                />
                <span className={cn(
                  "text-xs font-medium",
                  isActive && "font-semibold"
                )}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
