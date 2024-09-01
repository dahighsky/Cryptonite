import { MarketChartData } from "../models/coin-data.model";
import { ChartCoinData } from "./chart";

export async function getTopCoinsMarketCharts(): Promise<ChartCoinData[]> {
  const coins = await getTopCoins();
  const marketChartsPromises = coins.map(async (value) => {
    return await getMarketChart(value);
  });
  const marketChartsData = await Promise.all(marketChartsPromises);
  return marketChartsData;
}

export async function getTopCoins(): Promise<string[]> {
  const baseUrl = "https://api.coingecko.com/api/v3/coins/markets";

  const params = {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: "3",
    page: "1",
    sparkline: "false",
    "x-cg-pro-api-key": process.env.COINGECKO_API_KEY
      ? process.env.COINGECKO_API_KEY
      : "none",
  };
  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}?${queryString}`;

  const response = await fetch(url, {
    next: { revalidate: 600 }, // Revalidate every 10 minutes
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending coins");
  }
  const data = await response.json();
  return data.slice(0, 3).map((coin: any) => coin.id);
}

export async function getMarketChart(coinId: string): Promise<ChartCoinData> {
  const baseUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`;

  const params = {
    vs_currency: "usd",
    days: "1",
    "x-cg-pro-api-key": process.env.COINGECKO_API_KEY
      ? process.env.COINGECKO_API_KEY
      : "none",
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}?${queryString}`;

  const response = await fetch(url, {
    next: { revalidate: 600 }, // Revalidate every 10 minutes
  });

  if (!response.ok) {
    throw new Error("Failed to fetch market chart data of coins");
  }
  const data = await response.json();
  return {
    id: coinId,
    prices: data.prices,
    symbol: coinId,
  };
}
