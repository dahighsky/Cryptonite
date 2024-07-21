// useApiWithCache.ts

import { useState, useEffect } from "react";
import axios from "axios";
import { cacheData, getCachedData } from "../utils/cache";
import { api } from "../api";

interface ApiOptions {
  url: string;
  params?: object;
  cacheKey: string;
}

export const useApiWithCache = ({ url, params, cacheKey }: ApiOptions) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        const response = await api.get(url, { params });
        setData(response.data);
        cacheData(cacheKey, response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, cacheKey]);

  return { data, loading, error };
};
