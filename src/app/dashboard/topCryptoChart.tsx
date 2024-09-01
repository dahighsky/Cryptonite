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
import { MarketChartData } from "@/lib/models/coin-data.model";

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

const TopCryptoChart = ({ chartData }: { chartData: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitError, setRateLimitError] = useState(false);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const chartContainerRef = useRef<HTMLDivElement>(null);

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
