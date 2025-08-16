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
    const response = await api.get('/wishlist/');
    return response.data;
  },

  // Add product to wishlist
  addToWishlist: async (productId: number) => {
    const response = await api.post(`/wishlist/add/${productId}/`);
    return response.data;
  },

  // Remove product from wishlist
  removeFromWishlist: async (productId: number) => {
    await api.delete(`/wishlist/remove/${productId}/`);
  },

  // Check if product is in wishlist
  checkWishlistStatus: async (productId: number) => {
    const response = await api.get(`/wishlist/check/${productId}/`);
    return response.data;
  },
};
