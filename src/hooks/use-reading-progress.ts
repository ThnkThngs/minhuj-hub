import { useState, useEffect, useCallback } from "react";

interface ReadingProgress {
  manuscriptId: string;
  lastChapterId: string;
  readChapters: string[];
  lastReadAt: string;
}

const STORAGE_KEY = "reading-progress";

function loadProgress(): ReadingProgress[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveProgress(progress: ReadingProgress[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useReadingProgress(manuscriptId: string) {
  const [progress, setProgress] = useState<ReadingProgress | null>(null);

  useEffect(() => {
    const allProgress = loadProgress();
    const manuscriptProgress = allProgress.find((p) => p.manuscriptId === manuscriptId);
    setProgress(manuscriptProgress || null);
  }, [manuscriptId]);

  const markChapterRead = useCallback((chapterId: string) => {
    const allProgress = loadProgress();
    const existingIndex = allProgress.findIndex((p) => p.manuscriptId === manuscriptId);

    const newProgress: ReadingProgress = {
      manuscriptId,
      lastChapterId: chapterId,
      readChapters: existingIndex >= 0 
        ? [...new Set([...allProgress[existingIndex].readChapters, chapterId])]
        : [chapterId],
      lastReadAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      allProgress[existingIndex] = newProgress;
    } else {
      allProgress.push(newProgress);
    }

    saveProgress(allProgress);
    setProgress(newProgress);
  }, [manuscriptId]);

  const isChapterRead = useCallback((chapterId: string): boolean => {
    return progress?.readChapters.includes(chapterId) || false;
  }, [progress]);

  const getReadCount = useCallback((): number => {
    return progress?.readChapters.length || 0;
  }, [progress]);

  return {
    progress,
    markChapterRead,
    isChapterRead,
    getReadCount,
    lastChapterId: progress?.lastChapterId,
  };
}

export function useAllReadingProgress() {
  const [allProgress, setAllProgress] = useState<ReadingProgress[]>([]);

  useEffect(() => {
    setAllProgress(loadProgress());
  }, []);

  const getProgressForManuscript = useCallback((manuscriptId: string): ReadingProgress | undefined => {
    return allProgress.find((p) => p.manuscriptId === manuscriptId);
  }, [allProgress]);

  return { allProgress, getProgressForManuscript };
}
