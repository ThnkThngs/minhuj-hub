import { SearchResult, getHighlightParts } from "@/hooks/use-chapter-search";
import { BookOpen, FileText, Key, Quote } from "lucide-react";
import { Link } from "react-router-dom";

function HighlightedText({ text, ranges }: { text: string; ranges: Array<{ start: number; end: number }> }) {
  const parts = getHighlightParts(text, ranges);
  return (
    <>
      {parts.map((part, i) =>
        part.isHighlight ? (
          <mark key={i} className="bg-accent/30 text-accent-foreground rounded px-0.5">
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick?: () => void;
}

const matchTypeIcons = {
  title: FileText,
  arabicTitle: Quote,
  keyPoint: Key,
  content: BookOpen,
};

const matchTypeLabels = {
  title: "Title",
  arabicTitle: "Arabic Title",
  keyPoint: "Key Point",
  content: "Content",
};

export function SearchResults({ results, onResultClick }: SearchResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground mb-3">
        {results.length} result{results.length !== 1 ? "s" : ""} found
      </p>
      <div className="space-y-2">
        {results.map((result, index) => {
          const Icon = matchTypeIcons[result.matchType];
          return (
            <Link
              key={`${result.chapter.id}-${index}`}
              to={`/library/manuscript/${result.manuscript.id}?chapter=${result.chapter.id}`}
              onClick={onResultClick}
              className="block p-3 rounded-lg bg-secondary/30 border border-border/30 hover:bg-secondary/50 hover:border-accent/30 transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-accent/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-accent font-medium">
                      {matchTypeLabels[result.matchType]}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {result.manuscript.title}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    Chapter {result.chapter.number}: {result.chapter.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    <HighlightedText text={result.matchedText} ranges={result.highlightRanges} />
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
