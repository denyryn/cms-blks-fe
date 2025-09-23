import { useState, useCallback, useEffect } from "react";
import * as stats from "@/api-services/statistics.service";

export function useStatistics({ type = "overview" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getStats = (type) => {
    switch (type) {
      case "overview":
        return stats.getOverviewStats;
      case "dashboard":
        return stats.getDashboardStats;
      case "users":
        return stats.getUserStats;
      case "products":
        return stats.getProductStats;
      case "orders":
        return stats.getOrderStats;
      case "revenue":
        return stats.getRevenueStats;
      default:
        return stats.getOverviewStats;
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const statsFn = getStats(type);
      const { response, data: payload } = await statsFn();
      if (!response.ok)
        throw new Error(payload?.message || "Failed to load statistics");
      setData(payload.data || null);
    } catch (e) {
      setError(e.message || "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchLatest: fetchData };
}
