"use client";

import Table from "@/components/Table";
import { getData } from "@/lib/api";
import { useCryptoStore } from "@/lib/hooks/zustand-store";
import {
  coinsBasicData,
  coinsBasicHeading,
} from "@/mock-data/coins-basic.data";
import { useEffect, useState } from "react";

const DEFAULT_WATCHLIST = ["bitcoin", "ethereum", "0chain", "dogecoin"];

const Watchlist = () => {
  // const [watchlist, setWatchlist] = useState<string[]>([]);
  const [data, setData] = useState([]);
  const { watchlist, addToWatchlist, removeFromWatchlist } = useCryptoStore();

  // useEffect(() => {
  //   const savedWatchlistString = localStorage.getItem("watchlist");
  //   let savedWatchlist: string[] = [];

  //   if (savedWatchlistString) {
  //     try {
  //       const parsed = JSON.parse(savedWatchlistString);
  //       if (
  //         Array.isArray(parsed) &&
  //         parsed.every((item) => typeof item === "string")
  //       ) {
  //         savedWatchlist = parsed;
  //       }
  //     } catch (error) {
  //       console.error("Error parsing watchlist from localStorage:", error);
  //     }
  //   }

  //   if (savedWatchlist.length === 0) {
  //     savedWatchlist = DEFAULT_WATCHLIST;
  //     localStorage.setItem("watchlist", JSON.stringify(DEFAULT_WATCHLIST));
  //   }

  //   setWatchlist(savedWatchlist);
  // }, []);

  useEffect(() => {
    if (watchlist.length > 0) {
      const fetchData = async () => {
        const result = await getData(watchlist);
        setData(result);
      };
      fetchData();
      // const interval = setInterval(fetchData, 60000);
      // return () => clearInterval(interval);
    }
  }, [watchlist]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedItem: string = JSON.parse(e.dataTransfer.getData("text"));

    console.log(droppedItem, " dropped");
    if (!watchlist.some((crypto) => crypto === droppedItem)) {
      addToWatchlist(droppedItem);
    }
  };

  return (
    <div>
      <Table
        title={"Watchlist"}
        viewMore={true}
        tableData={data}
        tableHead={["Token", "Last Price", "24H Change", "Market Cap"]}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      ></Table>
    </div>
  );
};

export default Watchlist;
