// cacheUtil.ts

interface CacheItem {
  data: any;
  expiry: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cacheData = (key: string, data: any) => {
  const item: CacheItem = {
    data,
    expiry: Date.now() + CACHE_DURATION,
  };
  localStorage.setItem(key, JSON.stringify(item));
  memoryCache.set(key, item);
};

export const getCachedData = (key: string): any | null => {
  // Check memory cache first
  const memoryItem = memoryCache.get(key);
  if (memoryItem && Date.now() < memoryItem.expiry) {
    return memoryItem.data;
  }

  // If not in memory, check localStorage
  const item = localStorage.getItem(key);
  if (item) {
    const parsedItem: CacheItem = JSON.parse(item);
    if (Date.now() < parsedItem.expiry) {
      // Refresh memory cache
      memoryCache.set(key, parsedItem);
      return parsedItem.data;
    } else {
      // Remove expired item
      localStorage.removeItem(key);
    }
  }

  return null;
};

// Simple in-memory cache
const memoryCache = new Map<string, CacheItem>();
