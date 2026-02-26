import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import CoinOverviewFallback from "../skeleton/src/components/skeletons/coin-overview-fallback";
import CandleStickChart from "./candle-stick-chart";

const CoinOverview = async () => {
  let coin: CoinDetailsData | null = null;
  let coinOHLCData: OHLCData[] | null = null;

  try {
    const [fetchedCoin, fetchedOHLC] = await Promise.all([
      fetcher<CoinDetailsData>(`coins/bitcoin`, {
        dex_pair_format: "symbol",
      }),
      fetcher<OHLCData[]>(`coins/bitcoin/ohlc`, {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    ]);

    coin = fetchedCoin;
    coinOHLCData = fetchedOHLC;
  } catch (error) {
    console.error(`Failed to fetch data for btc:`, error);
    return <CoinOverviewFallback />;
  }

  if (!coin || !coinOHLCData) {
    return <CoinOverviewFallback />;
  }

  return (
    <div id="coin-overview" className="w-full">
      <CandleStickChart
        data={coinOHLCData}
        coinId={"bitcoin"}
        liveInterval="1m"
      >
        <div className="header flex items-center gap-4 pt-2">
          <Image
            src={coin.image.large}
            width={56}
            height={56}
            alt={coin.name}
            className="rounded-full"
          />
          <div className="info">
            <p className="text-sm text-muted-foreground uppercase">
              {coin.name} / {coin.symbol}
            </p>
            <h1 className="text-2xl font-bold">
              {formatCurrency(coin.market_data.current_price.usd)}
            </h1>
          </div>
        </div>
      </CandleStickChart>
    </div>
  );
};

export default CoinOverview;
