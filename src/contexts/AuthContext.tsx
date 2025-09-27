import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLoginMutation, useLogoutMutation } from '../features/auth/api';
import { register, getProfile } from '../api/auth';

interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

interface RegisterData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const isAuthenticated = !!user;

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          const userData = await getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to get user profile:', error);
          // Token might be invalid, try to refresh
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            const refreshed = await refreshTokenFromStorage();
            if (!refreshed) {
              // Refresh failed, clear everything
              localStorage.removeItem('jwt');
              localStorage.removeItem('refreshToken');
              setUser(null);
            }
          } else {
            // No refresh token, clear access token
            localStorage.removeItem('jwt');
            setUser(null);
          }
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const refreshTokenFromStorage = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

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
        return true;
      } else {
        // Refresh token is invalid
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('jwt');
        return false;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('jwt');
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const result = await loginMutation({ email, password }).unwrap();
      
      // Store tokens
      localStorage.setItem('jwt', result.access);
      localStorage.setItem('refreshToken', result.refresh);
      
      // Set user data
      setUser(result.user as User);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const registerUser = async (data: RegisterData): Promise<void> => {
    try {
      const result = await register(data);
      
      // Store tokens
      localStorage.setItem('jwt', result.access);
      localStorage.setItem('refreshToken', result.refresh);
      
      // Set user data
      setUser(result.user as User);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage and state regardless of API call success
      localStorage.removeItem('jwt');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    return await refreshTokenFromStorage();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register: registerUser,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
