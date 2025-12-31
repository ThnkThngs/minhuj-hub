import { useState } from "react";
import { Menu, User, Wifi, WifiOff } from "lucide-react";
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
  const [isOnline] = useState(navigator.onLine);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground safe-top">
      <div className="flex items-center justify-between px-4 py-3">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-sidebar text-sidebar-foreground">
            <SheetHeader>
              <SheetTitle className="text-sidebar-foreground font-display text-xl">Al-Qaws</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {menuLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <h1 className="font-display text-xl font-bold tracking-wide">Al-Qaws</h1>

        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-success" />
          ) : (
            <WifiOff className="h-4 w-4 text-muted-foreground" />
          )}
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
