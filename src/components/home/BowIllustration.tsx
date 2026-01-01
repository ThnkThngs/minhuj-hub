interface BowIllustrationProps {
  isVisible: boolean;
}

export function BowIllustration({ isVisible }: BowIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={`w-full max-w-md h-auto transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      fill="none"
      style={{ transitionDelay: '400ms' }}
    >
      {/* Bow limb - top */}
      <path
        d="M200 50 Q280 100 300 200 Q310 280 290 350"
        stroke="hsl(190 100% 50% / 0.8)"
        strokeWidth="2"
        fill="none"
        className="animate-draw-slow"
        style={{ filter: "drop-shadow(0 0 6px hsl(190 100% 50%))" }}
      />
      {/* Bow limb - bottom */}
      <path
        d="M200 450 Q280 400 300 300 Q310 220 290 150"
        stroke="hsl(190 100% 50% / 0.8)"
        strokeWidth="2"
        fill="none"
        className="animate-draw-slow"
        style={{ filter: "drop-shadow(0 0 6px hsl(190 100% 50%))", animationDelay: "0.2s" }}
      />
      {/* Bow grip */}
      <path
        d="M195 230 Q180 250 195 270"
        stroke="hsl(14 90% 58%)"
        strokeWidth="3"
        fill="none"
        className="animate-draw-slow"
        style={{ filter: "drop-shadow(0 0 8px hsl(14 90% 58%))", animationDelay: "0.4s" }}
      />
      {/* String */}
      <path
        d="M200 50 L200 450"
        stroke="hsl(0 0% 60%)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        className="animate-draw-slow"
        style={{ animationDelay: "0.6s" }}
      />
      {/* Arrow */}
      <line
        x1="100"
        y1="250"
        x2="200"
        y2="250"
        stroke="hsl(14 90% 58% / 0.9)"
        strokeWidth="2"
        className="animate-draw-slow"
        style={{ filter: "drop-shadow(0 0 4px hsl(14 90% 58%))", animationDelay: "0.8s" }}
      />
      {/* Arrowhead */}
      <polygon
        points="95,250 105,245 105,255"
        fill="hsl(14 90% 58%)"
        className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ filter: "drop-shadow(0 0 4px hsl(14 90% 58%))", transitionDelay: "1s" }}
      />
      {/* Nock point */}
      <circle
        cx="200"
        cy="250"
        r="4"
        fill="hsl(190 100% 50%)"
        className="animate-pulse-glow"
        style={{ filter: "drop-shadow(0 0 8px hsl(190 100% 50%))" }}
      />
    </svg>
  );
}
