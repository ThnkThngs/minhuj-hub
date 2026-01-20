import { Settings as SettingsIcon, Cloud, CloudOff, RefreshCw, LogIn } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/use-settings";
import { useCloudReadingProgress } from "@/hooks/use-cloud-reading-progress";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function Settings() {
  const { user } = useAuth();
  const { isCloudSyncEnabled, toggleCloudSync, lastSyncedAt } = useSettings();
  const { isSyncing, syncToCloud, syncFromCloud, syncError } = useCloudReadingProgress();

  const handleSyncNow = async () => {
    await syncFromCloud();
    await syncToCloud();
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative py-8 px-4 mb-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20 mb-4">
            <SettingsIcon className="w-7 h-7 text-accent" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Customize your reading experience
          </p>
        </div>
      </div>

      <div className="px-4 max-w-2xl mx-auto">
        {/* Reading Preferences Section */}
        <div className="mb-8">
          <h2 className="text-lg font-display font-bold text-foreground mb-4">
            Reading Preferences
          </h2>

          {/* Cloud Sync Card */}
          <div className="p-4 rounded-xl bg-secondary/20 border border-border/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  {isCloudSyncEnabled ? (
                    <Cloud className="w-5 h-5 text-accent" />
                  ) : (
                    <CloudOff className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">
                    Cloud Sync
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sync your reading progress across devices
                  </p>
                </div>
              </div>
              <Switch
                checked={isCloudSyncEnabled}
                onCheckedChange={toggleCloudSync}
                disabled={!user}
              />
            </div>

            {/* Login prompt if not authenticated */}
            {!user && (
              <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3">
                  <LogIn className="w-5 h-5 text-accent" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      Sign in to enable cloud sync
                    </p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Sync status when enabled */}
            {user && isCloudSyncEnabled && (
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground">
                      {isSyncing ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Syncing...
                        </span>
                      ) : lastSyncedAt ? (
                        <span className="text-muted-foreground">
                          Last synced: {formatDistanceToNow(new Date(lastSyncedAt), { addSuffix: true })}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Not synced yet</span>
                      )}
                    </p>
                    {syncError && (
                      <p className="text-sm text-destructive mt-1">{syncError}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSyncNow}
                    disabled={isSyncing}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
                    Sync Now
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Section */}
        {user && (
          <div className="mb-8">
            <h2 className="text-lg font-display font-bold text-foreground mb-4">
              Account
            </h2>
            <div className="p-4 rounded-xl bg-secondary/20 border border-border/30">
              <p className="text-sm text-muted-foreground">
                Signed in as <span className="text-foreground">{user.email}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
