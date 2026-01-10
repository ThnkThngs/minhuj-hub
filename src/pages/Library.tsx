import { useState, useMemo } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { categories, techniques, type Technique } from "@/config/library";
import { TechniqueCard } from "@/components/library/TechniqueCard";
import { CategoryFilter } from "@/components/library/CategoryFilter";
import { SearchBar } from "@/components/library/SearchBar";
import { ManuscriptsSection } from "@/components/library/ManuscriptsSection";
import { TechniqueDetailDrawer } from "@/components/library/TechniqueDetailDrawer";

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredTechniques = useMemo(() => {
    return techniques.filter((technique) => {
      // Filter by category
      if (selectedCategory && technique.category !== selectedCategory) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          technique.title.toLowerCase().includes(query) ||
          technique.arabicTitle?.toLowerCase().includes(query) ||
          technique.description.toLowerCase().includes(query) ||
          technique.keyPoints.some((point) => point.toLowerCase().includes(query)) ||
          technique.source.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const selectedCategoryData = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)
    : null;

  const handleTechniqueClick = (technique: Technique) => {
    setSelectedTechnique(technique);
    setDrawerOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="container py-6 md:py-8 lg:py-12 space-y-6 md:space-y-8">
        {/* Hero Header */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold">
                Classical Library
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Master techniques from the golden age of archery
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>
                <span className="text-foreground font-medium">{techniques.length}</span> techniques
              </span>
            </div>
            <span className="text-border">•</span>
            <span className="text-muted-foreground">
              <span className="text-foreground font-medium">{categories.length}</span> categories
            </span>
            <span className="text-border">•</span>
            <span className="text-muted-foreground">
              <span className="text-foreground font-medium">3</span> source manuscripts
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search techniques, sources, or key concepts..."
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Category Description */}
        {selectedCategoryData && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border/30">
            <selectedCategoryData.icon className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">{selectedCategoryData.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedCategoryData.description}
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">
              {selectedCategoryData ? selectedCategoryData.name : "All Techniques"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredTechniques.length} result{filteredTechniques.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredTechniques.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredTechniques.map((technique) => (
                <TechniqueCard
                  key={technique.id}
                  technique={technique}
                  onClick={() => handleTechniqueClick(technique)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                No techniques found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Manuscripts Section */}
        <div className="pt-8 border-t border-border/30">
          <ManuscriptsSection />
        </div>
      </div>

      {/* Technique Detail Drawer */}
      <TechniqueDetailDrawer
        technique={selectedTechnique}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </div>
  );
}
