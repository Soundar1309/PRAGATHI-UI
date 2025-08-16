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

  const refreshWishlist = async () => {
    try {
      setIsLoading(true);
      const data = await wishlistApi.getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: number) => {
    try {
      const newItem = await wishlistApi.addToWishlist(productId);
      setWishlist(prev => [newItem, ...prev]);
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await wishlistApi.removeFromWishlist(productId);
      setWishlist(prev => prev.filter(item => item.product_id !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      throw error;
    }
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlist.some(item => item.product_id === productId);
  };

  // Load wishlist on mount if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      refreshWishlist();
    }
  }, []);

  const value: WishlistContextType = {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refreshWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
