import * as React from "react";
import { cn } from "@/lib/utils";

interface CornerFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const CornerFrame = React.forwardRef<HTMLDivElement, CornerFrameProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* Corner markers */}
        <span className="absolute top-3 left-3 text-xs text-muted-foreground font-light select-none">+</span>
        <span className="absolute top-3 right-3 text-xs text-muted-foreground font-light select-none">+</span>
        <span className="absolute bottom-3 left-3 text-xs text-muted-foreground font-light select-none">+</span>
        <span className="absolute bottom-3 right-3 text-xs text-muted-foreground font-light select-none">+</span>
        {children}
      </div>
    );
  }
);

CornerFrame.displayName = "CornerFrame";
