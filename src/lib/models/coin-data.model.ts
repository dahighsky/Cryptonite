export type CoinData = {
  image: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  market_cap: number;
  [key: string]: any; // For any additional properties
};

export type TransformedCoinData = {
  image: string;
  Token: string;
  "Last Price": string;
  "24H Change": string;
  "Market Cap": string;
  [key: string]: string;
};
