import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { CoinData } from "../models/coin-data.model";
import { api } from "../api";

interface CoinStore {
  watchlist: string[];
  recentlyWatched: string[];
  watchlistData: CoinData[];
  recentlyWatchedData: CoinData[];
  addToWatchlist: (coinId: string) => void;
  addToRecentlyWatched: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
  fetchWatchlistData: () => Promise<void>;
  fetchRecentlyWatchedData: () => Promise<void>;
  initializeStore: () => void;
}

const DEFAULT_WATCHLIST = ["turbo", "zksync", "solana", "ethereum"];
const DEFAULT_RECENTLY_WATCHED = ["maga", "kaspa", "ethereum"];

const fetchCoinData = async (
  coinIds: string[],
  lastData: CoinData[]
): Promise<CoinData[]> => {
  try {
    console.log("fetching", coinIds);
    const response = await api.get(`/coins/markets`, {
      params: {
        vs_currency: "usd",
        ids: coinIds.join(","),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return lastData;
  }
};

export const useCryptoStore = create<CoinStore>()(
  persist(
    (set, get) => ({
      watchlist: DEFAULT_WATCHLIST,
      recentlyWatched: DEFAULT_RECENTLY_WATCHED,
      watchlistData: [],
      recentlyWatchedData: [],
      addToWatchlist: (coinId) => {
        set((state) => {
          if (!state.watchlist.includes(coinId)) {
            console.log("Adding to watchlist in store", coinId);
            const newWatchlist = [...state.watchlist, coinId];
            return { watchlist: newWatchlist };
          }
          return state;
        });

        get().fetchWatchlistData();
      },
      addToRecentlyWatched: (coinId) => {
        set((state) => {
          let newRecentlyWatched;
          console.log("adding to recently watched", coinId);
          if (state.recentlyWatched.includes(coinId)) {
            newRecentlyWatched = [
              coinId,
              ...state.recentlyWatched.filter((id) => id !== coinId),
            ];
          } else {
            newRecentlyWatched = [coinId, ...state.recentlyWatched].slice(
              0,
              10
            );
          }
          return { recentlyWatched: newRecentlyWatched };
        });

        get().fetchRecentlyWatchedData();
      },
      removeFromWatchlist: (coinId) => {
        set((state) => {
          const newWatchlist = state.watchlist.filter((id) => id !== coinId);
          get().fetchWatchlistData();
          return { watchlist: newWatchlist };
        });
      },
      fetchWatchlistData: async () => {
        const watchlist = get().watchlist;
        const watchlistData = await fetchCoinData(
          watchlist,
          get().watchlistData
        );
        set({ watchlistData });
      },
      fetchRecentlyWatchedData: async () => {
        const recentlyWatched = get().recentlyWatched;
        console.log("fetching recentlyWatched using", recentlyWatched);
        const recentlyWatchedData = await fetchCoinData(
          recentlyWatched,
          get().recentlyWatchedData
        );
        set({ recentlyWatchedData });
      },
      initializeStore: () => {
        const state = get();
        if (!state.watchlist || state.watchlist.length === 0) {
          set({ watchlist: DEFAULT_WATCHLIST });
        }
        if (!state.recentlyWatched || state.recentlyWatched.length === 0) {
          set({ recentlyWatched: DEFAULT_RECENTLY_WATCHED });
        }
        console.log("fetching while initialising");
        get().fetchWatchlistData();
        get().fetchRecentlyWatchedData();
      },
    }),
    {
      name: "crypto-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        watchlist: state.watchlist,
        recentlyWatched: state.recentlyWatched,
      }),
    }
  )
);
