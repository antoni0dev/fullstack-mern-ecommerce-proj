import { apiSlice } from './apiSlice';
import { ProductType } from '../lib/@types';
import { PRODUCTS_URL, UPLOADS_URL } from '../lib/constants';

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query<ProductType, string>({
      query: (productId: string) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      // the invalidate option is specifying that products should be removed from the cache. That way we get fresh data each time we create a product
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data: ProductType) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}/${data.productId}/image`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productsApiSlice;
