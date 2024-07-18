import Table from "../../components/Table";
import {
  coinsBasicData,
  coinsBasicHeading,
} from "@/mock-data/coins-basic.data";
import RecentlyWatched from "../../components/RecentlyWatched";

const Dashboard = () => {
  return (
    <>
      <div>Chart</div>
      <RecentlyWatched />
    </>
  );
};

export default Dashboard;
