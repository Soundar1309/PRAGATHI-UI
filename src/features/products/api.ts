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
    getProducts: builder.query<any[], {
      category_id?: number;
      product_type?: string;
      is_in_stock?: boolean;
      has_offer?: boolean;
      min_price?: number;
      max_price?: number;
      min_stock?: number;
      max_stock?: number;
      search?: string;
      ordering?: string;
    }>({
      query: (params = {}) => ({
        url: '/products/products/',
        params,
      }),
      transformResponse: (response: { results: any[] }) => response.results || [],
      // Ensure the query runs automatically
      keepUnusedDataFor: 60, // Keep data for 60 seconds
    }),
    getProductsByCategory: builder.query<any[], number>({
      query: (categoryId) => `/products/products/?category_id=${categoryId}`,
      transformResponse: (response: { results: any[] }) => response.results || [],
      // Ensure the query runs automatically
      keepUnusedDataFor: 60, // Keep data for 60 seconds
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
      // Ensure the query runs automatically
      keepUnusedDataFor: 60, // Keep data for 60 seconds
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
    // Partial update (PATCH) for small field changes like is_in_stock
    updateProductPartial: builder.mutation<any, { id: number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/products/products/${id}/`,
        method: 'PATCH',
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
    
    // Product Variations endpoints
    getProductVariations: builder.query<any[], { product_id?: number; unit?: string; is_active?: boolean }>({
      query: (params) => ({
        url: '/products/variations/',
        params,
      }),
      transformResponse: (response: { results: any[] }) => response.results || [],
    }),
    getProductVariation: builder.query<any, number>({
      query: (id) => `/products/variations/${id}/`,
    }),
    createProductVariation: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/products/variations/',
        method: 'POST',
        body,
      }),
    }),
    updateProductVariation: builder.mutation<any, { id: number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/products/variations/${id}/`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteProductVariation: builder.mutation<any, number>({
      query: (id) => ({
        url: `/products/variations/${id}/`,
        method: 'DELETE',
      }),
    }),
    getProductWithVariations: builder.query<any, number>({
      query: (id) => `/products/products/${id}/with-variations/`,
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
  useUpdateProductPartialMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductVariationsQuery,
  useGetProductVariationQuery,
  useCreateProductVariationMutation,
  useUpdateProductVariationMutation,
  useDeleteProductVariationMutation,
  useGetProductWithVariationsQuery,
} = productsApi;
