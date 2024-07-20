import { CoinDataDetailed } from "@/lib/models/coin-data.model";
import "./coin.css";
import { formatCurrency } from "@/lib/utils/data-tansform";

type Fundamental =
  | "market_cap"
  | "fully_diluted_valuation"
  | "total_volume"
  | "circulating_supply"
  | "total_supply"
  | "max_supply";
type CurrencyCode = "usd" | "";

type FundamentalTuple = [string, Fundamental, CurrencyCode];

const fundamentals: FundamentalTuple[] = [
  ["Total Market Cap", "market_cap", "usd"],
  ["Fully Diluted Valuation", "fully_diluted_valuation", "usd"],
  ["24 Hour Trading Volume", "total_volume", "usd"],
  ["Circulating Supply", "circulating_supply", ""],
  ["Total Supply", "total_supply", ""],
  ["Max Supply", "max_supply", ""],
];

const CoinBody = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="border-b-[1px] border-border-light-gray py-3">
        <h2>Performance</h2>
        <div className="flex justify-between items-center gap-3 py-3">
          <div className="flex-shrink-0">
            <div className="text-xs text-secondary font-medium">
              Today&apos;s Low
            </div>
            <div className="font-semibold">
              {formatCurrency(data.market_data.low_24h.usd)}
            </div>
          </div>
          <div className="relative w-full flex-shrink-[2]">
            <div className="w-full h-[6px] bg-green rounded-full"></div>
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
              className={`absolute top-2 w-4 h-4 text-gray-dark`}
            >
              &#11205;
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="text-xs text-secondary font-medium">
              Today&apos;s High
            </div>
            <div className="font-semibold">
              {formatCurrency(data.market_data.high_24h.usd)}
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-border-light-gray py-3 pb-6">
        <h2>Fundamentals</h2>
        <div className="font-semibold w-fit text-sm">
          {fundamentals.map((fundamental) => {
            return (
              <div
                key={fundamental[1]}
                className="flex justify-between border-b-[1px] border-border-light-gray gap-20 py-2"
              >
                <div className="text-secondary">{fundamental[0]}</div>
                <div>
                  {fundamental[2]
                    ? formatCurrency(
                        data.market_data[fundamental[1]][fundamental[2]]
                      )
                    : formatCurrency(data.market_data[fundamental[1]])}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2>About {data.name}</h2>
        <p
          dangerouslySetInnerHTML={{ __html: data.description.en }}
          className="text-xs"
        ></p>
      </div>
    </div>
  );
};

export default CoinBody;
