import { useEffect, useState } from 'react';

export type FetchMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type FetchOptions<T> = {
  url: string;
  enabled?: boolean;
  initialData?: T;
  method?: FetchMethod;
  body?: BodyInit;
};

export type FetchState<T> = {
  status: 'pending' | 'fetching' | 'idle' | 'error';
  data?: T;
  dataUpdatedAt?: Date;
  error?: string;
  errorUpdatedAt?: Date;
};

export function useFetch<T>(opts: FetchOptions<T>) {
  const {
    url,
    enabled = true,
    initialData,
    method = 'get',
    body = null,
  } = opts;

  const [lastRefetch, setLastRefetch] = useState(Date.now());
  const [state, setState] = useState<FetchState<T>>({
    status: 'idle',
    data: initialData,
  });

  function refetch() {
    setLastRefetch(Date.now());
  }

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const abortController = new AbortController();

    setState((prev) => ({
      ...prev,
      status: 'pending',
      error: undefined,
      errorUpdatedAt: undefined,
    }));

    fetch(url, {
      signal: abortController.signal,
      method,
      body,
    })
      .then((resp) => resp.json())
      .then((json) => {
        setState((prev) => ({
          ...prev,
          status: 'idle',
          data: json,
          dataUpdatedAt: new Date(),
        }));
      })
      .catch((err) => {
        if (abortController.signal.aborted) {
          console.log('Fetch aborted: ' + err);
          return;
        }

        setState((prev) => ({
          ...prev,
          status: 'error',
          error: err,
          errorUpdatedAt: new Date(),
        }));
      });

    return () => {
      abortController.abort('useEffect clean up');
    };
  }, [url, method, body, enabled, lastRefetch]);

  return {
    fetchStatus: state.status,
    data: state.data,
    dataUpdatedAt: state.dataUpdatedAt,
    error: state.error,
    errorUpdatedAt: state.errorUpdatedAt,
    isIdle: state.status == 'idle',
    isPending: state.status == 'pending',
    isError: state.status == 'error',
    fetch: refetch,
    refetch,
  };
}
