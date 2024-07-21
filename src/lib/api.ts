import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "x-cg-pro-api-key": process.env.COINGECKO_API_KEY,
  },
});
