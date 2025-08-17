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
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => {
        console.log('getCart query called');
        return '/carts/carts/';
      },
      providesTags: ['Cart'],
    }),
    addItem: builder.mutation<any, { product_id: number; quantity: number }>({
      query: (body) => {
        console.log('addItem mutation called with:', body);
        return {
          url: '/carts/cart_items/',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Cart'],
    }),
    updateItem: builder.mutation<any, { id: number; quantity: number }>({
      query: ({ id, quantity }) => {
        console.log('updateItem mutation called with:', { id, quantity });
        return {
          url: `/carts/cart_items/${id}/`,
          method: 'PUT',
          body: { quantity },
        };
      },
      invalidatesTags: ['Cart'],
    }),
    removeItem: builder.mutation<any, number>({
      query: (id) => {
        console.log('removeItem mutation called with:', id);
        return {
          url: `/carts/cart_items/${id}/`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetCartQuery, useAddItemMutation, useUpdateItemMutation, useRemoveItemMutation } = cartApi;
