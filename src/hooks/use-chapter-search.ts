import { useMemo, useState, useCallback } from "react";
import { manuscripts, Chapter, Manuscript } from "@/config/manuscripts";

export interface SearchResult {
  manuscript: Manuscript;
  chapter: Chapter;
  matchedText: string;
  matchType: "title" | "arabicTitle" | "keyPoint" | "content";
  highlightRanges: Array<{ start: number; end: number }>;
}

function fuzzyMatch(text: string, query: string): { matches: boolean; ranges: Array<{ start: number; end: number }> } {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const ranges: Array<{ start: number; end: number }> = [];
  
  // Simple substring matching with word boundary awareness
  const words = lowerQuery.split(/\s+/).filter(Boolean);
  let allMatch = true;
  
  for (const word of words) {
    const index = lowerText.indexOf(word);
    if (index === -1) {
      allMatch = false;
      break;
    }
    ranges.push({ start: index, end: index + word.length });
  }
  
  return { matches: allMatch && words.length > 0, ranges };
}

function searchChapter(
  manuscript: Manuscript,
  chapter: Chapter,
  query: string
): SearchResult | null {
  // Search in title
  const titleMatch = fuzzyMatch(chapter.title, query);
  if (titleMatch.matches) {
    return {
      manuscript,
      chapter,
      matchedText: chapter.title,
      matchType: "title",
      highlightRanges: titleMatch.ranges,
    };
  }

  // Search in Arabic title
  if (chapter.arabicTitle) {
    const arabicMatch = fuzzyMatch(chapter.arabicTitle, query);
    if (arabicMatch.matches) {
      return {
        manuscript,
        chapter,
        matchedText: chapter.arabicTitle,
        matchType: "arabicTitle",
        highlightRanges: arabicMatch.ranges,
      };
    }
  }

  // Search in key points
  if (chapter.keyPoints) {
    for (const point of chapter.keyPoints) {
      const pointMatch = fuzzyMatch(point, query);
      if (pointMatch.matches) {
        return {
          manuscript,
          chapter,
          matchedText: point,
          matchType: "keyPoint",
          highlightRanges: pointMatch.ranges,
        };
      }
    }
  }

  // Search in content (first 200 chars of matching paragraph)
  const paragraphs = chapter.content.split("\n\n");
  for (const paragraph of paragraphs) {
    const contentMatch = fuzzyMatch(paragraph, query);
    if (contentMatch.matches) {
      const previewStart = Math.max(0, contentMatch.ranges[0].start - 30);
      const previewEnd = Math.min(paragraph.length, contentMatch.ranges[0].end + 100);
      const preview = (previewStart > 0 ? "..." : "") + 
        paragraph.slice(previewStart, previewEnd) + 
        (previewEnd < paragraph.length ? "..." : "");
      
      // Adjust ranges for the preview
      const adjustedRanges = contentMatch.ranges.map(r => ({
        start: r.start - previewStart + (previewStart > 0 ? 3 : 0),
        end: r.end - previewStart + (previewStart > 0 ? 3 : 0),
      }));
      
      return {
        manuscript,
        chapter,
        matchedText: preview,
        matchType: "content",
        highlightRanges: adjustedRanges,
      };
    }
  }

  return null;
}

export function useChapterSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the query
  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(newQuery);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    if (debouncedQuery.trim().length < 2) {
      return [];
    }

    const allResults: SearchResult[] = [];

    for (const manuscript of manuscripts) {
      for (const chapter of manuscript.chapters) {
        const result = searchChapter(manuscript, chapter, debouncedQuery);
        if (result) {
          allResults.push(result);
        }
      }
    }

    // Return top 10 results
    return allResults.slice(0, 10);
  }, [debouncedQuery]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
  }, []);

  return {
    query,
    setQuery: updateQuery,
    results,
    clearSearch,
    hasResults: results.length > 0,
    isSearching: query.trim().length >= 2,
  };
}

export interface HighlightRange {
  start: number;
  end: number;
}

export function getHighlightParts(text: string, ranges: HighlightRange[]): Array<{ text: string; isHighlight: boolean }> {
  if (ranges.length === 0) return [{ text, isHighlight: false }];

  const parts: Array<{ text: string; isHighlight: boolean }> = [];
  let lastEnd = 0;

  // Sort ranges by start position
  const sortedRanges = [...ranges].sort((a, b) => a.start - b.start);

  for (const range of sortedRanges) {
    if (range.start > lastEnd) {
      parts.push({ text: text.slice(lastEnd, range.start), isHighlight: false });
    }
    parts.push({ text: text.slice(range.start, range.end), isHighlight: true });
    lastEnd = range.end;
  }

  if (lastEnd < text.length) {
    parts.push({ text: text.slice(lastEnd), isHighlight: false });
  }

  return parts;
}
