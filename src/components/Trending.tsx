"use client";

import Table from "@/components/Table";
import { TrendingCoinData } from "@/lib/models/coin-data.model";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const Trending = () => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  const fetchTrendingCoins = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trending coins");
      }
      const data = await response.json();
      setTrendingCoins(data.coins.slice(0, 15));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, item: string) => {
    console.log("dragging", item);
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  return (
    <div>
      {isLoading ? (
        <Loading height={56} width={56} />
      ) : (
        <Table
          title={"Trending Coins"}
          viewMore={true}
          trendingCoinData={trendingCoins}
          tableHead={[
            "Token",
            "Symbol",
            "Last Price",
            "24H Change",
            "Market Cap",
          ]}
          onDragStart={handleDragStart}
          isDraggable={true}
        ></Table>
      )}
    </div>
  );
};

export default Trending;
