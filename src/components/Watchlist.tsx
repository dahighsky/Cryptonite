"use client";
import Table from "@/components/Table";
import { useCryptoStore } from "@/lib/hooks/zustand-store";
import Loading from "./Loading";
import { useState } from "react";

const Watchlist = () => {
  const { watchlist, watchlistData, addToWatchlist } = useCryptoStore();

  console.log(watchlistData);

  // const [isLoading, setIsLoading] = useState(true);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedItem: string = JSON.parse(e.dataTransfer.getData("text"));

    console.log(droppedItem, " dropped");
    if (!watchlist.includes(droppedItem)) {
      console.log("adding to watchlist");
      addToWatchlist(droppedItem);
    }
  };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <Table
        title={"Watchlist"}
        viewMore={true}
        tableData={watchlistData}
        tableHead={["Token", "Last Price", "24H Change", "Market Cap"]}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
    </div>
  );
};

export default Watchlist;
