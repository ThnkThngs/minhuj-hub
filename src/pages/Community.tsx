import { Users, Trophy, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Community() {
  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-2xl font-display font-bold">Community</h1>
        <p className="text-muted-foreground">Connect with fellow archers</p>
      </div>

      <div className="grid gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-display">Challenges</CardTitle>
                <CardDescription className="text-xs">Join weekly & monthly challenges</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">
              Browse Challenges
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/5 to-transparent">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-base font-display">Leaderboard</CardTitle>
                <CardDescription className="text-xs">See how you rank among archers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full">
              View Rankings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base font-display">Share & Discuss</CardTitle>
                <CardDescription className="text-xs">Share tips, equipment, and stories</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center py-4">Coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
