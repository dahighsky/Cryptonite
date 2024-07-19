import Image from "next/image";
import TopCryptoChart from "./dashboard/topCryptoChart";
import RecentlyWatched from "@/components/RecentlyWatched";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-stretch justify-between">
      <TopCryptoChart />
      <RecentlyWatched />
    </div>
  );
}
