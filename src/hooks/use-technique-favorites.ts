import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "technique-favorites";

export function useTechniqueFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from cloud or localStorage
  const fetchFavorites = useCallback(async () => {
    if (user) {
      // Fetch from cloud
      const { data, error } = await supabase
        .from("technique_favorites")
        .select("technique_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
      } else {
        setFavorites(data.map((f) => f.technique_id));
      }
    } else {
      // Load from localStorage
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          setFavorites(JSON.parse(stored));
        } catch {
          setFavorites([]);
        }
      }
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (techniqueId: string) => {
    const isFavorited = favorites.includes(techniqueId);

    if (user) {
      // Cloud sync
      if (isFavorited) {
        const { error } = await supabase
          .from("technique_favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("technique_id", techniqueId);

        if (error) {
          toast.error("Failed to remove favorite");
          return;
        }
        setFavorites((prev) => prev.filter((id) => id !== techniqueId));
      } else {
        const { error } = await supabase
          .from("technique_favorites")
          .insert({
            user_id: user.id,
            technique_id: techniqueId,
          });

        if (error) {
          toast.error("Failed to add favorite");
          return;
        }
        setFavorites((prev) => [...prev, techniqueId]);
      }
    } else {
      // localStorage fallback
      const updated = isFavorited
        ? favorites.filter((id) => id !== techniqueId)
        : [...favorites, techniqueId];
      setFavorites(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const isFavorite = (techniqueId: string) => favorites.includes(techniqueId);

  return {
    favorites,
    isLoading,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  };
}
