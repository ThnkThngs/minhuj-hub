import { Book, ScrollText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const manuscripts = [
  {
    id: "arab-archery",
    title: "Arab Archery",
    subtitle: "A 15th Century Moroccan Manuscript",
    chapters: 47,
    description: "Comprehensive treatise covering all aspects of traditional archery, from equipment to technique.",
  },
  {
    id: "mamluk-furusiyah",
    title: "Mamluk Furusiyah Literature",
    subtitle: "Academic Study by Shihab al-Sarraf",
    chapters: 6,
    description: "Scholarly analysis of Islamic martial arts traditions, including archery training methods.",
  },
];

export default function Library() {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-display font-bold">Classical Library</h1>
        <p className="text-muted-foreground">Browse original archery manuscripts</p>
      </div>

      <div className="grid gap-4">
        {manuscripts.map((manuscript) => (
          <Card key={manuscript.id} className="hover:shadow-warm transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {manuscript.id === "arab-archery" ? (
                    <ScrollText className="h-6 w-6 text-primary" />
                  ) : (
                    <Book className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="font-display text-lg">{manuscript.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">{manuscript.subtitle}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{manuscript.description}</p>
              <p className="text-xs text-accent font-medium">{manuscript.chapters} chapters available</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
