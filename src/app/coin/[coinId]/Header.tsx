import { CoinDataDetailed } from "@/lib/models/coin-data.model";
import { formatCurrency } from "@/lib/utils/data-tansform";
import Image from "next/image";

const Header = ({ data }: { data: CoinDataDetailed }) => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <div className="border-solid border-[1px] border-gray-light rounded-[4px] text-xs p-1 w-fit">
          <Image src={data.image.small} alt={"search"} width={26} height={26} />
        </div>
        <h1 className=" font-semibold text-secondary pt-1">{data?.name}</h1>
        <div className="flex gap-2 justify-between items-center py-1">
          <div className="text-2xl font-bold">
            {formatCurrency(data?.market_data.current_price.usd)}
          </div>
          <div
            className={`py-1 px-2 rounded text-xs bg-opacity-20 font-semibold ${
              data?.market_data.price_change_percentage_24h >= 0
                ? "bg-green text-green"
                : "bg-orange text-orange"
            }`}
          >
            {data?.market_data.price_change_percentage_24h >= 0 ? (
              <span className="mr-1">&uarr;</span>
            ) : (
              <span className="mr-1">&#8595;</span>
            )}
            {data?.market_data.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div
            className={`text-xs font-semibold ${
              data?.market_data.price_change_24h >= 0
                ? " text-green"
                : " text-orange"
            }`}
          >
            {data?.market_data.price_change_24h.toFixed(4)} Today
          </div>
        </div>
      </div>
      <div className="p-2 cursor-pointer flex justify-center items-center">
        <Image
          src={"/icons/add.svg"}
          alt={"Add to Watchlist"}
          width={26}
          height={26}
          className="hover:scale-110"
        />
      </div>
    </div>
  );
};
export default Header;
