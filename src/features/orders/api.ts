import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../api/baseQueryWithAuth';

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
  subtotal: number;
  created_at: string;
}

export interface Order {
  id: number;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  address: {
    id: number;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  delivery: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  } | null;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrdersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersResponse, void>({
      query: () => '/orders/',
    }),
    getOrder: builder.query<Order, number>({
      query: (id) => `/orders/${id}/`,
    }),
    createOrder: builder.mutation<Order, { address_id: number }>({
      query: (body) => ({
        url: '/orders/',
        method: 'POST',
        body,
      }),
    }),
    updateOrder: builder.mutation<Order, { id: number; data: Partial<Order> }>({
      query: ({ id, data }) => ({
        url: `/orders/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = ordersApi;
