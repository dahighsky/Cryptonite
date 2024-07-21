"use client";

import { useEffect, useState } from "react";
import Table from "@/components/Table";
import { useCryptoStore } from "@/lib/hooks/zustand-store";

const RecentlyWatched = () => {
  const { recentlyWatchedData } = useCryptoStore();

  const handleDragStart = (e: React.DragEvent, item: string) => {
    console.log("dragging", item);
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  return (
    <div>
      <Table
        title={"Recently Watched"}
        viewMore={true}
        tableData={recentlyWatchedData}
        tableHead={["Token", "Last Price", "24H Change", "Market Cap"]}
        onDragStart={handleDragStart}
        isDraggable={true}
      />
    </div>
  );
};

export default RecentlyWatched;