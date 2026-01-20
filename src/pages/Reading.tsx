import { useState } from "react";
import { BookOpen, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { manuscripts } from "@/config/manuscripts";
import { useChapterSearch } from "@/hooks/use-chapter-search";
import { SearchResults } from "@/components/reading/SearchResults";
import { ContinueReading } from "@/components/reading/ContinueReading";
import { ManuscriptProgressCard } from "@/components/reading/ManuscriptProgressCard";

export default function Reading() {
  const { query, setQuery, results, clearSearch, isSearching } = useChapterSearch();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const totalChapters = manuscripts.reduce((acc, m) => acc + m.chapters.length, 0);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative py-8 px-4 mb-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/20 mb-4">
            <BookOpen className="w-7 h-7 text-accent" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Reading Hub
          </h1>
          <p className="text-muted-foreground">
            Continue your journey through {manuscripts.length} manuscripts • {totalChapters} chapters
          </p>
        </div>
      </div>

      <div className="px-4 max-w-2xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search chapters and headings..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="pl-10 pr-10 h-12 bg-secondary/30 border-border/30 focus:border-accent/50"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={clearSearch}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {isSearching && (isSearchFocused || results.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <SearchResults results={results} onResultClick={clearSearch} />
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No results found for "{query}"
                </p>
              )}
            </div>
          )}
        </div>

        {/* Continue Reading Section */}
        <ContinueReading />

        {/* All Manuscripts */}
        <div>
          <h2 className="text-lg font-display font-bold text-foreground mb-4">
            All Manuscripts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {manuscripts.map((manuscript) => (
              <ManuscriptProgressCard
                key={manuscript.id}
                manuscript={manuscript}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
