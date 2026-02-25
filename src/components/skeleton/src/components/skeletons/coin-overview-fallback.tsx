import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview" className="flex items-center gap-4 p-5">
      <Skeleton className="h-14 w-14 rounded-full" />

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />

        <Skeleton className="h-9 w-40" />
      </div>
    </div>
  );
};

export default CoinOverviewFallback;
