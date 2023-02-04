import { createApi } from '@reduxjs/toolkit/query/react';
import { unwrapResponseData, getCustomBaseUrl } from './api.base';
import { ProductData } from '../../components/ProductList/type';

type ShowCaseProductData = Omit<ProductData, 'reviews'>;

const productApi = createApi({
  baseQuery: getCustomBaseUrl,
  tagTypes: ['Products', 'Products/Trend'],
  reducerPath: 'productApi',
  endpoints: (build) => ({
    getAllProduct: build.query({
      query: (_: void) => '/product',
      providesTags: ['Products'],
      transformResponse: unwrapResponseData<Array<ShowCaseProductData>>,
    }),

    getTrendingProduct: build.query({
      query: (queryParams: { limit?: number }) => '/product?stat=trending&',
      providesTags: ['Products/Trend'],
      transformResponse: unwrapResponseData<Array<ShowCaseProductData>>,
    }),
  }),
});

export { productApi };

export const { useGetAllProductQuery, useGetTrendingProductQuery } = productApi;
export type { ShowCaseProductData };
