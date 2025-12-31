import { ScrollText, Book, Heart, ExternalLink } from "lucide-react";
import { CornerFrame } from "@/components/ui/corner-frame";

const sources = [
  {
    id: "arab-archery",
    title: "Arab Archery",
    subtitle: "An Arabic manuscript of about A.D. 1500 'A book on the excellence of the bow & arrow'",
    description: "Translated and edited by Nabih Amin Faris and Robert Potter Elmer. This comprehensive treatise forms the foundation of the classical archery knowledge in this app.",
    icon: ScrollText,
  },
  {
    id: "mamluk-furusiyah",
    title: "Mamluk Furūsīyah Literature",
    subtitle: "Academic study by Shihab al-Sarraf",
    description: "Scholarly analysis that provides historical context and training methodology insights into Islamic martial arts traditions.",
    icon: Book,
  },
];

export default function Credits() {
  return (
    <div className="animate-fade-in">
      <div className="container py-12 space-y-8">
        {/* Hero Header */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Credits & Sources
          </h1>
          <p className="text-muted-foreground text-lg">
            Acknowledgments and references behind Al-Qaws
          </p>
        </div>

        {/* Sources */}
        <div className="grid gap-6">
          {sources.map((source) => (
            <CornerFrame
              key={source.id}
              className="bg-card border border-border/50 p-6 md:p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <source.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold">
                      {source.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {source.subtitle}
                    </p>
                  </div>
                  <p className="text-muted-foreground">
                    {source.description}
                  </p>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center gap-1 transition-colors">
                    Learn more <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </CornerFrame>
          ))}
        </div>

        {/* Dedication */}
        <CornerFrame className="bg-card border border-border/50 p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-3 max-w-2xl mx-auto">
              <h3 className="font-display text-2xl font-bold">
                Built with Passion
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Al-Qaws is built with deep respect for the classical archery tradition and the scholars who preserved this knowledge. Our goal is to make these timeless teachings accessible to modern practitioners seeking to master the art of the bow.
              </p>
            </div>
          </div>
        </CornerFrame>
      </div>
    </div>
  );
}
