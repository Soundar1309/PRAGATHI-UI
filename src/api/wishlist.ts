import api from './axios';

export interface WishlistItem {
  id: number;
  product: {
    id: number;
    title: string;
    description?: string;
    image: string;
    price: number;
    stock: number;
    category: {
      id: number;
      name: string;
      description?: string;
      created_at: string;
      updated_at: string;
    };
    category_id: number;
    created_at: string;
    updated_at: string;
  };
  product_id: number;
  added_at: string;
}

export const wishlistApi = {
  // Get user's wishlist
  getWishlist: async () => {
    try {
      console.log('Fetching wishlist...');
      const token = localStorage.getItem('jwt');
      console.log('Token exists:', !!token);
      
      const response = await api.get('/wishlist/');
      console.log('Wishlist response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching wishlist:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status:', error.response?.status);
      throw error;
    }
  },

  // Add product to wishlist
  addToWishlist: async (productId: number) => {
    try {
      console.log('Adding product to wishlist:', productId);
      const token = localStorage.getItem('jwt');
      console.log('Token exists:', !!token);
      
      const response = await api.post(`/wishlist/add/${productId}/`);
      console.log('Add to wishlist response:', response.data);
      
      // Validate response structure
      if (!response.data || !response.data.product_id) {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Error adding to wishlist:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      throw error;
    }
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId: number) => {
    try {
      console.log('Removing product from wishlist:', productId);
      const token = localStorage.getItem('jwt');
      console.log('Token exists:', !!token);
      
      await api.delete(`/wishlist/remove/${productId}/`);
      console.log('Successfully removed from wishlist');
    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status:', error.response?.status);
      throw error;
    }
  },

  // Check if product is in wishlist
  checkWishlistStatus: async (productId: number) => {
    try {
      console.log('Checking wishlist status for product:', productId);
      const token = localStorage.getItem('jwt');
      console.log('Token exists:', !!token);
      
      const response = await api.get(`/wishlist/check/${productId}/`);
      console.log('Check wishlist status response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error checking wishlist status:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status:', error.response?.status);
      throw error;
    }
  },
};
