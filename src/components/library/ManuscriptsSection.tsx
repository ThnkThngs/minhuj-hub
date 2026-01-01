import { Book, ScrollText, ChevronRight } from "lucide-react";
import { CornerFrame } from "@/components/ui/corner-frame";

const manuscripts = [
  {
    id: "arab-archery",
    title: "Arab Archery",
    subtitle: "A 15th Century Moroccan Manuscript",
    chapters: 47,
    description: "Comprehensive treatise covering all aspects of traditional archery.",
    icon: ScrollText,
  },
  {
    id: "saracen-archery",
    title: "Saracen Archery",
    subtitle: "A Mameluke Work on Archery (ca. A.D. 1368)",
    chapters: 34,
    description: "Detailed technical instruction from medieval Egypt.",
    icon: ScrollText,
  },
  {
    id: "mamluk-furusiyah",
    title: "Mamluk Furusiyah",
    subtitle: "Academic Study by Shihab al-Sarraf",
    chapters: 6,
    description: "Scholarly analysis of Islamic martial arts traditions.",
    icon: Book,
  },
];

export function ManuscriptsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">Source Manuscripts</h2>
        <span className="text-sm text-muted-foreground">
          {manuscripts.length} texts available
        </span>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {manuscripts.map((manuscript) => (
          <CornerFrame
            key={manuscript.id}
            className="bg-card/50 border border-border/30 p-4 cursor-pointer group hover:bg-secondary/20 hover:border-accent/30 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                <manuscript.icon className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-display font-bold text-sm group-hover:text-accent transition-colors truncate">
                  {manuscript.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {manuscript.subtitle}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-accent">
                    {manuscript.chapters} chapters
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          </CornerFrame>
        ))}
      </div>
    </div>
  );
}
