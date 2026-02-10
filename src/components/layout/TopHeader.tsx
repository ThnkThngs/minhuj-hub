import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavLink, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { menuLinks } from "@/config/navigation";
import { UserMenu } from "@/components/auth/UserMenu";
export function TopHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return <header className="fixed top-0 left-0 right-0 z-50 safe-top">
      <div className="flex items-center gap-2 px-3 md:px-6 py-3 md:py-4">
        {/* Logo box */}
        <div className="glass-dark px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2 md:gap-3">
          <img src="/favicon.png" alt="Minhaj-Hub logo" className="w-7 h-7 md:w-8 md:h-8 rounded-full" />
          <div>
            <h1 className="font-display text-base md:text-lg font-bold tracking-wide leading-none">Minhaj-Hub</h1>
            <p className="text-[9px] md:text-[10px] text-muted-foreground tracking-wider">Archery Academy</p>
          </div>
        </div>

        {/* Menu button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="glass-dark text-foreground hover:bg-secondary/50 w-9 h-9 md:w-10 md:h-10">
              <Menu className="h-4 w-4 md:h-5 md:w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-xl border-border">
            <SheetHeader>
              <SheetTitle className="text-foreground font-display text-2xl">Al-Qaws</SheetTitle>
              <SheetDescription className="sr-only">Navigation menu</SheetDescription>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1">
              {menuLinks.map(link => <NavLink key={link.to} to={link.to} onClick={() => setIsOpen(false)} className={({
              isActive
            }) => cn("px-4 py-3 rounded transition-colors text-sm", isActive ? "bg-primary/20 text-primary font-medium border-l-2 border-primary" : "text-foreground hover:bg-secondary/50")}>
                  {link.label}
                </NavLink>)}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User Menu */}
        <div className="glass-dark p-1.5 rounded-full">
          <UserMenu />
        </div>
      </div>
    </header>;
}