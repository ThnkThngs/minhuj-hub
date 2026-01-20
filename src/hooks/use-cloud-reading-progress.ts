import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useSettings } from "./use-settings";

interface CloudProgress {
  manuscript_id: string;
  last_chapter_id: string | null;
  read_chapters: string[];
  last_read_at: string;
  last_scroll_position: number;
}

interface LocalProgress {
  manuscriptId: string;
  lastChapterId: string;
  readChapters: string[];
  lastReadAt: string;
  scrollPosition?: number;
}

const LOCAL_STORAGE_KEY = "reading-progress";

function loadLocalProgress(): LocalProgress[] {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalProgress(progress: LocalProgress[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
}

export function useCloudReadingProgress() {
  const { user } = useAuth();
  const { isCloudSyncEnabled, setLastSyncedAt } = useSettings();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Sync local progress to cloud
  const syncToCloud = useCallback(async () => {
    if (!user || !isCloudSyncEnabled) return;

    setIsSyncing(true);
    setSyncError(null);

    try {
      const localProgress = loadLocalProgress();

      for (const progress of localProgress) {
        const { error } = await supabase
          .from("reading_progress")
          .upsert(
            {
              user_id: user.id,
              manuscript_id: progress.manuscriptId,
              last_chapter_id: progress.lastChapterId,
              read_chapters: progress.readChapters,
              last_read_at: progress.lastReadAt,
              last_scroll_position: progress.scrollPosition || 0,
            },
            {
              onConflict: "user_id,manuscript_id",
            }
          );

        if (error) throw error;
      }

      setLastSyncedAt(new Date().toISOString());
    } catch (error) {
      console.error("Cloud sync error:", error);
      setSyncError("Failed to sync progress");
    } finally {
      setIsSyncing(false);
    }
  }, [user, isCloudSyncEnabled, setLastSyncedAt]);

  // Sync cloud progress to local (merge)
  const syncFromCloud = useCallback(async () => {
    if (!user || !isCloudSyncEnabled) return;

    setIsSyncing(true);
    setSyncError(null);

    try {
      const { data: cloudProgress, error } = await supabase
        .from("reading_progress")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      if (cloudProgress && cloudProgress.length > 0) {
        const localProgress = loadLocalProgress();

        // Merge: use the latest timestamp for each manuscript
        const merged = [...localProgress];

        for (const cloud of cloudProgress as CloudProgress[]) {
          const localIndex = merged.findIndex(
            (l) => l.manuscriptId === cloud.manuscript_id
          );

          const cloudLocal: LocalProgress = {
            manuscriptId: cloud.manuscript_id,
            lastChapterId: cloud.last_chapter_id || "",
            readChapters: cloud.read_chapters || [],
            lastReadAt: cloud.last_read_at,
            scrollPosition: cloud.last_scroll_position,
          };

          if (localIndex === -1) {
            // No local entry, use cloud
            merged.push(cloudLocal);
          } else {
            // Compare timestamps, use latest
            const localTime = new Date(merged[localIndex].lastReadAt).getTime();
            const cloudTime = new Date(cloud.last_read_at).getTime();

            if (cloudTime > localTime) {
              merged[localIndex] = cloudLocal;
            }
          }
        }

        saveLocalProgress(merged);
        setLastSyncedAt(new Date().toISOString());
      }
    } catch (error) {
      console.error("Cloud sync error:", error);
      setSyncError("Failed to fetch cloud progress");
    } finally {
      setIsSyncing(false);
    }
  }, [user, isCloudSyncEnabled, setLastSyncedAt]);

  // Initial sync on mount if enabled
  useEffect(() => {
    if (user && isCloudSyncEnabled) {
      syncFromCloud();
    }
  }, [user, isCloudSyncEnabled, syncFromCloud]);

  // Save single manuscript progress
  const saveProgress = useCallback(
    async (manuscriptId: string, chapterId: string, readChapters: string[], scrollPosition?: number) => {
      const localProgress = loadLocalProgress();
      const existingIndex = localProgress.findIndex(
        (p) => p.manuscriptId === manuscriptId
      );

      const newProgress: LocalProgress = {
        manuscriptId,
        lastChapterId: chapterId,
        readChapters,
        lastReadAt: new Date().toISOString(),
        scrollPosition,
      };

      if (existingIndex >= 0) {
        localProgress[existingIndex] = newProgress;
      } else {
        localProgress.push(newProgress);
      }

      saveLocalProgress(localProgress);

      // Sync to cloud if enabled
      if (user && isCloudSyncEnabled) {
        try {
          await supabase.from("reading_progress").upsert(
            {
              user_id: user.id,
              manuscript_id: manuscriptId,
              last_chapter_id: chapterId,
              read_chapters: readChapters,
              last_read_at: newProgress.lastReadAt,
              last_scroll_position: scrollPosition || 0,
            },
            {
              onConflict: "user_id,manuscript_id",
            }
          );
        } catch (error) {
          console.error("Failed to sync to cloud:", error);
        }
      }
    },
    [user, isCloudSyncEnabled]
  );

  return {
    isSyncing,
    syncError,
    syncToCloud,
    syncFromCloud,
    saveProgress,
  };
}
