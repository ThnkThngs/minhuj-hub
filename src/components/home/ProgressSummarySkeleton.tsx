import { Skeleton } from "@/components/ui/skeleton";

export function ProgressSummarySkeleton() {
  return (
    <div className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 p-6">
      {/* Accent corner */}
      <div 
        className="absolute top-0 right-0 w-20 h-20 bg-accent/10"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
      />
      
      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-4" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-1 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
