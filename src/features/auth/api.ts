import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Custom base query with token refresh logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  // If we get a 401, try to refresh the token
  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshResult = await fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
      })({
        url: '/token/refresh/',
        method: 'POST',
        body: { refresh: refreshToken },
      }, api, extraOptions);

      if (refreshResult.data) {
        const { access, refresh: newRefresh } = refreshResult.data as any;
        localStorage.setItem('jwt', access);
        if (newRefresh) {
          localStorage.setItem('refreshToken', newRefresh);
        }
        
        // Retry the original request with the new token
        result = await fetchBaseQuery({
          baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
          prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${access}`);
            return headers;
          },
        })(args, api, extraOptions);
      } else {
        // Refresh failed, clear tokens
        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');
      }
    } else {
      // No refresh token, clear access token
      localStorage.removeItem('jwt');
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<{ user: unknown; access: string; refresh: string }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/users/login/',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.access) {
            localStorage.setItem('jwt', data.access);
          }
          if (data?.refresh) {
            localStorage.setItem('refreshToken', data.refresh);
          }
        } catch {
          // Handle error silently
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/users/logout/',
        method: 'DELETE',
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        await queryFulfilled;
        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');
      },
    }),
    refreshToken: builder.mutation<{ access: string; refresh?: string }, { refresh: string }>({
      query: ({ refresh }) => ({
        url: '/token/refresh/',
        method: 'POST',
        body: { refresh },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } = authApi;
