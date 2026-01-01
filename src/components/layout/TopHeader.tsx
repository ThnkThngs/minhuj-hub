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
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { menuLinks } from "@/config/navigation";

export function TopHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-top">
      <div className="flex items-center gap-2 px-4 md:px-6 py-4">
        {/* Logo box */}
        <div className="glass-dark px-4 py-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="font-display text-primary-foreground text-sm font-bold">ق</span>
          </div>
          <div>
            <h1 className="font-display text-lg font-bold tracking-wide leading-none">Al-Qaws</h1>
            <p className="text-[10px] text-muted-foreground tracking-wider">Archery Academy</p>
          </div>
        </div>

        {/* Menu button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="glass-dark text-foreground hover:bg-secondary/50 w-10 h-10"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-xl border-border">
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
                      "px-4 py-3 rounded transition-colors text-sm",
                      isActive
                        ? "bg-primary/20 text-primary font-medium border-l-2 border-primary"
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

        {/* Get Started CTA */}
        <Link to="/sessions">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 shadow-neon-orange">
            Get Started
          </Button>
        </Link>
      </div>
    </header>
  );
}
