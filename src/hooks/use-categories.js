import { useState, useCallback, useEffect, useRef } from "react";
import { getCategories } from "@/api-services/category.service";
import { toast } from "sonner";

export function useCategories(initialPageIndex = 0, initialPageSize = 15) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });

  // stable imperative fetcher
  const fetchData = useCallback(async (silent = false) => {
    setLoading(true);
    setError(null);
    try {
      const { response, data: payload } = await getCategories(
        pagination.pageIndex,
        pagination.pageSize
      );
      if (!response.ok) {
        const msg = payload?.message || "Data failed to load.";
        setError(msg);
        if (!silent) toast.error(msg);
        return;
      }
      setData(payload.data);
      if (!silent && payload?.message) toast.success(payload.message);
    } catch {
      const msg = "Unexpected error.";
      setError(msg);
      if (!silent) toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []); // ← intentionally empty: we’ll pass page via ref

  // keep latest pagination in a ref so fetchData always sees it
  const pageRef = useRef(pagination);
  useEffect(() => {
    pageRef.current = pagination;
  }, [pagination]);

  // wrapper that uses the ref
  const fetchLatest = useCallback(
    (silent) => fetchData(silent, pageRef.current),
    [fetchData]
  );

  // auto-fetch when page changes
  useEffect(() => {
    fetchLatest();
  }, [pagination.pageIndex, pagination.pageSize]); // only primitives

  const refreshData = useCallback(() => fetchLatest(true), [fetchLatest]);

  return {
    data,
    loading,
    error,
    pagination,
    setPagination,
    refreshData,
    fetchLatest,
  };
}
