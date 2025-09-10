import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../api/baseQueryWithAuth';
// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query for public endpoints (no authentication required)
// const baseQueryPublic = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
// });

export type Category = { id: number; name: string; description?: string };

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Public endpoints (no authentication required)
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
    getCategories: builder.query<Category[], void>({
      query: () => '/products/categories/',
      transformResponse: (response: { results: Category[] }) => response.results || [],
    }),
    getCategory: builder.query<Category, number>({
      query: (id) => `/products/categories/${id}/`,
    }),
    getRecentlyAddedProducts: builder.query<any[], { limit?: number }>({
      query: ({ limit = 10 } = {}) => `/products/products/?ordering=-created_at&limit=${limit}`,
      transformResponse: (response: { results: any[] }) => response.results || [],
    }),
    
    // Admin endpoints (authentication required)
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
    createCategory: builder.mutation<Category, { name: string; description?: string }>({
      query: (body) => ({
        url: '/products/categories/',
        method: 'POST',
        body,
      }),
    }),
    updateCategory: builder.mutation<Category, { id: number; data: { name: string; description?: string } }>({
      query: ({ id, data }) => ({
        url: `/products/categories/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCategory: builder.mutation<any, number>({
      query: (id) => ({
        url: `/products/categories/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useGetProductQuery,
  useGetRecentlyAddedProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = productsApi;
