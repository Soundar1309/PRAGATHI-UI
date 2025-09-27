import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // Enable sending cookies with requests
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/token/refresh/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwt', data.access);
            if (data.refresh) {
              localStorage.setItem('refreshToken', data.refresh);
            }
            
            // Retry the original request with the new token
            originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
            return api(originalRequest);
          } else {
            // Refresh failed, clear tokens
            localStorage.removeItem('jwt');
            localStorage.removeItem('refreshToken');
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('jwt');
          localStorage.removeItem('refreshToken');
        }
      } else {
        // No refresh token, clear access token
        localStorage.removeItem('jwt');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
