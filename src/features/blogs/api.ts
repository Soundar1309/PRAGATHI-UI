import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../api/baseQueryWithAuth';
import type { Blog, BlogCategory, BlogTag, CreateBlogData } from '../../api/blogs';

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Blog', 'BlogCategory', 'BlogTag'],
  endpoints: (builder) => ({
    // Get all published blogs with optional filtering
    getBlogs: builder.query<Blog[], {
      search?: string;
      category?: string;
      tag?: string;
      featured?: boolean;
    }>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
          }
        });
        return `/blogs/?${searchParams.toString()}`;
      },
      transformResponse: (response: any) => response.results || response,
      providesTags: ['Blog'],
    }),

    // Get single blog by slug
    getBlog: builder.query<Blog, string>({
      query: (slug) => `/blogs/${slug}/`,
      providesTags: (_, __, slug) => [{ type: 'Blog', id: slug }],
    }),

    // Get featured blogs
    getFeaturedBlogs: builder.query<Blog[], void>({
      query: () => '/blogs/featured/',
      providesTags: ['Blog'],
    }),

    // Get related blogs
    getRelatedBlogs: builder.query<Blog[], string>({
      query: (slug) => `/blogs/${slug}/related/`,
      providesTags: ['Blog'],
    }),

    // Get blog categories
    getBlogCategories: builder.query<BlogCategory[], void>({
      query: () => '/blogs/categories/',
      transformResponse: (response: any) => response.results || response,
      providesTags: ['BlogCategory'],
    }),

    // Get blog tags
    getBlogTags: builder.query<BlogTag[], void>({
      query: () => '/blogs/tags/',
      transformResponse: (response: any) => response.results || response,
      providesTags: ['BlogTag'],
    }),

    // Create blog (admin only)
    createBlog: builder.mutation<Blog, CreateBlogData>({
      query: (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (value instanceof File) {
              formData.append(key, value);
            } else if (Array.isArray(value)) {
              // Handle arrays (like tag_ids)
              value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item.toString());
              });
            } else if (typeof value === 'boolean') {
              formData.append(key, value.toString());
            } else if (typeof value === 'number') {
              formData.append(key, value.toString());
            } else {
              formData.append(key, value);
            }
          }
        });
        
        return {
          url: '/blogs/admin/create/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Blog'],
    }),

    // Update blog (admin only)
    updateBlog: builder.mutation<Blog, { slug: string; data: Partial<CreateBlogData> }>({
      query: ({ slug, data }) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (value instanceof File) {
              formData.append(key, value);
            } else if (Array.isArray(value)) {
              // Handle arrays (like tag_ids)
              value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item.toString());
              });
            } else if (typeof value === 'boolean') {
              formData.append(key, value.toString());
            } else if (typeof value === 'number') {
              formData.append(key, value.toString());
            } else {
              formData.append(key, value);
            }
          }
        });
        
        return {
          url: `/blogs/admin/${slug}/update/`,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: (_, __, { slug }) => [{ type: 'Blog', id: slug }],
    }),

    // Delete blog (admin only)
    deleteBlog: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/blogs/admin/${slug}/delete/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),

    // Add comment to blog
    addBlogComment: builder.mutation<any, { slug: string; comment: {
      author_name: string;
      author_email: string;
      content: string;
    } }>({
      query: ({ slug, comment }) => ({
        url: `/blogs/${slug}/comments/`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: (_, __, { slug }) => [{ type: 'Blog', id: slug }],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useGetFeaturedBlogsQuery,
  useGetRelatedBlogsQuery,
  useGetBlogCategoriesQuery,
  useGetBlogTagsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useAddBlogCommentMutation,
} = blogsApi;
