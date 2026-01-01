import { ChevronDown } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import { useEntranceAnimation } from "@/hooks/use-entrance-animation";
import { BowIllustration } from "./BowIllustration";

export function HeroSection() {
  const { getParallaxStyle, getOpacityStyle } = useParallax();
  const isVisible = useEntranceAnimation(100);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background gradient with parallax */}
      <div 
        className="absolute inset-0 gradient-glow transition-transform duration-100"
        style={getParallaxStyle(0.2)}
      />
      
      {/* Animated neon lines - bottom curves with parallax */}
      <svg
        className="absolute bottom-0 left-0 right-0 h-64 w-full transition-transform duration-100"
        viewBox="0 0 1920 256"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        style={getParallaxStyle(0.3)}
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
      <div 
        className="relative z-10 container transition-all duration-100"
        style={getOpacityStyle(100, 500)}
      >
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh] py-20">
          
          {/* Left side - Bow illustration with floating labels and parallax */}
          <div 
            className={`relative flex items-center justify-center transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
            style={{
              ...getParallaxStyle(-0.1),
              transitionDelay: '200ms',
            }}
          >
            <BowIllustration isVisible={isVisible} />

            {/* Floating Labels with staggered animations */}
            <div 
              className={`absolute top-1/4 right-0 md:right-8 animate-float transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="flex items-center gap-3 glass-dark px-4 py-2 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-accent shadow-neon-cyan animate-pulse" />
                <div className="text-sm text-foreground/90">
                  <div className="font-medium">Thumb Draw</div>
                  <div className="text-xs text-muted-foreground">Traditional Release</div>
                </div>
              </div>
            </div>

            <div 
              className={`absolute bottom-1/3 right-4 md:right-12 animate-float-delayed transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="flex items-center gap-3 glass-dark px-4 py-2 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary shadow-neon-orange animate-pulse" />
                <div className="text-sm text-foreground/90">
                  <div className="font-medium">Khatra</div>
                  <div className="text-xs text-muted-foreground">Power Technique</div>
                </div>
              </div>
            </div>

            <div 
              className={`absolute top-1/2 left-0 md:left-4 animate-float-delayed-2 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              <div className="flex items-center gap-3 glass-dark px-4 py-2 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-neon-cyan animate-pulse" />
                <div className="text-sm text-foreground/90">
                  <div className="font-medium">Arrow Flight</div>
                  <div className="text-xs text-muted-foreground">Precision Path</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Typography with scroll reveal */}
          <div 
            className={`text-right space-y-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight">
              <span 
                className={`text-primary italic block transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                Traditional
              </span>
              <span 
                className={`text-foreground block transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '550ms' }}
              >
                Islamic
              </span>
              <span 
                className={`text-foreground block transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                Archery
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom left - Description box with slide-up animation */}
      <div 
        className={`absolute bottom-24 left-0 z-20 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ 
          transitionDelay: '900ms',
          ...getOpacityStyle(200, 600)
        }}
      >
        <div className="glass-dark max-w-md p-6 ml-4 md:ml-8 border-l-2 border-primary/50">
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
            Master the art of the bow with AI-powered training based on classical manuscripts. 
            Learn authentic techniques from the Sahaba tradition with personalized coaching.
          </p>
        </div>
      </div>

      {/* Scroll indicator with bounce animation */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <div 
          className="glass w-10 h-10 rounded flex items-center justify-center animate-bounce cursor-pointer hover:bg-primary/20 transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
