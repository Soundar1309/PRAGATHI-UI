import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../api/baseQueryWithAuth';

export type Category = { id: number; name: string };

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => '/products/products/',
      transformResponse: (response: { results: any[] }) => response.results || [],
    }),
    getProductsByCategory: builder.query<any[], number>({
      query: (categoryId) => `/products/products/?category_id=${categoryId}`,
      transformResponse: (response: { results: any[] }) => response.results || [],
    }),
    searchProducts: builder.query<any[], string>({
      query: (searchQuery) => `/products/products/?q=${encodeURIComponent(searchQuery)}`,
      transformResponse: (response: { results: any[] }) => response.results || [],
    }),
    getProduct: builder.query<any, number>({
      query: (id) => `/products/products/${id}/`,
    }),
    // Admin only:
    createProduct: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/products/products/',
        method: 'POST',
        body,
      }),
    }),
    updateProduct: builder.mutation<any, { id: number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/products/products/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<any, number>({
      query: (id) => ({
        url: `/products/products/${id}/`,
        method: 'DELETE',
      }),
    }),
    // --- Updated to return full category objects ---
    getCategories: builder.query<Category[], void>({
      query: () => '/products/categories/',
      transformResponse: (response: { results: Category[] }) => response.results || [],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = productsApi;
