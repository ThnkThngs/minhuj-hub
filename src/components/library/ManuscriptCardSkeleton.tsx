import { CornerFrame } from "@/components/ui/corner-frame";
import { Skeleton } from "@/components/ui/skeleton";

export function ManuscriptCardSkeleton() {
  return (
    <CornerFrame className="bg-card/50 border border-border/50 p-5">
      <div className="flex items-start gap-4">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-20 mt-2" />
        </div>
      </div>
    </CornerFrame>
  );
}
