import { Separator } from "./ui/separator";
import CandleStickChart from "./home/candle-stick-chart";
import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency, timeAgo } from "@/lib/utils";
import DataTable from "./data-table";

const LiveDataWrapper = async ({
  children,
  coinId,
  coin,
  poolId,
  coinOHLCData,
  network,
}: LiveDataProps) => {
  let tradesData: Trade | null = null;

  try {
    tradesData = await fetcher<Trade>(
      `onchain/networks/${coin.symbol}/pools/${poolId}/info`,
    );
  } catch (error) {
    console.error("Failed to fetch trades:", error);
  }

  console.log("[tradesData]", tradesData);

  return (
    <section id="live-data-wrapper">
      <p>{coin.name}</p>
      <Separator className="divider" />

      <div className="trend">
        <CandleStickChart coinId={coinId} data={coinOHLCData}>
          <h4>Trend Overview</h4>
        </CandleStickChart>
      </div>
    </section>
  );
};

export default LiveDataWrapper;
