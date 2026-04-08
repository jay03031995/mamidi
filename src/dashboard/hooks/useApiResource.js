import { useEffect, useState, useRef } from "react";

export function useApiResource(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef();

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcher({ signal: controller.signal });
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: () => setData(null) };
}
