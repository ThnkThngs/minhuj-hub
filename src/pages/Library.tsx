import { Book, ScrollText, ChevronRight } from "lucide-react";
import { CornerFrame } from "@/components/ui/corner-frame";

const manuscripts = [
  {
    id: "arab-archery",
    title: "Arab Archery",
    subtitle: "A 15th Century Moroccan Manuscript",
    chapters: 47,
    description: "Comprehensive treatise covering all aspects of traditional archery, from equipment to technique.",
    icon: ScrollText,
  },
  {
    id: "mamluk-furusiyah",
    title: "Mamluk Furusiyah Literature",
    subtitle: "Academic Study by Shihab al-Sarraf",
    chapters: 6,
    description: "Scholarly analysis of Islamic martial arts traditions, including archery training methods.",
    icon: Book,
  },
];

export default function Library() {
  return (
    <div className="animate-fade-in">
      <div className="container py-12 space-y-8">
        {/* Hero Header */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Classical Library
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse original archery manuscripts from the golden age
          </p>
        </div>

        {/* Manuscripts Grid */}
        <div className="grid gap-6">
          {manuscripts.map((manuscript) => (
            <CornerFrame
              key={manuscript.id}
              className="bg-card border border-border/50 p-6 md:p-8 cursor-pointer group hover:bg-secondary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <manuscript.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                      {manuscript.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {manuscript.subtitle}
                    </p>
                  </div>
                  <p className="text-muted-foreground">
                    {manuscript.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">
                      {manuscript.chapters} chapters available
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </CornerFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
