import { useState, useEffect } from "react";

export interface FrameAnalysis {
  frameId: string;
  timestamp: number;
  label: string;
  thumbnail: string;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  keyRecommendation: string;
  techniquesIdentified: string[];
}

export interface AnalysisResult {
  id: string;
  thumbnail: string;
  mediaType: "image" | "video";
  overallScore: number;
  strengths: string[];
  improvements: string[];
  keyRecommendation: string;
  techniquesIdentified: string[];
  analyzedAt: string;
  frameAnalyses?: FrameAnalysis[];
}

const STORAGE_KEY = "archery-analysis-history";
const MAX_HISTORY = 10;

export function useAnalysisHistory() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveToHistory = (analysis: Omit<AnalysisResult, "id" | "analyzedAt">) => {
    const newResult: AnalysisResult = {
      ...analysis,
      id: crypto.randomUUID(),
      analyzedAt: new Date().toISOString(),
    };

    setHistory((prev) => {
      const updated = [newResult, ...prev].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    return newResult;
  };

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    saveToHistory,
    deleteFromHistory,
    clearHistory,
    totalAnalyses: history.length,
  };
}
