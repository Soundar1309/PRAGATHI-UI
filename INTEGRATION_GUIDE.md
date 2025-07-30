# Frontend-Backend Integration Guide

## 🚀 **Backend Status Check**

Your Django backend is currently **RUNNING** on:
- **URL**: http://localhost:8000/
- **API Base**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

## 🔧 **Frontend Configuration**

### **1. Environment Variables**

Create a `.env` file in your `client` directory:

```bash
# .env
VITE_API_URL=http://localhost:8000/api
```

### **2. API Configuration**

The API is already configured in `src/api/axios.ts`:
- Base URL: `http://localhost:8000/api`
- JWT Token handling
- Automatic token refresh
- Error handling

## 📡 **API Integration Examples**

### **Authentication**

```typescript
import { register, login, logout, getProfile } from '../api';

// Register a new user
const handleRegister = async (userData) => {
  try {
    const response = await register({
      email: 'user@example.com',
      username: 'username',
      password: 'password123',
      password_confirmation: 'password123',
      first_name: 'John',
      last_name: 'Doe'
    });
    console.log('Registration successful:', response);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Login
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await login(email, password);
    console.log('Login successful:', response);
    // User is now authenticated
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Get user profile
const handleGetProfile = async () => {
  try {
    const profile = await getProfile();
    console.log('User profile:', profile);
  } catch (error) {
    console.error('Failed to get profile:', error);
  }
};
```

### **Products**

```typescript
import { productsApi, categoriesApi } from '../api';

// Get all products
const getProducts = async () => {
  try {
    const products = await productsApi.getAll();
    console.log('Products:', products);
  } catch (error) {
    console.error('Failed to get products:', error);
  }
};

// Get products by category
const getProductsByCategory = async (categoryId: number) => {
  try {
    const products = await productsApi.getAll({ category_id: categoryId });
    console.log('Products by category:', products);
  } catch (error) {
    console.error('Failed to get products by category:', error);
  }
};

// Get single product
const getProduct = async (id: number) => {
  try {
    const product = await productsApi.getById(id);
    console.log('Product:', product);
  } catch (error) {
    console.error('Failed to get product:', error);
  }
};

// Create product (admin only)
const createProduct = async (productData) => {
  try {
    const newProduct = await productsApi.create(productData);
    console.log('Product created:', newProduct);
  } catch (error) {
    console.error('Failed to create product:', error);
  }
};
```

### **Shopping Cart**

```typescript
import { cartApi } from '../api';

// Get user's cart
const getCart = async () => {
  try {
    const cart = await cartApi.getCart();
    console.log('Cart:', cart);
  } catch (error) {
    console.error('Failed to get cart:', error);
  }
};

// Add item to cart
const addToCart = async (productId: number, quantity: number) => {
  try {
    const cartItem = await cartApi.addToCart({
      product_id: productId,
      quantity: quantity
    });
    console.log('Item added to cart:', cartItem);
  } catch (error) {
    console.error('Failed to add to cart:', error);
  }
};

// Update cart item quantity
const updateCartItem = async (itemId: number, quantity: number) => {
  try {
    const updatedItem = await cartApi.updateCartItem(itemId, { quantity });
    console.log('Cart item updated:', updatedItem);
  } catch (error) {
    console.error('Failed to update cart item:', error);
  }
};

// Remove item from cart
const removeFromCart = async (itemId: number) => {
  try {
    await cartApi.removeFromCart(itemId);
    console.log('Item removed from cart');
  } catch (error) {
    console.error('Failed to remove from cart:', error);
  }
};
```

### **Orders**

```typescript
import { ordersApi } from '../api';

// Get user's orders
const getMyOrders = async () => {
  try {
    const orders = await ordersApi.getMyOrders();
    console.log('My orders:', orders);
  } catch (error) {
    console.error('Failed to get orders:', error);
  }
};

// Create order from cart
const createOrder = async (addressId: number) => {
  try {
    const order = await ordersApi.create({ address_id: addressId });
    console.log('Order created:', order);
  } catch (error) {
    console.error('Failed to create order:', error);
  }
};

// Get single order
const getOrder = async (orderId: number) => {
  try {
    const order = await ordersApi.getById(orderId);
    console.log('Order:', order);
  } catch (error) {
    console.error('Failed to get order:', error);
  }
};
```

### **Notifications**

```typescript
import { notificationsApi } from '../api';

// Get all notifications
const getNotifications = async () => {
  try {
    const notifications = await notificationsApi.getAll();
    console.log('Notifications:', notifications);
  } catch (error) {
    console.error('Failed to get notifications:', error);
  }
};

// Mark notification as read
const markAsRead = async (notificationId: number) => {
  try {
    await notificationsApi.markAsRead(notificationId);
    console.log('Notification marked as read');
  } catch (error) {
    console.error('Failed to mark as read:', error);
  }
};

// Get unread count
const getUnreadCount = async () => {
  try {
    const count = await notificationsApi.getUnreadCount();
    console.log('Unread notifications:', count);
  } catch (error) {
    console.error('Failed to get unread count:', error);
  }
};
```

## 🧪 **Testing the Integration**

### **1. Test Backend Health**
```bash
curl http://localhost:8000/up/
# Should return: OK
```

### **2. Test API Endpoints**
```bash
# Test registration
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "password_confirmation": "password123",
    "first_name": "Test",
    "last_name": "User"
  }'

# Test login
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### **3. Test Frontend Integration**
```bash
# Start the frontend
cd client
npm run dev
```

## 🔄 **Redux Integration**

If you're using Redux, here's how to integrate the API:

```typescript
// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, getProfile } from '../../api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login(email, password);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any) => {
    const response = await register(userData);
    return response;
  }
);

export const fetchProfile = createAsyncThunk(
  'auth/profile',
  async () => {
    const response = await getProfile();
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('jwt'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

## 🚨 **Troubleshooting**

### **CORS Issues**
If you get CORS errors, ensure your Django backend has CORS configured properly.

### **Authentication Issues**
- Check if JWT token is being sent in headers
- Verify token format: `Bearer <token>`
- Check if token is expired

### **API Endpoint Issues**
- Verify the backend is running on port 8000
- Check if the API endpoints match exactly
- Ensure proper HTTP methods are used

### **Database Issues**
- Check if PostgreSQL is running
- Verify database connection in `.env`
- Run migrations if needed

## ✅ **Integration Checklist**

- [ ] Backend is running on http://localhost:8000
- [ ] Frontend environment variables configured
- [ ] API services imported and working
- [ ] Authentication flow tested
- [ ] Products API working
- [ ] Cart functionality working
- [ ] Orders API working
- [ ] Notifications API working
- [ ] Error handling implemented
- [ ] Loading states implemented

**Your frontend is now fully integrated with the Django backend! 🚀** 