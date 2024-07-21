import { stat } from "fs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CoinStore {
  watchlist: string[];
  recentlyWatched: string[];
  addToWatchlist: (coinId: string) => void;
  addToRecentlyWatched: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
}

export const useCryptoStore = create<CoinStore>()(
  persist(
    (set, get) => ({
      watchlist: ["bitcoin", "ethereum", "0chain", "dogecoin"],
      recentlyWatched: ["bitcoin", "ethereum", "0chain", "dogecoin"],
      addToWatchlist: (coinId) => {
        set((state) => {
          if (!state.watchlist.includes(coinId)) {
            state.watchlist.push(coinId);
            return { watchlist: state.watchlist };
          }
          return state;
        });
      },
      addToRecentlyWatched: (coinId) => {
        set((state) => {
          console.log("Adding to recently watched");
          if (state.recentlyWatched.includes(coinId)) {
            state.recentlyWatched
              .splice(state.recentlyWatched.indexOf(coinId), 1)
              .unshift(coinId);
            console.log("Recently watched:", state.recentlyWatched);
            return {
              recentlyWatched: state.recentlyWatched,
            };
          } else {
            state.recentlyWatched.unshift(coinId);
            console.log("Recently watched:", state.recentlyWatched);
            return {
              recentlyWatched: state.recentlyWatched,
            };
          }
        });
      },
      removeFromWatchlist: (coinId) => {
        set((state) => {
          return { watchlist: state.watchlist.filter((id) => id !== coinId) };
        });
      },
    }),
    {
      name: "crypto-storage",
      getStorage: () => localStorage,
    }
  )
);
