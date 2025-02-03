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
      query: ({ query }) => `/products/search?q=${query}`,
    }),
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsCategoriesQuery,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
} = productApi;
