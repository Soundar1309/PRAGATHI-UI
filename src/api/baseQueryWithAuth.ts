import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  prepareHeaders: (headers) => {
    console.log('prepareHeaders called');
    const token = localStorage.getItem('jwt');
    console.log('Token exists:', !!token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      console.log('Authorization header set');
    }
    return headers;
  },
});

export const baseQueryWithReauth: typeof baseQueryWithAuth = async (args, api, extraOptions) => {
  console.log('baseQueryWithReauth called with args:', args);
  const result = await baseQueryWithAuth(args, api, extraOptions);
  console.log('baseQueryWithReauth result:', result);
  if (result.error && result.error.status === 401) {
    console.log('401 error detected, removing token');
    localStorage.removeItem('jwt');
    // Don't automatically redirect to login - let components handle authentication as needed
    // window.location.href = '/login';
  }
  return result;
};
