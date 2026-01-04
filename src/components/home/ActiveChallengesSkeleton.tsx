import { Skeleton } from "@/components/ui/skeleton";

export function ActiveChallengesSkeleton() {
  return (
    <div className="relative overflow-hidden bg-card/30 backdrop-blur-sm border border-border/50 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-4 w-4" />
        </div>
        
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
