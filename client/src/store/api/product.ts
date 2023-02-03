import { createApi } from '@reduxjs/toolkit/query/react';
import { unwrapResponseData, getCustomBaseUrl } from './api.base';

type Product = {
  createdAt: NativeDate;
  updatedAt: NativeDate;
  reviews: string[];
  avgRating?: number | undefined;
  productName?: string | undefined;
  imgUrl?: string | undefined;
  category?: string | undefined;
  shortDesc?: string | undefined;
};

const productApi = createApi({
  baseQuery: getCustomBaseUrl,
  tagTypes: ['Products'],
  reducerPath: 'productApi',
  endpoints: (build) => ({
    getAllProduct: build.query({
      query: (_: void) => '/product',
      providesTags: ['Products'],
      transformResponse: unwrapResponseData<Array<Product>>,
    }),
  }),
});

export { productApi };

export const { useGetAllProductQuery } = productApi;
