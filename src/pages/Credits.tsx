import { ScrollText, BookOpen, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Credits() {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-display font-bold">Credits & Sources</h1>
        <p className="text-muted-foreground">Acknowledging the wisdom of the masters</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ScrollText className="h-6 w-6 text-primary" />
            <CardTitle className="font-display">Arab Archery</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            A 15th-century Moroccan manuscript translated and edited by Nabih Amin Faris and Robert Potter Elmer. 
            This comprehensive treatise on traditional archery serves as the foundation for the AI coaching 
            and technique guidance in Al-Qaws.
          </p>
          <p className="text-xs text-muted-foreground">
            Published from Princeton University Library's Garrett Collection of Arabic Manuscripts.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle className="font-display">Mamluk Furūsīyah Literature</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Academic study by Shihab al-Sarraf from the International Center of Furusiyya Studies. 
            This scholarly work provides historical context and analysis of Islamic martial arts traditions, 
            informing the cultural and historical aspects of Al-Qaws.
          </p>
          <p className="text-xs text-muted-foreground">
            Published in Mamluk Studies Review, Vol. VIII, 2004.
          </p>
        </CardContent>
      </Card>

      <Card className="border-accent/30">
        <CardContent className="py-6">
          <div className="flex items-center justify-center gap-2 text-accent">
            <Heart className="h-5 w-5 fill-current" />
            <p className="font-display font-medium">Built with love for the tradition</p>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Al-Qaws aims to preserve and promote the noble art of traditional Islamic archery, 
            guided by the authentic teachings of the classical masters.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
