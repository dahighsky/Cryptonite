"use client";

import Table from "@/components/Table";
import { getData } from "@/lib/api";
import { useCryptoStore } from "@/lib/hooks/zustand-store";
import { CoinData } from "@/lib/models/coin-data.model";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

const RecentlyWatched = () => {
  const recentlyWatched = useStore(
    useCryptoStore,
    (state) => state.recentlyWatched
  );
  const [data, setData] = useState<CoinData[]>([]);

  useEffect(() => {
    console.log("recentlyWatched changed:", recentlyWatched);
    if (recentlyWatched.length > 0) {
      const fetchData = async () => {
        const result = await getData(recentlyWatched);
        setData(result);
      };
      fetchData();
    }
  }, [recentlyWatched]);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    console.log("dragging", item);
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  return (
    <div>
      <Table
        title={"Recently Watched"}
        viewMore={true}
        tableData={data}
        tableHead={["Token", "Last Price", "24H Change", "Market Cap"]}
        onDragStart={handleDragStart}
        isDraggable={true}
      ></Table>
    </div>
  );
};

export default RecentlyWatched;
