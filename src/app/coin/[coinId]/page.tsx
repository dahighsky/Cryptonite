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
  ChartOptions,
} from "chart.js";
import Header from "./Header";
import CoinBody from "./CoinBody";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinDetails = ({ params }: { params: { coinId: string } }) => {
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
    console.log("fetching");
    try {
      const response = await axios.get(
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
      const response = await axios.get(
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

  const handleDays = (days: string) => {
    switch (days) {
      case "1D":
        setChartDays("1");
        break;
      case "1W":
        setChartDays("7");
        break;
      case "1M":
        setChartDays("30");
        break;
      case "3Y":
        setChartDays("365");
        break;
      case "5Y":
        setChartDays("" + 365 * 5);
        break;
      case "ALL":
        setChartDays("max");
        break;
    }
  };

  return (
    <>
      {data && (
        <div className="flex flex-col gap-4 justify-center items-stretch">
          <Header data={data} />
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
            <div>
              {chartDaysOptions.map((option) => {
                return (
                  <button key={option} onClick={() => handleDays(option)}>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
          <CoinBody data={data} />
        </div>
      )}
    </>
  );
};

export default CoinDetails;
