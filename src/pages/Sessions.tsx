import { useState } from "react";
import { Target, Sparkles, Plus, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CornerFrame } from "@/components/ui/corner-frame";
import { SessionForm } from "@/components/sessions/SessionForm";
import { SessionCard } from "@/components/sessions/SessionCard";
import { SessionStats } from "@/components/sessions/SessionStats";
import { useTrainingSessions, type CreateSessionInput } from "@/hooks/use-training-sessions";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Sessions() {
  const { user, isLoading: authLoading } = useAuth();
  const { sessions, isLoading, createSession, deleteSession, stats } = useTrainingSessions();
  const [showForm, setShowForm] = useState(false);

  const handleCreateSession = async (data: CreateSessionInput) => {
    const result = await createSession(data);
    if (result) {
      setShowForm(false);
    }
  };

  // Not logged in state
  if (!authLoading && !user) {
    return (
      <div className="animate-fade-in">
        <div className="container py-6 md:py-12 space-y-6 md:space-y-8">
          <div className="space-y-1 md:space-y-2">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
              Session Architect
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              AI-powered personalized training sessions
            </p>
          </div>

          <CornerFrame className="bg-card border border-border/50 p-5 md:p-8 lg:p-12">
            <div className="text-center space-y-4 md:space-y-6">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <LogIn className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              </div>
              <div className="space-y-2 md:space-y-3">
                <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold">
                  Sign In to Track Sessions
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                  Create an account to log your training sessions, track progress, and sync across devices
                </p>
              </div>
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 md:px-8">
                  <LogIn className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Sign In to Get Started
                </Button>
              </Link>
            </div>
          </CornerFrame>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="container py-6 md:py-12 space-y-6 md:space-y-8">
        {/* Hero Header */}
        <div className="space-y-1 md:space-y-2">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
            Session Architect
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            AI-powered personalized training sessions
          </p>
        </div>

        {/* Stats */}
        {!isLoading && sessions.length > 0 && (
          <SessionStats
            totalSessions={stats.totalSessions}
            totalMinutes={stats.totalMinutes}
            totalArrows={stats.totalArrows}
            weekSessions={stats.weekSessions}
            weekMinutes={stats.weekMinutes}
            weekArrows={stats.weekArrows}
          />
        )}

        {/* Add Session Toggle or Form */}
        {showForm ? (
          <SessionForm
            onSubmit={handleCreateSession}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <CornerFrame className="bg-card border border-border/50 p-5 md:p-8 lg:p-12">
            <div className="text-center space-y-4 md:space-y-6">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              </div>
              <div className="space-y-2 md:space-y-3">
                <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold">
                  {sessions.length === 0 ? "Log Your First Session" : "Log New Session"}
                </h2>
                <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
                  Track your archery practice with date, duration, arrows shot, and techniques
                </p>
              </div>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 md:px-8"
                onClick={() => setShowForm(true)}
              >
                <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Log Session
              </Button>
            </div>
          </CornerFrame>
        )}

        {/* My Sessions Section */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="font-display text-xl md:text-2xl font-semibold">My Sessions</h2>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 md:py-12 text-muted-foreground border border-dashed border-border/50 rounded-lg">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No sessions logged yet</p>
              <p className="text-sm mt-1">Start tracking your practice above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onDelete={deleteSession}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
