import { Skeleton } from "@/components/ui/skeleton";
import { TechniqueCardSkeleton } from "./TechniqueCardSkeleton";
import { ManuscriptCardSkeleton } from "./ManuscriptCardSkeleton";

export function LibrarySkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-6">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-28" />
      </div>

      {/* Search Bar */}
      <Skeleton className="h-12 w-full rounded-lg" />

      {/* Category Filter */}
      <div className="flex gap-2 overflow-hidden">
        <Skeleton className="h-10 w-28 rounded-lg flex-shrink-0" />
        <Skeleton className="h-10 w-32 rounded-lg flex-shrink-0" />
        <Skeleton className="h-10 w-24 rounded-lg flex-shrink-0" />
        <Skeleton className="h-10 w-28 rounded-lg flex-shrink-0" />
        <Skeleton className="h-10 w-36 rounded-lg flex-shrink-0" />
      </div>

      {/* Technique Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <TechniqueCardSkeleton key={i} />
        ))}
      </div>

      {/* Manuscripts Section */}
      <div className="space-y-4 pt-8 border-t border-border/30">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ManuscriptCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
