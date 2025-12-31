import { Brain, BookOpen, TrendingUp, Sparkles } from "lucide-react";
import { useScrollParallax } from "@/hooks/use-scroll-parallax";

const features = [
  {
    icon: Brain,
    title: "AI Coaching",
    description: "Deep Thinking mode analyzes your form using classical manuscripts for historically-accurate guidance.",
    accent: "primary",
  },
  {
    icon: BookOpen,
    title: "Classical Manuscripts",
    description: "Access 'Arab Archery', 'Saracen Archery', and Mamluk Furusiyah literature as your knowledge base.",
    accent: "accent",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Track sessions, scores, and earn ranks with XP badges featuring Islamic geometric patterns.",
    accent: "neon-cyan",
  },
];

export function FeaturesSection() {
  const { scrollY } = useScrollParallax();
  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Floating accent elements */}
      <div 
        className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '1s', transform: `translateY(${scrollY * -0.1}px)` }}
      />
      
      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Master the <span className="text-primary italic">Ancient Art</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Combine cutting-edge AI with centuries of wisdom from classical archery manuscripts.
          </p>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ 
  feature, 
  index 
}: { 
  feature: typeof features[0]; 
  index: number;
}) {
  const Icon = feature.icon;
  const accentColor = feature.accent === 'primary' 
    ? 'hsl(var(--primary))' 
    : feature.accent === 'accent' 
      ? 'hsl(var(--accent))' 
      : 'hsl(var(--neon-cyan))';
  
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
