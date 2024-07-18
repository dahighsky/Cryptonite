import { CoinData, TransformedCoinData } from "../models/coin-data.model";

const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
};

const formatLargeNumber = (value: number): string => {
  if (value >= 1000000000000) {
    return (value / 1000000000000).toFixed(2) + "T";
  } else if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2) + "B";
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(2) + "M";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2) + "K";
  }
  return value.toFixed(2);
};

const formatPercentage = (value: number): string => {
  return value.toFixed(2) + "%";
};

export const transformCoinData = (data: CoinData): TransformedCoinData => {
  return {
    image: data.image,
    Token: data.name,
    "Last Price": formatCurrency(data.current_price),
    "24H Change": formatPercentage(data.price_change_24h),
    "Market Cap": formatLargeNumber(data.market_cap),
  };
};
