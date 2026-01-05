import { useState, useEffect, useCallback } from "react";

export interface SavedStory {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  savedAt: string;
  isFavorite: boolean;
}

const STORAGE_KEY = "heritage-stories-saved";

export function useSavedStories() {
  const [savedStories, setSavedStories] = useState<SavedStory[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedStories(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load saved stories:", error);
    }
  }, []);

  // Persist to localStorage when stories change
  const persistStories = useCallback((stories: SavedStory[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    } catch (error) {
      console.error("Failed to save stories:", error);
    }
  }, []);

  const saveStory = useCallback((story: { id: string; title: string; content: string; createdAt: Date }) => {
    setSavedStories((prev) => {
      // Don't add duplicates
      if (prev.some((s) => s.id === story.id)) {
        return prev;
      }
      const newStory: SavedStory = {
        id: story.id,
        title: story.title,
        content: story.content,
        createdAt: story.createdAt.toISOString(),
        savedAt: new Date().toISOString(),
        isFavorite: false,
      };
      const updated = [newStory, ...prev];
      persistStories(updated);
      return updated;
    });
  }, [persistStories]);

  const removeStory = useCallback((id: string) => {
    setSavedStories((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      persistStories(updated);
      return updated;
    });
  }, [persistStories]);

  const toggleFavorite = useCallback((id: string) => {
    setSavedStories((prev) => {
      const updated = prev.map((s) =>
        s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
      );
      persistStories(updated);
      return updated;
    });
  }, [persistStories]);

  const isStorySaved = useCallback((id: string) => {
    return savedStories.some((s) => s.id === id);
  }, [savedStories]);

  const isStoryFavorited = useCallback((id: string) => {
    return savedStories.find((s) => s.id === id)?.isFavorite ?? false;
  }, [savedStories]);

  const favorites = savedStories.filter((s) => s.isFavorite);

  return {
    savedStories,
    favorites,
    saveStory,
    removeStory,
    toggleFavorite,
    isStorySaved,
    isStoryFavorited,
  };
}
