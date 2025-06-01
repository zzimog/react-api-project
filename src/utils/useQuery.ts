import { useEffect, useState } from 'react';

// Local config
import config from '@/config/local.config';
const API_BASE_URL = config.baseUrl;

type QueryState<T> = {
  data?: T;
  fetchState: 'pending' | 'success' | 'error';
};

type QueryOptions = {
  delay?: number;
};

function useQuery<T>(url: string, options: QueryOptions) {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [state, setState] = useState<QueryState<T>>({
    data: undefined,
    fetchState: 'pending',
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

    setState((prev) => ({
      ...prev,
      fetchState: 'pending',
    }));

    setTimeout(() => {
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
    };
  }, [url, options.delay, lastUpdate]);

  function refetch() {
    setLastUpdate(new Date());
  }

  return {
    state: state.fetchState,
    isPending: state.fetchState === 'pending',
    isSuccess: state.fetchState === 'success',
    isError: state.fetchState === 'error',
    data: state.data,
    dataLastUpdate: lastUpdate,
    refetch,
  };
}

export default useQuery;
