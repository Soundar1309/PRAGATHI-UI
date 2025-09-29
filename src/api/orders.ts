const API_BASE_URL = 'http://localhost:8000/api';

export interface OrderItem {
  id: number;
  product: {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    category: {
      id: number;
      name: string;
    };
  };
  quantity: number;
  price: string;
  subtotal: string;
  created_at: string;
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
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  delivery: {
    id: number;
    email: string;
    name: string;
  } | null;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: string;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export const fetchOrders = async (): Promise<Order[]> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/orders/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  const data = await response.json();
  
  // Handle paginated response
  if (data.results) {
    return data.results;
  }
  
  // Handle direct array response
  return Array.isArray(data) ? data : [];
};

export const fetchOrderById = async (id: number): Promise<Order> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/orders/${id}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }

  return response.json();
};