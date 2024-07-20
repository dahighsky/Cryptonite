"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
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
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 3,
              page: 1,
              sparkline: false,
            },
          }
        );
        const topCoins = response.data.slice(0, 3).map((coin: any) => coin.id);
        const topCoinsSymbols = response.data
          .slice(0, 3)
          .map((coin: any) => coin.symbol);
        const priceData = await Promise.all(
          topCoins.map(async (coinId: string, index: number) => {
            const response = await axios.get(
              `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
              {
                params: {
                  vs_currency: "usd",
                  days: 1,
                },
              }
            );
            return {
              id: coinId,
              prices: response.data.prices,
              symbol: topCoinsSymbols[index],
            };
          })
        );
        const [datasets, labels] = prepareChartData(priceData);
        setChartData({ labels, datasets });
      } catch (error) {
        console.error("Error fetching data:", error);
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
      className="w-full h-[480px] xxl:h-[720px] border-[1px] border-border-light-gray rounded-md p-5"
    >
      {chartData ? (
        <Line
          options={options}
          data={chartData}
          width={chartDimensions.width}
          height={chartDimensions.height}
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default TopCryptoChart;
