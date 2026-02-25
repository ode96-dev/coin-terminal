import { Skeleton } from "@/components/ui/skeleton";

const TrendingCoinsFallback = () => {
  return (
    <div id="trending-coins" className="space-y-4 p-5">
      <Skeleton className="h-6 w-32 mb-4" />

      <div className="rounded-md border border-border">
        <div className="flex items-center border-b px-4 py-3">
          <Skeleton className="h-4 w-20 mr-auto" />
          <Skeleton className="h-4 w-24 mx-auto" />
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center px-4 py-3 border-b last:border-0"
          >
            <div className="flex items-center gap-3 mr-auto">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="mx-auto">
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="ml-auto">
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCoinsFallback;
