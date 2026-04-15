const SkeletonCard = () => (
  <div className="bg-card rounded-lg border border-border p-4 animate-pulse">
    <div className="aspect-square bg-muted rounded-md mb-3" />
    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
    <div className="h-4 bg-muted rounded w-1/2 mb-2" />
    <div className="h-3 bg-muted rounded w-1/3 mb-2" />
    <div className="h-5 bg-muted rounded w-1/4 mb-3" />
    <div className="h-9 bg-muted rounded w-full" />
  </div>
);

export default SkeletonCard;
