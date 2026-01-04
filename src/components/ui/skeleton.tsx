import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "rounded-md bg-muted skeleton-shimmer",
        className
      )} 
      {...props} 
    />
  );
}

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

function SkeletonText({ size = "md", className, ...props }: SkeletonTextProps) {
  const sizeClasses = {
    sm: "h-3",
    md: "h-4",
    lg: "h-5",
    xl: "h-6",
  };
  
  return <Skeleton className={cn(sizeClasses[size], className)} {...props} />;
}

interface SkeletonCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

function SkeletonCircle({ size = 40, className, ...props }: SkeletonCircleProps) {
  return (
    <Skeleton 
      className={cn("rounded-full flex-shrink-0", className)} 
      style={{ width: size, height: size }}
      {...props} 
    />
  );
}

export { Skeleton, SkeletonText, SkeletonCircle };
