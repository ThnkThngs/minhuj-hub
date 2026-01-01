import { Sparkles } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import { features } from "@/config/features";
import { FeatureCard } from "./FeatureCard";

export function FeaturesSection() {
  const { scrollY } = useParallax();
  
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
