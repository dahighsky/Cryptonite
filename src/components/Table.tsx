import React from "react";
import Image from "next/image";
import { transformCoinData } from "@/lib/utils/data-tansform";
import { CoinData, TransformedCoinData } from "@/lib/models/coin-data.model";

interface TableProps {
  title: string;
  viewMore: string;
  tableHead: string[];
  tableData: CoinData[];
}

const Table = (tableProps: TableProps) => {
  // const _tableHead = tableProps.tableHead.filter((item) => item !== "image");
  if (!tableProps.tableData || tableProps.tableData.length === 0) {
    return <p>No data available</p>;
  }

  const _tableData: TransformedCoinData[] = tableProps.tableData.map((coin) =>
    transformCoinData(coin)
  );

  const _tableHead = Object.keys(_tableData[0]).filter(
    (item) => item !== "image"
  );

  return (
    <div className="border-[1px] border-border-light-gray rounded-md p-5">
      <div className="flex justify-between font-semibold mb-4">
        <div>{tableProps.title}</div>
        <div className="text-xs text-primary">View More Coins</div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-border-light-gray">
            {_tableHead.map((item, index) => {
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
              <tr key={idx}>
                {_tableHead.map((key, index) => {
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
                      ) : key === "24H Change" ? (
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
                          {item[key]}
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
