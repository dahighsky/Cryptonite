"use client";

import { CoinDataDetailed } from "@/lib/models/coin-data.model";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/data-tansform";
import { options, prepareChartData } from "@/lib/utils/chart";
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
import Header from "./Header";
import CoinBody from "./CoinBody";
import { useCryptoStore } from "@/lib/hooks/zustand-store";
import { api } from "@/lib/api";

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

const CoinDetails = ({ params }: { params: { coinId: string } }) => {
  const { recentlyWatched, addToRecentlyWatched } = useCryptoStore();
  const [data, setData] = useState<CoinDataDetailed>();
  const [chartData, setChartData] = useState<any>(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [chartDays, setChartDays] = useState<string>("1");
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartDaysOptions = ["1D", "1W", "1M", "3Y", "5Y", "ALL"];

  useEffect(() => {
    if (recentlyWatched.indexOf(params.coinId) === -1) {
      console.log("Adding to recently watched");
      addToRecentlyWatched(params.coinId);
    }
    fetchCoinDetails();
    fetchChartData(chartDays);
  }, [params.coinId]);

  useEffect(() => {
    fetchChartData(chartDays);
  }, [chartDays]);

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

  const fetchCoinDetails = async () => {
    try {
      const response = await api.get(
        `https://api.coingecko.com/api/v3/coins/${params.coinId}`,
        {
          params: {
            vs_currency: "usd",
          },
        }
      );
      const coin: CoinDataDetailed = response.data;
      setData(coin);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchChartData = async (days: string) => {
    try {
      const response = await api.get(
        `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days: days,
          },
        }
      );
      const priceData = [
        {
          id: params.coinId,
          prices: response.data.prices,
          symbol: params.coinId,
        },
      ];
      const [datasets, labels] = prepareChartData(priceData);
      setChartData({ labels, datasets });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateDays = (days: string): string => {
    switch (days) {
      case "1D":
        return "1";
      case "1W":
        return "7";
      case "1M":
        return "30";
      case "3Y":
        return "365";
      case "5Y":
        return "" + 365 * 5;
      case "ALL":
        return "max";
    }
    return "1";
  };

  const handleDays = (days: string) => {
    const calculated_days = calculateDays(days);
    setChartDays(calculated_days);
  };

  return (
    <>
      {data && (
        <div className="flex flex-col gap-4 justify-center items-stretch">
          <Header data={data} />
          <div
            ref={chartContainerRef}
            className="w-full h-[480px] xxl:h-[720px] border-[1px] border-primary rounded-md p-5"
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
          <div className="flex flex-row gap-3 justify-center items-center">
            {chartDaysOptions.map((option) => {
              return (
                <button
                  key={option}
                  onClick={() => handleDays(option)}
                  className={`px-4 py-1 border-[1px] border-primary rounded-full text-xs font-semibold hover:bg-hover
                    ${
                      chartDays === calculateDays(option) ? "bg-secondary" : ""
                    }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <CoinBody data={data} />
        </div>
      )}
    </>
  );
};

export default CoinDetails;
