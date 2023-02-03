import {
  BaseQueryFn,
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL });

const mutex = new Mutex();

const getCustomBaseUrl: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    let dataRefetchPossible = true;
    if (!mutex.isLocked()) await mutex.waitForUnlock();
    else {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { credentials: 'include', url: 'auth/refresh' },
          api,
          extraOptions
        );

        dataRefetchPossible = !!refreshResult.error;
      } finally {
        release();
      }
    }

    if (dataRefetchPossible) result = await baseQuery(args, api, extraOptions);
  }

  return result as any;
};

const unwrapResponseData = <D>(response: SuccessCase<D>): D => {
  if (!('data' in response))
    throw new Error('Expected response to contain the the data value');
  return response.data as D;
};

export { baseQuery as baseUrl, unwrapResponseData, getCustomBaseUrl };
