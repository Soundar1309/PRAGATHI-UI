import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { wishlistApi } from '../api/wishlist';
import type { WishlistItem } from '../api/wishlist';

export interface WishlistContextType {
  wishlist: WishlistItem[];
  isLoading: boolean;
  error: string | null;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  refreshWishlist: () => Promise<void>;
  clearError: () => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const refreshWishlist = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Refreshing wishlist...');
      const data = await wishlistApi.getWishlist();
      console.log('Wishlist data received:', data);
      setWishlist(data);
    } catch (error: unknown) {
      console.error('Error refreshing wishlist:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load wishlist';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: number) => {
    try {
      console.log(`Adding product ${productId} to wishlist...`);
      const newItem = await wishlistApi.addToWishlist(productId);
      console.log('Item added to wishlist:', newItem);
      
      // Immediately update local state for better UI responsiveness
      setWishlist(prev => {
        // Check if item already exists
        const exists = prev.some(item => item.product_id === productId);
        if (exists) {
          return prev; // Item already exists
        } else {
          return [newItem, ...prev]; // Add new item
        }
      });
      
      // Also refresh from server to ensure consistency
      await refreshWishlist();
    } catch (error: unknown) {
      console.error('Error adding to wishlist:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add to wishlist';
      setError(errorMessage);
      throw error; // Re-throw to let the component handle it
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      console.log(`Removing product ${productId} from wishlist...`);
      await wishlistApi.removeFromWishlist(productId);
      console.log('Item removed from wishlist');
      
      // Immediately update local state for better UI responsiveness
      setWishlist(prev => prev.filter(item => item.product_id !== productId));
      
      // Also refresh from server to ensure consistency
      await refreshWishlist();
    } catch (error: unknown) {
      console.error('Error removing from wishlist:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove from wishlist';
      setError(errorMessage);
      throw error; // Re-throw to let the component handle it
    }
  };

  const isInWishlist = (productId: number): boolean => {
    const result = wishlist.some(item => item.product_id === productId);
    console.log(`Product ${productId} in wishlist:`, result);
    return result;
  };

  // Load wishlist on mount (no authentication required)
  useEffect(() => {
    console.log('WishlistProvider mounted, loading wishlist...');
    refreshWishlist();
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
