import { Marquee } from "@/components/ui/marquee";
import { CornerFrame } from "@/components/ui/corner-frame";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1565711561500-49678a10a63f?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Content */}
      <div className="relative z-10 container py-12">
        <CornerFrame className="py-16 px-4">
          <div className="text-center space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Traditional Islamic Archery
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
              Master the Art
              <br />
              <span className="text-primary">of the Bow</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Train in the tradition of the Sahaba. 
              Learn authentic techniques passed down through centuries.
            </p>
          </div>
        </CornerFrame>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 py-4 border-y border-border/50 bg-background/80 backdrop-blur-sm">
        <Marquee speed="slow">
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Khatra
          </span>
          <span className="text-primary">•</span>
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Thumb Draw
          </span>
          <span className="text-primary">•</span>
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Release
          </span>
          <span className="text-primary">•</span>
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Mastery
          </span>
          <span className="text-primary">•</span>
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Heritage
          </span>
          <span className="text-primary">•</span>
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Discipline
          </span>
          <span className="text-primary">•</span>
        </Marquee>
      </div>
    </section>
  );
}
