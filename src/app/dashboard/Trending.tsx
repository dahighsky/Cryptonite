import { TrendingCoinData } from "@/lib/models/coin-data.model";
import Table from "@/components/Table";

async function getTrendingCoins(): Promise<TrendingCoinData[]> {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/search/trending",
    { next: { revalidate: 600 } } // Revalidate every 10 minutes
  );
  if (!response.ok) {
    throw new Error("Failed to fetch trending coins");
  }
  const data = await response.json();
  return data.coins.slice(0, 15);
}

export default async function Trending() {
  const trendingCoins = await getTrendingCoins();

  // const handleDragStart = (e: React.DragEvent, item: string) => {
  //   console.log("dragging", item);
  //   e.dataTransfer.setData("text/plain", JSON.stringify(item));
  // };

  return (
    <div>
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
        // onDragStart={handleDragStart}
        isDraggable={true}
      />
    </div>
  );
}
