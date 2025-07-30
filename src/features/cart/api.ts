import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../../api/baseQueryWithAuth';

export interface CartItem {
  id: number;
  product: {
    id: number;
    title: string;
    description: string;
    price: string;
    stock: number;
    image: string;
    category: {
      id: number;
      name: string;
      description: string;
      created_at: string;
      updated_at: string;
    };
    created_at: string;
    updated_at: string;
  };
  quantity: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: number;
  cart_items: CartItem[];
  total: number;
  item_count: number;
  created_at: string;
  updated_at: string;
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => '/carts/',
    }),
    addItem: builder.mutation<any, { product_id: number; quantity: number }>({
      query: (body) => ({
        url: '/cart_items/',
        method: 'POST',
        body,
      }),
    }),
    updateItem: builder.mutation<any, { id: number; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/cart_items/${id}/`,
        method: 'PUT',
        body: { quantity },
      }),
    }),
    removeItem: builder.mutation<any, number>({
      query: (id) => ({
        url: `/cart_items/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddItemMutation, useUpdateItemMutation, useRemoveItemMutation } = cartApi;
