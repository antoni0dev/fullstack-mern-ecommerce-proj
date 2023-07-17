import { apiSlice } from "./apiSlice";
import { ProductType } from "../lib/@types";
import { PRODUCTS_URL } from "../lib/constants";

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
    }),
    getProductDetails: builder.query<ProductType, string>({
      query: (productId: string) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
