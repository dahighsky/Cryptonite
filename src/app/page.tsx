import Image from "next/image";
import TopCryptoChart from "./dashboard/topCryptoChart";
import RecentlyWatched from "@/components/RecentlyWatched";
import Trending from "./dashboard/Trending";
import { getTopCoinsMarketCharts } from "@/lib/utils/fetch-functions";
import { prepareChartData } from "@/lib/utils/chart";

export default async function Home() {
  const chatData = await getChartData();
  return (
    <div className="flex flex-col gap-6 items-stretch justify-between">
      <TopCryptoChart chartData={chatData} />
      <Trending />
    </div>
  );
}

async function getChartData() {
  const topCoinsMarketData = await getTopCoinsMarketCharts();
  const [datasets, labels] = prepareChartData(topCoinsMarketData);
  return { labels, datasets };
}