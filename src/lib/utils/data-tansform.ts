import { CoinData, TransformedCoinData } from "../models/coin-data.model";

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatLargeNumber = (value: number): string => {
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

export const formatPercentage = (value: number): string => {
  return value.toFixed(2);
};

export const transformCoinData = (data: CoinData): TransformedCoinData => {
  return {
    id: data.id,
    image: data.image,
    Symbol: data.symbol.toLocaleUpperCase(),
    Token: data.name,
    "Last Price": formatCurrency(data.current_price),
    "24H Change": formatPercentage(data.price_change_percentage_24h),
    "7D": formatPercentage(
      data.price_change_percentage_7d_in_currency
        ? data.price_change_percentage_7d_in_currency
        : 0
    ),
    "30D": formatPercentage(
      data.price_change_percentage_30d_in_currency
        ? data.price_change_percentage_30d_in_currency
        : 0
    ),
    "1Y": formatPercentage(
      data.price_change_percentage_1y_in_currency
        ? data.price_change_percentage_1y_in_currency
        : 0
    ),
    "Market Cap": formatLargeNumber(data.market_cap),
  };
};
