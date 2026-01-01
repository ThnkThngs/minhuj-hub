import { cn } from "@/lib/utils";
import { type Category } from "@/config/library";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (categoryId: string | null) => void;
}

const colorMap = {
  primary: "hover:border-primary/50 hover:bg-primary/10 data-[active=true]:border-primary data-[active=true]:bg-primary/20 data-[active=true]:text-primary",
  accent: "hover:border-accent/50 hover:bg-accent/10 data-[active=true]:border-accent data-[active=true]:bg-accent/20 data-[active=true]:text-accent",
  success: "hover:border-success/50 hover:bg-success/10 data-[active=true]:border-success data-[active=true]:bg-success/20 data-[active=true]:text-success",
  destructive: "hover:border-destructive/50 hover:bg-destructive/10 data-[active=true]:border-destructive data-[active=true]:bg-destructive/20 data-[active=true]:text-destructive",
};

export function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* All button */}
      <button
        onClick={() => onSelect(null)}
        data-active={selectedCategory === null}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-card/50 text-sm font-medium transition-all duration-200",
          "hover:border-primary/50 hover:bg-primary/10",
          "data-[active=true]:border-primary data-[active=true]:bg-primary/20 data-[active=true]:text-primary"
        )}
      >
        All Techniques
      </button>

      {/* Category buttons */}
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            data-active={selectedCategory === category.id}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-card/50 text-sm font-medium transition-all duration-200",
              colorMap[category.color]
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{category.name}</span>
            <span className="sm:hidden">{category.name.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}
