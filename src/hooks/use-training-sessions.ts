import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type SessionMood = "focused" | "struggling" | "improving" | "tired" | "energized";

export interface TrainingSession {
  id: string;
  user_id: string;
  session_date: string;
  duration_minutes: number;
  arrows_shot: number;
  notes: string | null;
  techniques_practiced: string[];
  mood: SessionMood | null;
  created_at: string;
  updated_at: string;
}

export interface CreateSessionInput {
  session_date: string;
  duration_minutes: number;
  arrows_shot: number;
  notes?: string;
  techniques_practiced?: string[];
  mood?: SessionMood;
}

export function useTrainingSessions() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    if (!user) {
      setSessions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("training_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("session_date", { ascending: false });

    if (error) {
      console.error("Error fetching sessions:", error);
      toast.error("Failed to load sessions");
    } else {
      setSessions(data as TrainingSession[]);
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const createSession = async (input: CreateSessionInput) => {
    if (!user) {
      toast.error("Please sign in to log sessions");
      return null;
    }

    const { data, error } = await supabase
      .from("training_sessions")
      .insert({
        user_id: user.id,
        session_date: input.session_date,
        duration_minutes: input.duration_minutes,
        arrows_shot: input.arrows_shot,
        notes: input.notes || null,
        techniques_practiced: input.techniques_practiced || [],
        mood: input.mood || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to create session");
      return null;
    }

    setSessions((prev) => [data as TrainingSession, ...prev]);
    toast.success("Session logged successfully!");
    return data as TrainingSession;
  };

  const deleteSession = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("training_sessions")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session");
      return;
    }

    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Session deleted");
  };

  const stats = {
    totalSessions: sessions.length,
    totalMinutes: sessions.reduce((acc, s) => acc + s.duration_minutes, 0),
    totalArrows: sessions.reduce((acc, s) => acc + s.arrows_shot, 0),
    thisWeek: sessions.filter((s) => {
      const sessionDate = new Date(s.session_date);
      const now = new Date();
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      return sessionDate >= weekAgo;
    }),
  };

  return {
    sessions,
    isLoading,
    createSession,
    deleteSession,
    refetch: fetchSessions,
    stats: {
      ...stats,
      weekSessions: stats.thisWeek.length,
      weekMinutes: stats.thisWeek.reduce((acc, s) => acc + s.duration_minutes, 0),
      weekArrows: stats.thisWeek.reduce((acc, s) => acc + s.arrows_shot, 0),
    },
  };
}
