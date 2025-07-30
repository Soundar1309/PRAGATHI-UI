import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/api';
import { userApi } from '../features/auth/userApi';
import { productsApi } from '../features/products/api';
import { ordersApi } from '../features/orders/api';
import { cartApi } from '../features/cart/api';

export const store = configureStore({
  reducer: {
    // ...other reducers
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
      cartApi.middleware,
    ),
});
