// export type CoinData = {
//   image: string;
//   name: string;
//   current_price: number;
//   price_change_24h: number;
//   market_cap: number;
//   [key: string]: any; // For any additional properties
// };

export type TransformedCoinData = {
  id: string;
  image: string;
  Token: string;
  Symbol: string;
  "Last Price": string;
  "24H Change": string;
  "7D": string;
  "30D": string;
  "1Y": string;
  "Market Cap": string;
  [key: string]: string;
};

export type CoinData = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  price_change_percentage_30d_in_currency?: number;
  price_change_percentage_1y_in_currency?: number;
};
