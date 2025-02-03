import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => "/products",
    }),
    getProductsCategories: builder.query<any, void>({
      query: () => "/products/category-list",
    }),
    getProductById: builder.query<any, number>({
      query: (id) => `/products/${id}`,
    }),
    searchProducts: builder.query({
      query: ({ query, category, minPrice, maxPrice }) =>
        `/products/search?q=${query}&category=${category}&price=${minPrice}-${maxPrice}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery,useGetProductsCategoriesQuery,useSearchProductsQuery } = productApi;
