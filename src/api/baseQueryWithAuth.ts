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
    // Optionally, redirect to login:
    window.location.href = '/login';
  }
  return result;
};
