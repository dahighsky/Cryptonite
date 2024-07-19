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
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CoinData {
  id: string;
  symbol: string;
  prices: [number, number][];
}

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
        prepareChartData(priceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

  const prepareChartData = (data: CoinData[]) => {
    const labels = data[0].prices.map((price) => {
      const date = new Date(price[0]);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    });
    const datasets = data.map((coin, index) => ({
      label: coin.symbol.toUpperCase(),
      data: coin.prices.map((price) => price[1]),
      borderColor: ["#FF4DCA", "#F68D7D", "#23DBBD"][index],
      backgroundColor: ["#FF4DCA", "#F68D7D", "#23DBBD"][index],
      fill: false,
      // pointBackgroundColor: "rgba(0, 0, 0, 0)",
      // pointBorderColor: "rgba(0, 0, 0, 0)",
      pointRadius: 0,
    }));
    setChartData({
      labels,
      datasets,
    });
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        align: "center",
        labels: {
          usePointStyle: true,
          boxHeight: 4,
          font: {
            size: 10,
            lineHeight: 2,
          },
          textAlign: "right",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value: number | string) => {
            if (typeof value === "number") {
              return new Intl.NumberFormat().format(+value.toFixed(0));
            }
            return value;
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

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
