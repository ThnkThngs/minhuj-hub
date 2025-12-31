import { Trophy, Users, MessageSquare, Target, Medal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CornerFrame } from "@/components/ui/corner-frame";

const features = [
  {
    id: "challenges",
    title: "Challenges",
    description: "Join weekly and monthly archery challenges to test your skills against the community",
    icon: Target,
    action: "Browse Challenges",
    available: true,
  },
  {
    id: "leaderboard",
    title: "Leaderboard",
    description: "See how you rank among fellow archers and climb the ranks",
    icon: Trophy,
    action: "View Rankings",
    available: true,
  },
  {
    id: "discuss",
    title: "Share & Discuss",
    description: "Connect with other traditional archery enthusiasts and share your journey",
    icon: MessageSquare,
    action: "Coming Soon",
    available: false,
  },
];

export default function Community() {
  return (
    <div className="animate-fade-in">
      <div className="container py-12 space-y-8">
        {/* Hero Header */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Community
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect, compete, and grow with fellow archers
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <CornerFrame className="bg-card border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold">0</p>
                <p className="text-sm text-muted-foreground">Archers</p>
              </div>
            </div>
          </CornerFrame>

          <CornerFrame className="bg-card border border-border/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Medal className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold">#—</p>
                <p className="text-sm text-muted-foreground">Your Rank</p>
              </div>
            </div>
          </CornerFrame>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6">
          {features.map((feature) => (
            <CornerFrame
              key={feature.id}
              className="bg-card border border-border/50 p-6 md:p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                  <Button
                    variant={feature.available ? "default" : "outline"}
                    className={feature.available 
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                      : "border-border hover:bg-secondary/50 opacity-50 cursor-not-allowed"
                    }
                    disabled={!feature.available}
                  >
                    {feature.action}
                    {feature.available && <ChevronRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CornerFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
