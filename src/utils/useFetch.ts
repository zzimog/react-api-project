// Local config
import config from '@/config/local.config';
const API_BASE_URL = config.baseUrl;

export type APIResponse = {
  [key: string]: string | number | boolean;
};

export type APIOptions = {
  // API url to call
  url: RequestInfo | URL;

  // Execute on successful API call
  onSuccess?: (json: APIResponse) => void;

  /**
   * @todo Give more error information (ex. status code)
   */
  // Execute if API call return an error
  onError?: (err?: string) => void;
};

export function useFetch(request: APIOptions) {
  const { url, onSuccess, onError } = request;

  async function exec(method: string, data?: unknown) {
    const init: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (data) {
      init['body'] = JSON.stringify(data);
    }

    try {
      const resp = await fetch(API_BASE_URL + url, init);

      if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}`);
      }

      const json = await resp.json();

      if (json.error) {
        throw new Error(json.error);
      }

      if (onSuccess) {
        onSuccess(json);
      }
    } catch (err) {
      if (onError) {
        onError(err as string);
      }
    }
  }

  return {
    get: () => exec('GET'),
    delete: () => exec('DELETE'),
    put: (body: unknown) => exec('PUT', body),
    patch: (body: unknown) => exec('PATCH', body),
  };
}

export default useFetch;
