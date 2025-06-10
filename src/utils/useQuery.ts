import { useEffect, useState } from 'react';

// Local config
import config from '@/config/local.config';
const API_BASE_URL = config.baseUrl;

export type QueryState<T> = {
  fetchState: 'idle' | 'pending' | 'success' | 'error';
  data?: T;
  dataUpdatedAt?: Date;
};

export type QueryOptions<T> = {
  enabled?: boolean;
  delay?: number;
  placeholder?: T;
};

export function useQuery<T>(url: string, options: QueryOptions<T>) {
  const [refetchTrigger, setRefetchTrigger] = useState(new Date());
  const [state, setState] = useState<QueryState<T>>({
    fetchState: 'idle',
    data: options.placeholder,
    dataUpdatedAt: undefined,
  });

  /**
   * @todo
   */
  // const [error, setError] = useState(false);

  if (url[0] !== '/') {
    throw new Error("Query URL must starts with '/'.");
  }

  useEffect(() => {
    const abortController = new AbortController();

    if (options.enabled === false) {
      return;
    }

    setState((prev) => ({
      ...prev,
      fetchState: 'pending',
    }));

    const timeout = setTimeout(() => {
      fetch(API_BASE_URL + url, {
        signal: abortController.signal,
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(`Response status: ${resp.status}`);
          }

          return resp.json();
        })
        .then((json) => {
          if (!abortController.signal.aborted) {
            setState((prev) => ({
              ...prev,
              fetchState: 'success',
              data: json,
              dataUpdatedAt: new Date(),
            }));
          }
        })
        .catch((err) => {
          if (!abortController.signal.aborted) {
            alert(err);
            setState((prev) => ({
              ...prev,
              fetchState: 'error',
              data: undefined,
            }));
          } else {
            console.log(err);
          }
        });
    }, options?.delay || 0);

    return () => {
      abortController.abort(`[${url}] useEffect clean up`);
      clearTimeout(timeout);
    };
  }, [url, options.enabled, options.delay, refetchTrigger]);

  function refetch() {
    setRefetchTrigger(new Date());
  }

  return {
    state: state.fetchState,
    isIdle: state.fetchState === 'idle',
    isPending: state.fetchState === 'pending',
    isSuccess: state.fetchState === 'success',
    isError: state.fetchState === 'error',
    data: state.data,
    dataUpdatedAt: state.dataUpdatedAt,
    refetch,
  };
}

export default useQuery;
