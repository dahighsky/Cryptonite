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
        <div>
          <div className="flex justify-between items-end">
            <div>
              <div className="border-solid border-[1px] border-gray-light rounded-[4px] text-xs p-1 w-fit">
                <Image
                  src={data.image.small}
                  alt={"search"}
                  width={28}
                  height={28}
                />
              </div>
              <div>{data?.name}</div>
              <div className="flex gap-2">
                <div>{formatCurrency(data?.market_data.current_price.usd)}</div>
                <div>{data?.market_data.price_change_percentage_24h}</div>
                <div>{data?.market_data.price_change_24h} Today</div>
              </div>
            </div>
            <div>Add to Watchlist</div>
          </div>
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
          <div>
            <h2>Performance</h2>
            <div className="flex justify-between items-center gap-3">
              <div className="flex-shrink-0">
                <div>Today&apos;s Low</div>
                <div>{data.market_data.low_24h.usd}</div>
              </div>
              <div className="relative w-full flex-shrink-[2]">
                <div className="w-full h-3 min-h-3 bg-blue rounded-full"></div>
                <div
                  style={{
                    left:
                      (
                        ((data.market_data.current_price.usd -
                          data.market_data.low_24h.usd) /
                          (data.market_data.high_24h.usd -
                            data.market_data.low_24h.usd)) *
                        100
                      ).toFixed(0) + `%`,
                  }}
                  className={`absolute top-3`}
                >
                  {" "}
                  ||{" "}
                </div>
              </div>
              <div className="flex-shrink-0">
                <div>Today&apos;s High</div>
                <div>{data.market_data.high_24h.usd}</div>
              </div>
            </div>
          </div>
          <div>
            <h3>Fundamentals</h3>
            <div>
              <div className="flex justify-between border-b-[1px] border-border-light-gray">
                <div>Total Market Cap</div>
                <div>{data.market_data.market_cap.usd}</div>
              </div>
              <div className="flex justify-between border-b-[1px] border-border-light-gray">
                <div>Total Market Cap</div>
                <div>{data.market_data.market_cap.usd}</div>
              </div>
              <div className="flex justify-between border-b-[1px] border-border-light-gray">
                <div>Total Market Cap</div>
                <div>{data.market_data.market_cap.usd}</div>
              </div>
              <div className="flex justify-between border-b-[1px] border-border-light-gray">
                <div>Total Market Cap</div>
                <div>{data.market_data.market_cap.usd}</div>
              </div>
              <div className="flex justify-between border-b-[1px] border-border-light-gray">
                <div>Total Market Cap</div>
                <div>{data.market_data.market_cap.usd}</div>
              </div>
              <div className="flex justify-between border-b-[1px] border-border-light-gray">
                <div>Total Market Cap</div>
                <div>{data.market_data.market_cap.usd}</div>
              </div>
            </div>
          </div>
          <div>
            <h3>About {data.name}</h3>
            <p dangerouslySetInnerHTML={{ __html: data.description.en }}></p>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinDetails;
