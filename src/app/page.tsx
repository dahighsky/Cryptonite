import TopCryptoChart from "./dashboard/TopCryptoChart";
import Trending from "./dashboard/Trending";
import { getChartData } from "@/lib/utils/fetch-functions";

export default async function Home() {
  const chatData = await getChartData();
  return (
    <div className="flex flex-col gap-6 items-stretch justify-between">
      <TopCryptoChart chartData={chatData} />
      <Trending />
    </div>
  );
}
