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
        const priceData = await Promise.all(
          topCoins.map(async (coinId: string) => {
            const response = await axios.get(
              `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
              {
                params: {
                  vs_currency: "usd",
                  days: 1,
                },
              }
            );
            return { id: coinId, prices: response.data.prices };
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
      label: coin.id,
      data: coin.prices.map((price) => price[1]),
      borderColor: ["#FF6384", "#36A2EB", "#FFCE56"][index],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"][index],
      fill: false,
    }));
    setChartData({
      labels,
      datasets,
    });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Price of Top 3 Cryptocurrencies (Last 24 Hours)",
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 12,
        },
      },
      y: {
        ticks: {
          callback: function (value: number) {
            return "$" + value.toFixed(2);
          },
        },
      },
    },
    pointBackgroundColor: "rgba(0, 0, 0, 0)",
    pointBorderColor: "rgba(0, 0, 0, 0)",
  };

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }}>
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
