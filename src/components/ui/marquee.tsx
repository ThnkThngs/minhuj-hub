import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export function Marquee({ children, className, speed = "normal" }: MarqueeProps) {
  const speedClasses = {
    slow: "animate-[marquee_30s_linear_infinite]",
    normal: "animate-[marquee_20s_linear_infinite]",
    fast: "animate-[marquee_10s_linear_infinite]",
  };

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div className={cn("inline-flex", speedClasses[speed])}>
        <span className="inline-flex items-center gap-8 pr-8">{children}</span>
        <span className="inline-flex items-center gap-8 pr-8">{children}</span>
      </div>
    </div>
  );
}
