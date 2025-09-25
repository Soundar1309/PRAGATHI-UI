/**
 * Payment API functions for Razorpay integration
 */

import axios from 'axios';
import type { 
  CreateOrderRequest, 
  CreateOrderResponse, 
  VerifyPaymentRequest, 
  VerifyPaymentResponse 
} from '../types/razorpay';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with auth token
const createApiInstance = () => {
  const token = localStorage.getItem('jwt'); // Fixed: use 'jwt' instead of 'access_token'
  
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

/**
 * Create a Razorpay order
 */
export const createRazorpayOrder = async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
  try {
    const api = createApiInstance();
    const response = await api.post('/payments/create-order/', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to create order');
  }
};

/**
 * Verify Razorpay payment
 */
export const verifyPayment = async (data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> => {
  try {
    const api = createApiInstance();
    const response = await api.post('/payments/verify-payment/', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Payment verification failed');
  }
};

/**
 * Get payment details by ID
 */
export const getPaymentDetails = async (paymentId: number) => {
  try {
    const api = createApiInstance();
    const response = await api.get(`/payments/details/${paymentId}/`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch payment details');
  }
};

/**
 * Get user's payment history
 */
export const getUserPayments = async () => {
  try {
    const api = createApiInstance();
    const response = await api.get('/payments/user-payments/');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch payment history');
  }
};
