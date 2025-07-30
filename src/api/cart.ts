import api from './axios';

export interface CartItem {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
    image?: string;
  };
  quantity: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: number;
  user: number;
  total: number;
  item_count: number;
  cart_items: CartItem[];
  created_at: string;
  updated_at: string;
}

export interface AddToCartData {
  product_id: number;
  quantity: number;
}

export interface UpdateCartItemData {
  quantity: number;
}

// Cart API
export const cartApi = {
  // Get user's cart
  getCart: async () => {
    const response = await api.get('/carts/');
    return response.data;
  },

  // Get all cart items
  getCartItems: async () => {
    const response = await api.get('/cart_items/');
    return response.data;
  },

  // Add item to cart
  addToCart: async (data: AddToCartData) => {
    const response = await api.post('/cart_items/', data);
    return response.data;
  },

  // Get single cart item
  getCartItem: async (id: number) => {
    const response = await api.get(`/cart_items/${id}/`);
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (id: number, data: UpdateCartItemData) => {
    const response = await api.patch(`/cart_items/${id}/`, data);
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (id: number) => {
    await api.delete(`/cart_items/${id}/`);
  },

  // Clear entire cart
  clearCart: async () => {
    const cartItems = await cartApi.getCartItems();
    await Promise.all(
      cartItems.results?.map((item: CartItem) => 
        cartApi.removeFromCart(item.id)
      ) || []
    );
  },
}; 