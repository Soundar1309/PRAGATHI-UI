import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { wishlistApi } from '../api/wishlist';
import type { WishlistItem } from '../api/wishlist';

interface WishlistContextType {
  wishlist: WishlistItem[];
  isLoading: boolean;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  refreshWishlist: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const validateToken = (): boolean => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.log('No JWT token found');
      return false;
    }
    
    // Basic token validation (you might want to add more sophisticated validation)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp && payload.exp < currentTime) {
        console.log('JWT token expired');
        localStorage.removeItem('jwt');
        return false;
      }
      
      console.log('JWT token is valid');
      return true;
    } catch (error) {
      console.error('Error validating JWT token:', error);
      localStorage.removeItem('jwt');
      return false;
    }
  };

  const refreshWishlist = async () => {
    try {
      if (!validateToken()) {
        setError('Authentication required');
        return;
      }

      setIsLoading(true);
      setError(null);
      console.log('Refreshing wishlist...');
      
      const data = await wishlistApi.getWishlist();
      console.log('Wishlist data received:', data);
      
      if (Array.isArray(data)) {
        setWishlist(data);
      } else {
        console.error('Invalid wishlist data format:', data);
        setError('Invalid data format received');
      }
    } catch (error: any) {
      console.error('Failed to fetch wishlist:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch wishlist';
      setError(errorMessage);
      
      // If it's an authentication error, clear the wishlist
      if (error.response?.status === 401) {
        setWishlist([]);
        localStorage.removeItem('jwt');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: number) => {
    try {
      if (!validateToken()) {
        throw new Error('Authentication required');
      }

      setError(null);
      console.log('Adding product to wishlist:', productId);
      
      const newItem = await wishlistApi.addToWishlist(productId);
      console.log('New wishlist item received:', newItem);
      
      if (newItem && newItem.product_id) {
        setWishlist(prev => {
          // Check if item already exists
          const exists = prev.some(item => item.product_id === productId);
          if (exists) {
            console.log('Item already exists in wishlist, updating...');
            return prev.map(item => item.product_id === productId ? newItem : item);
          } else {
            console.log('Adding new item to wishlist');
            return [newItem, ...prev];
          }
        });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Failed to add to wishlist:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add to wishlist';
      setError(errorMessage);
      throw error;
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      if (!validateToken()) {
        throw new Error('Authentication required');
      }

      setError(null);
      console.log('Removing product from wishlist:', productId);
      
      await wishlistApi.removeFromWishlist(productId);
      setWishlist(prev => prev.filter(item => item.product_id !== productId));
      console.log('Product removed from wishlist successfully');
    } catch (error: any) {
      console.error('Failed to remove from wishlist:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to remove from wishlist';
      setError(errorMessage);
      throw error;
    }
  };

  const isInWishlist = (productId: number): boolean => {
    const result = wishlist.some(item => item.product_id === productId);
    console.log(`Product ${productId} in wishlist:`, result);
    return result;
  };

  // Load wishlist on mount if user is authenticated
  useEffect(() => {
    console.log('WishlistProvider mounted, checking authentication...');
    if (validateToken()) {
      refreshWishlist();
    } else {
      console.log('User not authenticated, wishlist not loaded');
    }
  }, []);

  const value: WishlistContextType = {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refreshWishlist,
    error,
    clearError,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
