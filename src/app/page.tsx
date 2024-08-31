import Image from "next/image";
import TopCryptoChart from "./dashboard/topCryptoChart";
import RecentlyWatched from "@/components/RecentlyWatched";
import Trending from "./dashboard/Trending";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-stretch justify-between">
      <TopCryptoChart />
      <Trending />
    </div>
  );
}
