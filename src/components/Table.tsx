"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  transformCoinData,
  transformTrendingCoinData,
} from "@/lib/utils/data-tansform";
import {
  CoinData,
  TransformedCoinData,
  TrendingCoinData,
} from "@/lib/models/coin-data.model";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ZeroState from "./ZeroState";

interface TableProps {
  title?: string;
  viewMore?: boolean;
  tableHead: string[];
  tableData?: CoinData[];
  trendingCoinData?: TrendingCoinData[];
  outerBorder?: boolean;
  innerBorder?: boolean;
  onDragStart?: (e: React.DragEvent, item: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  isDraggable?: boolean;
}

const Table = ({
  title = "",
  viewMore = false,
  tableData = [],
  tableHead,
  outerBorder = true,
  innerBorder = false,
  trendingCoinData = [],
  onDragStart,
  onDragOver,
  onDrop,
  isDraggable = false,
}: TableProps) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 540);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // const tableHead = tableHead.filter((item) => item !== "image");

  const _tableData: TransformedCoinData[] =
    tableData.length !== 0
      ? tableData.map((coin) => transformCoinData(coin))
      : trendingCoinData.map((coin) => transformTrendingCoinData(coin));

  if (_tableData.length === 0) {
    return <ZeroState height={48} width={48} isRateLimit={true} />;
  }

  return (
    <div
      className={` bg-secondary
        ${outerBorder ? `border-[1px] border-primary rounded-md p-5` : ""}
      `}
    >
      {(viewMore || title) && (
        <div className="flex justify-between font-semibold mb-4">
          {title && <div>{title}</div>}
          {viewMore && (
            <Link href="/explore" className="text-xs text-blue">
              View More Coins
            </Link>
          )}
        </div>
      )}
      {isMobile && (
        <div className="space-y-4">
          {_tableData.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <div className="flex items-center mb-1 pb-3 border-b-[1px] border-primary">
                <Image
                  src={item.image}
                  alt={item.Token}
                  width={24}
                  height={24}
                />
                <span className="ml-2 font-semibold">{item.Token}</span>
              </div>
              {tableHead.map((key) => {
                if (key !== "Token" && key !== "image") {
                  return (
                    <div
                      key={key}
                      className="flex justify-between text-sm py-1 cursor-pointer"
                      onClick={() => router.push(`/coin/${item.id}`)}
                    >
                      <span className="text-secondary">{key}</span>
                      <span className="font-semibold">
                        {["24H Change", "7D", "30D", "1Y"].includes(key) ? (
                          <span
                            className={
                              +item[key] > 0 ? "text-green" : "text-orange"
                            }
                          >
                            <Image
                              src={
                                +item[key] > 0
                                  ? "/icons/arrow-up.svg"
                                  : "/icons/arrow-down.svg"
                              }
                              alt={key}
                              width={18}
                              height={18}
                              className="inline-block mr-1"
                            />
                            {+item[key] > 0 ? "+" : ""}
                            {item[key]}%
                          </span>
                        ) : (
                          item[key]
                        )}
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      )}
      {!isMobile && (
        <table className="w-full">
          <thead>
            <tr className="border-b-[1px] border-primary">
              {tableHead.map((item, index) => {
                return (
                  <th
                    key={index}
                    className="text-secondary text-start text-[10px] font-normal"
                  >
                    {item === "image" ? "" : item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {_tableData.map((item, idx) => {
              return (
                <tr
                  key={idx}
                  className={`rounded-md cursor-pointer hover:bg-hover hover:scale-[102%] transition-transform ease-in-out 
                    ${innerBorder ? "border-b-[1px] border-primary" : ""}
                  `}
                  onClick={() => router.push(`/coin/${item.id}`)}
                  draggable={isDraggable}
                  onDragStart={(e) => onDragStart && onDragStart(e, item.id)}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                >
                  {tableHead.map((key, index) => {
                    return (
                      <td
                        key={index}
                        className="text-xs py-3 bg-opacity-0 first-of-type:rounded-l-md last-of-type:rounded-r-md"
                      >
                        {key === "Token" ? (
                          <span className="flex items-center px-1">
                            <Image
                              src={item["image"]}
                              alt={key}
                              width={16}
                              height={16}
                            />
                            <span className="ml-2 text-sm font-semibold">
                              {item[key]}
                            </span>
                          </span>
                        ) : ["24H Change", "7D", "30D", "1Y"].includes(key) ? (
                          <span
                            className={
                              +item[key] > 0 ? "text-green" : "text-orange"
                            }
                          >
                            <Image
                              src={
                                +item[key] > 0
                                  ? "/icons/arrow-up.svg"
                                  : "/icons/arrow-down.svg"
                              }
                              alt={key}
                              width={18}
                              height={18}
                              className="inline-block mr-1"
                            />
                            {+item[key] > 0 ? "+" : ""}
                            {item[key]}%
                          </span>
                        ) : (
                          item[key]
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
