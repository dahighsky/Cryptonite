"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ExploreNav from "./ExploreNav";
import Table from "@/components/Table";
import { CoinData } from "@/lib/models/coin-data.model";
import { useCryptoStore } from "@/lib/hooks/zustand-store";

const ITEMS_PER_PAGE = 20;

type Tab =
  | "All Coins"
  | "Watchlist"
  | "Top Gainers"
  | "Top Losers"
  | "Recently Watched";

export default function Explore() {
  const [activeTab, setActiveTab] = useState<Tab>("All Coins");
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { watchlist, recentlyWatched } = useCryptoStore();

  useEffect(() => {
    fetchCoins();
  }, [activeTab, page]);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      let url = "https://api.coingecko.com/api/v3/coins/markets";
      let params: Record<string, string | number> = {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: ITEMS_PER_PAGE,
        page: page,
        price_change_percentage: "7d,30d,1y",
      };

      switch (activeTab) {
        case "Watchlist":
          params.ids = watchlist.join(",");
          break;
        case "Top Gainers":
          params.order = "price_change_percentage_24h_desc";
          break;
        case "Top Losers":
          params.order = "price_change_percentage_24h_asc";
          break;
        case "Recently Watched":
          params.ids = recentlyWatched.join(",");
          break;
      }

      const response = await axios.get<CoinData[]>(url, { params });
      setCoins(response.data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
    setLoading(false);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleDragStart = (e: React.DragEvent, item: string) => {
    console.log("dragging", item);
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  return (
    <div className="container mx-auto border-[1px] border-primary rounded-md p-5 bg-secondary">
      <ExploreNav activeTab={activeTab} onTabChange={handleTabChange} />
      <Table
        tableData={coins}
        tableHead={[
          "Token",
          "Symbol",
          "Market Cap",
          "Last Price",
          "7D",
          "30D",
          "1Y",
          "24H Change",
        ]}
        outerBorder={false}
        innerBorder={true}
        onDragStart={handleDragStart}
        isDraggable={true}
      />
      <div className="flex justify-between my-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
