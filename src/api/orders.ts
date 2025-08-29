import api from './axios';

export interface OrderItem {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
    image?: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user: {
    id: number;
    email: string;
    name: string;
  };
  address: {
    id: number;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  delivery?: {
    id: number;
    email: string;
    name: string;
  };
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrderData {
  address_id: number;
}

export interface UpdateOrderData {
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  delivery_id?: number;
}

// Orders API
export const ordersApi = {
  // Get all orders (filtered by user role)
  getAll: async (params?: {
    page?: number;
    status?: string;
  }) => {
    const response = await api.get('/orders/', { params });
    return response.data;
  },

  // Get single order
  getById: async (id: number) => {
    const response = await api.get(`/orders/${id}/`);
    return response.data;
  },

  // Create order from cart
  create: async (data: CreateOrderData) => {
    const response = await api.post('/orders/', data);
    return response.data;
  },

  // Update order status (admin/delivery only)
  update: async (id: number, data: UpdateOrderData) => {
    const response = await api.patch(`/orders/${id}/`, data);
    return response.data;
  },

  // Get orders by status
  getByStatus: async (status: string) => {
    const response = await api.get('/orders/', { params: { status } });
    return response.data;
  },

  // Get user's orders
  getMyOrders: async () => {
    const response = await api.get('/orders/');
    return response.data;
  },
}; 