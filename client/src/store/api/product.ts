import { createApi } from '@reduxjs/toolkit/query/react';
import { unwrapResponseData, getCustomBaseUrl } from './api.base';
import { ProductData } from '../../components/ProductList/type';
import { Primitive } from 'react-hook-form';

type ShowCaseProductData = Omit<ProductData, 'reviews'>;

type ProductQuery = {
  limit?: number;
};

function getQueryString(query: Record<string, Primitive>) {
  return `${JSON.stringify(query) !== '{}' ? '&' : ''}${new URLSearchParams(
    query as Record<string, string>
  )}`;
}

const productApi = createApi({
  baseQuery: getCustomBaseUrl,
  tagTypes: [
    'Products',
    'Products/Trend',
    'Products/Best-Sales',
    'Products/New-Arrival',
    'Products/Popular',
  ],
  reducerPath: 'productApi',
  endpoints: (build) => ({
    getAllProduct: build.query({
      query: (_: void) => '/product',
      providesTags: ['Products'],
      transformResponse: unwrapResponseData<Array<ShowCaseProductData>>,
    }),

    getTrendingProduct: build.query({
      query: (queryParams?: ProductQuery) =>
        `/product?stat=trending${getQueryString(queryParams ?? {})}`,
      providesTags: ['Products/Trend'],
      transformResponse: unwrapResponseData<Array<ShowCaseProductData>>,
    }),

    getBestSalesProduct: build.query({
      query: (query?: ProductQuery) =>
        `/product?stat=best-sales${getQueryString(query ?? {})}`,
      providesTags: ['Products/Best-Sales'],
      transformResponse: unwrapResponseData<Array<ShowCaseProductData>>,
    }),

    getNewArrivalProduct: build.query({
      query: (query?: ProductQuery) =>
        `/product?stat=newly${getQueryString(query ?? {})}`,
      providesTags: ['Products/New-Arrival'],
      transformResponse: unwrapResponseData<Array<ShowCaseProductData>>,
    }),

    getPopularProduct: build.query({
      query: (query?: ProductQuery) =>
        `/product?stat=newly${getQueryString(query ?? {})}`,
      providesTags: ['Products/Popular'],
      transformResponse: unwrapResponseData<Array<ShowCaseProductData>>,
    }),
  }),
});

export { productApi };

export const {
  useGetAllProductQuery,
  useGetTrendingProductQuery,
  useGetBestSalesProductQuery,
  useGetNewArrivalProductQuery,
  useGetPopularProductQuery,
} = productApi;
export type { ShowCaseProductData };
