import { getGuestMessages } from "@/api-services/guest-message.service";
import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";

export function useGuestMessages(initialPageIndex = 0, initialPageSize = 10) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
    pageCount: -1, // -1 indicates unknown page count initially
  });

  // stable imperative fetcher
  const fetchData = useCallback(async (currentPagination, silent = false) => {
    setLoading(true);
    setError(null);

    try {
      const { response, data: payload } = await getGuestMessages({
        page: currentPagination.pageIndex + 1,
        perPage: currentPagination.pageSize,
      });

      if (!response.ok) {
        const msg = payload?.message || "Data failed to load.";
        setError(msg);
        if (!silent) toast.error(msg);
        return;
      }

      // Set the data
      setData(payload.data || []);

      // Update pagination with metadata from API response
      setPagination({
        pageIndex: payload.pagination.current_page - 1,
        pageSize: payload.pagination.per_page,
        pageCount: payload.pagination.last_page,
      });

      if (!silent && payload?.message) toast.success(payload.message);
    } catch {
      const msg = "Unexpected error.";
      setError(msg);
      if (!silent) toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const pageRef = useRef(pagination);
  useEffect(() => {
    pageRef.current = pagination;
  }, [pagination]);

  const fetchLatest = useCallback(
    (silent = false) => fetchData(pageRef.current, silent),
    [fetchData]
  );

  useEffect(() => {
    fetchLatest();
  }, [pagination.pageIndex, pagination.pageSize]);

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
