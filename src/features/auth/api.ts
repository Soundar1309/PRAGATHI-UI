import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ user: any; access: string; refresh: string }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/login/',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access) {
            localStorage.setItem('jwt', data.access);
          }
        } catch {}
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout/',
        method: 'DELETE',
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        await queryFulfilled;
        localStorage.removeItem('jwt');
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
