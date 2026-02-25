import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import CoinOverviewFallback from "../skeleton/src/components/skeletons/coin-overview-fallback";

const CoinOverview = async () => {
  let coin;

  try {
    coin = await fetcher<CoinDetailsData>("coins/bitcoin", {
      dex_pair_format: "symbol",
    });
  } catch {
    return <CoinOverviewFallback />;
  }

  return (
    <div id="coin-overview">
      <div className="header pt-2">
        <Image src={coin.image.large} width={56} height={56} alt={coin.name} />
        <div className="info">
          <p>
            {coin.name}/{coin.symbol.toUpperCase()}
          </p>
          <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        </div>
      </div>
    </div>
  );
};

export default CoinOverview;
