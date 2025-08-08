import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: typeof baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQueryWithAuth(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    localStorage.removeItem('jwt');
    // Don't automatically redirect to login - let components handle authentication as needed
    // window.location.href = '/login';
  }
  return result;
};
