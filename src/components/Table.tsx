import React from "react";
import Image from "next/image";
import { transformCoinData } from "@/lib/utils/data-tansform";
import { CoinData, TransformedCoinData } from "@/lib/models/coin-data.model";
import Link from "next/link";

interface TableProps {
  title?: string;
  viewMore?: boolean;
  tableHead: string[];
  tableData: CoinData[];
  outerBorder?: boolean;
  innerBorder?: boolean;
}

const Table = ({
  title = "",
  viewMore = false,
  tableData,
  tableHead,
  outerBorder = true,
  innerBorder = false,
}: TableProps) => {
  // const tableHead = tableHead.filter((item) => item !== "image");
  if (!tableData || tableData.length === 0) {
    return <p>No data available</p>;
  }

  const _tableData: TransformedCoinData[] = tableData.map((coin) =>
    transformCoinData(coin)
  );

  return (
    <div
      className={
        outerBorder
          ? `border-[1px] border-border-light-gray rounded-md p-5`
          : ""
      }
    >
      {(viewMore || title) && (
        <div className="flex justify-between font-semibold mb-4">
          {title && <div>{title}</div>}
          {viewMore && (
            <Link href="/explore" className="text-xs text-primary">
              View More Coins
            </Link>
          )}
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-border-light-gray">
            {tableHead.map((item, index) => {
              return (
                <th
                  key={index}
                  className="text-secondary text-start text-xs font-normal"
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
                className={
                  innerBorder ? "border-b-[1px] border-border-light-gray" : ""
                }
              >
                {tableHead.map((key, index) => {
                  return (
                    <td key={index} className="text-sm py-3">
                      {key === "Token" ? (
                        <span className="flex items-center">
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
    </div>
  );
};

export default Table;
