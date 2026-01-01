import type { Feature } from "@/config/features";
import { getAccentColor } from "@/config/theme";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = feature.icon;
  const accentColor = getAccentColor(feature.accent);
  
  return (
    <div 
      className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/80 animate-fade-in"
      style={{ 
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
    >
      {/* Corner accent */}
      <div 
        className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accentColor} 50%)`,
          borderTopRightRadius: '1rem',
        }}
      />
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${accentColor}20, inset 0 0 40px ${accentColor}05`,
        }}
      />
      
      {/* Icon */}
      <div 
        className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ 
          background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}05)`,
          border: `1px solid ${accentColor}30`,
        }}
      >
        <Icon 
          className="w-7 h-7 transition-colors duration-300" 
          style={{ color: accentColor }}
        />
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
      
      {/* Bottom line accent */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
