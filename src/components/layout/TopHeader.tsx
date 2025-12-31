import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuLinks = [
  { to: "/", label: "Home" },
  { to: "/sessions", label: "Sessions" },
  { to: "/stories", label: "Heritage Stories" },
  { to: "/library", label: "Classical Library" },
  { to: "/analyze", label: "Technique Analysis" },
  { to: "/progress", label: "My Progress" },
  { to: "/equipment", label: "Equipment" },
  { to: "/community", label: "Community" },
  { to: "/credits", label: "Credits" },
];

export function TopHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50 safe-top">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="font-display text-xl font-bold tracking-wide">Al-Qaws</h1>

        {/* Center tagline - hidden on mobile */}
        <p className="hidden md:block text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Traditional Islamic Archery
        </p>

        {/* Menu button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-card border-border">
            <SheetHeader>
              <SheetTitle className="text-foreground font-display text-2xl">Al-Qaws</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1">
              {menuLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-lg transition-colors text-sm",
                      isActive
                        ? "bg-secondary text-primary font-medium"
                        : "text-foreground hover:bg-secondary/50"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
