import axios from "axios";
import { getRandomApiKey } from "./utils/apiKeyUtils";

export const api = axios.create({
  baseURL: "https://pro-api.coingecko.com/api/v3",
  headers: {
    "x-cg-pro-api-key": getRandomApiKey(), // Only if using Pro API
  },
});
