import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-glow" />
      
      {/* Animated neon lines - bottom curves */}
      <svg
        className="absolute bottom-0 left-0 right-0 h-64 w-full"
        viewBox="0 0 1920 256"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        {/* Cyan flowing line */}
        <path
          d="M-100 180 Q400 120 700 160 T1200 140 T1700 180 T2100 120"
          stroke="hsl(190 100% 50%)"
          strokeWidth="3"
          fill="none"
          className="animate-draw"
          style={{ filter: "drop-shadow(0 0 8px hsl(190 100% 50%))" }}
        />
        {/* Orange/red flowing line */}
        <path
          d="M-100 220 Q300 180 600 200 T1100 180 T1600 220 T2100 180"
          stroke="hsl(14 90% 58%)"
          strokeWidth="2"
          fill="none"
          className="animate-draw"
          style={{ filter: "drop-shadow(0 0 8px hsl(14 90% 58%))", animationDelay: "0.3s" }}
        />
        {/* Secondary cyan line */}
        <path
          d="M-100 200 Q500 160 800 190 T1400 170 T1900 200"
          stroke="hsl(190 100% 50% / 0.5)"
          strokeWidth="1.5"
          fill="none"
          className="animate-draw"
          style={{ animationDelay: "0.5s" }}
        />
      </svg>

      {/* Main content */}
      <div className="relative z-10 container">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh] py-20">
          
          {/* Left side - Bow illustration with floating labels */}
          <div className="relative flex items-center justify-center">
            {/* Wireframe Bow SVG */}
            <svg
              viewBox="0 0 400 500"
              className="w-full max-w-md h-auto"
              fill="none"
            >
              {/* Bow limb - top */}
              <path
                d="M200 50 Q280 100 300 200 Q310 280 290 350"
                stroke="hsl(190 100% 50% / 0.8)"
                strokeWidth="2"
                fill="none"
                style={{ filter: "drop-shadow(0 0 6px hsl(190 100% 50%))" }}
              />
              {/* Bow limb - bottom */}
              <path
                d="M200 450 Q280 400 300 300 Q310 220 290 150"
                stroke="hsl(190 100% 50% / 0.8)"
                strokeWidth="2"
                fill="none"
                style={{ filter: "drop-shadow(0 0 6px hsl(190 100% 50%))" }}
              />
              {/* Bow grip */}
              <path
                d="M195 230 Q180 250 195 270"
                stroke="hsl(14 90% 58%)"
                strokeWidth="3"
                fill="none"
                style={{ filter: "drop-shadow(0 0 8px hsl(14 90% 58%))" }}
              />
              {/* String */}
              <path
                d="M200 50 L200 450"
                stroke="hsl(0 0% 60%)"
                strokeWidth="1"
                strokeDasharray="4 4"
                fill="none"
              />
              {/* Arrow */}
              <line
                x1="100"
                y1="250"
                x2="200"
                y2="250"
                stroke="hsl(14 90% 58% / 0.9)"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 4px hsl(14 90% 58%))" }}
              />
              {/* Arrowhead */}
              <polygon
                points="95,250 105,245 105,255"
                fill="hsl(14 90% 58%)"
                style={{ filter: "drop-shadow(0 0 4px hsl(14 90% 58%))" }}
              />
              {/* Nock point */}
              <circle
                cx="200"
                cy="250"
                r="4"
                fill="hsl(190 100% 50%)"
                style={{ filter: "drop-shadow(0 0 8px hsl(190 100% 50%))" }}
              />
            </svg>

            {/* Floating Labels */}
            <div className="absolute top-1/4 right-0 md:right-8 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent shadow-neon-cyan" />
                <div className="text-sm text-foreground/90">
                  <div className="font-medium">Thumb Draw</div>
                  <div className="text-xs text-muted-foreground">Traditional Release</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/3 right-4 md:right-12 animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary shadow-neon-orange" />
                <div className="text-sm text-foreground/90">
                  <div className="font-medium">Khatra</div>
                  <div className="text-xs text-muted-foreground">Power Technique</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-0 md:left-4 animate-float-delayed-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-neon-cyan" />
                <div className="text-sm text-foreground/90">
                  <div className="font-medium">Arrow Flight</div>
                  <div className="text-xs text-muted-foreground">Precision Path</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Typography */}
          <div className="text-right space-y-6">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight">
              <span className="text-primary italic">Traditional</span>
              <br />
              <span className="text-foreground">Islamic</span>
              <br />
              <span className="text-foreground">Archery</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom left - Description box */}
      <div className="absolute bottom-24 left-0 z-20">
        <div className="glass-dark max-w-md p-6 ml-4 md:ml-8">
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
            Master the art of the bow with AI-powered training based on classical manuscripts. 
            Learn authentic techniques from the Sahaba tradition with personalized coaching.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="glass w-10 h-10 rounded flex items-center justify-center animate-pulse-glow">
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}