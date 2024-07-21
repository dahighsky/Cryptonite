"use client";

import { useEffect, useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { prepareChartData, options, Dataset } from "@/lib/utils/chart";
import { api } from "@/lib/api";
import Loading from "@/components/Loading";
import ZeroState from "@/components/ZeroState";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TopCryptoChart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState(false);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 3,
            page: 1,
            sparkline: false,
            "x-cg-pro-api-key": process.env.COINGECKO_API_KEY,
          },
        });
        const topCoins = response.data.slice(0, 3).map((coin: any) => coin.id);
        const topCoinsSymbols = response.data
          .slice(0, 3)
          .map((coin: any) => coin.symbol);
        const priceData = await Promise.all(
          topCoins.map(async (coinId: string, index: number) => {
            const response = await api.get(`/coins/${coinId}/market_chart`, {
              params: {
                vs_currency: "usd",
                days: 1,
                "x-cg-pro-api-key": process.env.COINGECKO_API_KEY,
              },
            });
            return {
              id: coinId,
              prices: response.data.prices,
              symbol: topCoinsSymbols[index],
            };
          })
        );
        const [datasets, labels] = prepareChartData(priceData);
        setChartData({ labels, datasets });
        setIsLoading(false);
      } catch (error: any | AxiosError) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
        if (axios.isAxiosError(error) && error.status === 429) {
          setRateLimitError(true);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const updateChartData = (labels: string[], datasets: Dataset[]) => {};

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setChartDimensions({ width, height });
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-[480px] xxl:h-[720px] border-[1px] border-primary rounded-md p-5 bg-secondary"
    >
      {isLoading ? (
        <Loading height={50} width={50} />
      ) : chartData ? (
        <Line
          options={options}
          data={chartData}
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      ) : (
        <ZeroState height={50} width={50} isRateLimit={rateLimitError} />
      )}
    </div>
  );
};

export default TopCryptoChart;
