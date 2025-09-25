import { useState, useCallback } from "react";
import { ApiError } from "../types/api";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiFunction(...args);
        setState({
          data: result,
          loading: false,
          error: null,
        });
        return result;
      } catch (error: any) {
        const apiError: ApiError = {
          message: error.message || "An error occurred",
          status: error.status || 500,
          code: error.code,
          details: error.details,
        };

        setState({
          data: null,
          loading: false,
          error: apiError,
        });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

export default useApi;
