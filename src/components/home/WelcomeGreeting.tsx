import { Flame } from "lucide-react";

export function WelcomeGreeting() {
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 17) greeting = "Good afternoon";

  return (
    <div className="space-y-1">
      <p className="text-muted-foreground">{greeting}, Archer</p>
      <h1 className="text-2xl font-display font-bold">Welcome to Al-Qaws</h1>
      <div className="flex items-center gap-2 mt-2">
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-medium">0 day streak</span>
        </div>
      </div>
    </div>
  );
}
