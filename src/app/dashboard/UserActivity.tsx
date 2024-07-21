"use client";

import RecentlyWatched from "@/components/RecentlyWatched";
import Watchlist from "@/components/Watchlist";
import { useCryptoStore } from "@/lib/hooks/zustand-store";
import { useEffect } from "react";

const UserActivity = () => {
  const { initializeStore } = useCryptoStore();
  useEffect(() => {
    const initialize = async () => {
      // This will initialize the store if it hasn't been already
      await initializeStore();
    };

    initialize();
  }, [initializeStore]);

  return (
    <div className="w-full lg:w-2/5 xl:w-1/3 min-w-80 bg-gray-100 py-4 md:sticky relative top-20 overflow-auto z-10">
      <div className="mb-6">
        <RecentlyWatched />
      </div>
      <div>
        <Watchlist />
      </div>
    </div>
  );
};

export default UserActivity;
