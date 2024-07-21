"use client";

import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface SearchCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

const CoinSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setSearchTerm("");
      setShowResults(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const searchCoins = async (term: string) => {
    if (term.length < 2) {
      setCoins([]);
      return;
    }

    try {
      const response = await api.get(
        `https://api.coingecko.com/api/v3/search?query=${term}`
      );
      setCoins(response.data.coins);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((term: string) => searchCoins(term), 3000),
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setShowResults(false);
    setSearchTerm(term);
    console.log(searchTerm && !showResults);
    if (term.length >= 3) {
      console.log(term);
      debouncedSearch(term);
    }
  };

  return (
    <div className="w-2/3 sm:w-1/2 md:w-1/3 relative">
      <div className="border-solid border-[1px] border-primary rounded-[4px] text-xs px-3 flex bg-secondary">
        <Image
          src={"/icons/search.svg"}
          alt={"search"}
          width={14}
          height={14}
          className="inline-block mr-2"
        />
        <input
          type="text"
          value={searchTerm}
          className="w-full px-1 py-[6px] active:outline-none focus:outline-none border-none bg-secondary text-secondary"
          onChange={handleInputChange}
          placeholder="Search..."
        />
      </div>
      {searchTerm && !showResults && (
        <div className="absolute top-8 bg-primary rounded-md border-[1px] border-primary px-4 py-2 max-h-64  w-full overflow-y-scroll no-scrollbar">
          <div className="font-semibold text-sm">Loading...</div>
          <div className="text-xs text-secondary">
            Please enter 3 or more characters to fetch the results
          </div>
        </div>
      )}
      {showResults && (
        <ul className="absolute top-8 bg-primary rounded-md border-[1px] border-primary p-2 max-h-64 overflow-y-scroll no-scrollbar z-50">
          {coins.map((coin) => (
            <li
              key={coin.id}
              onClick={() => {
                console.log("going to", coin.id);
                router.push(`/coin/${coin.id}`);
              }}
              className="flex justify-between items-center p-1 border-b-[1px] border-primary text-sm gap-1 hover:scale-105 rounded-sm hover:bg-hover cursor-pointer"
            >
              <div className="flex justify-between items-center gap-1 flex-shrink-0">
                <Image
                  src={coin.thumb}
                  alt={coin.symbol}
                  height={16}
                  width={16}
                ></Image>
                <div className="font-semibold">{coin.symbol}</div>
              </div>
              <div className="text-right text-xs text-secondary">
                {coin.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoinSearch;
