import Table from "../../components/Table";
import {
  coinsBasicData,
  coinsBasicHeading,
} from "@/mock-data/coins-basic.data";
import RecentlyWatched from "../../components/RecentlyWatched";
import TopCryptoChart from "./topCryptoChart";

const Dashboard = () => {
  return (
    <>
      <TopCryptoChart />
      <RecentlyWatched />
    </>
  );
};

export default Dashboard;
