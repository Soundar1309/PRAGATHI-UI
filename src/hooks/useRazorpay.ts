/**
 * Custom hook for Razorpay payment integration
 */

import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { createRazorpayOrder, verifyPayment } from '../api/payments';
import type { RazorpayOptions, RazorpayResponse, CreateOrderRequest } from '../types/razorpay';

interface UseRazorpayOptions {
  onSuccess?: (response: RazorpayResponse) => void;
  onError?: (error: string) => void;
  onDismiss?: () => void;
}

export const useRazorpay = (options: UseRazorpayOptions = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        if (window.Razorpay) {
          setIsScriptLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setIsScriptLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          reject(new Error('Failed to load Razorpay script'));
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript().catch((error) => {
      console.error('Error loading Razorpay script:', error);
      enqueueSnackbar('Failed to load payment gateway', { variant: 'error' });
    });
  }, [enqueueSnackbar]);

  const openRazorpay = useCallback(async (orderData: CreateOrderRequest, userInfo?: { name?: string; email?: string; contact?: string }) => {
    if (!isScriptLoaded) {
      enqueueSnackbar('Payment gateway is still loading, please try again', { variant: 'warning' });
      return;
    }

    setIsLoading(true);

    try {
      // Check if user is authenticated
      const token = localStorage.getItem('jwt');
      if (!token) {
        enqueueSnackbar('Please log in to proceed with payment', { variant: 'error' });
        options.onError?.('Authentication required');
        return;
      }

      // Create order on backend
      const orderResponse = await createRazorpayOrder(orderData);

      // Razorpay configuration
      const razorpayOptions: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'Pragathi Naturals',
        description: 'Payment for your order',
        order_id: orderResponse.order_id,
        prefill: {
          name: userInfo?.name || '',
          email: userInfo?.email || '',
          contact: userInfo?.contact || '',
        },
        theme: {
          color: '#4CAF50', // Green theme to match the brand
        },
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment on backend
            const verificationResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.success) {
              enqueueSnackbar('Payment successful!', { variant: 'success' });
              options.onSuccess?.(response);
            } else {
              enqueueSnackbar('Payment verification failed', { variant: 'error' });
              options.onError?.('Payment verification failed');
            }
          } catch (error: any) {
            enqueueSnackbar('Payment verification failed', { variant: 'error' });
            options.onError?.(error.message);
          }
        },
        modal: {
          ondismiss: () => {
            enqueueSnackbar('Payment cancelled', { variant: 'info' });
            options.onDismiss?.();
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();

    } catch (error: any) {
      console.error('Payment error:', error);
      
      // Handle authentication errors specifically
      if (error.response?.status === 401) {
        enqueueSnackbar('Your session has expired. Please log in again.', { variant: 'error' });
        localStorage.removeItem('jwt');
        // Redirect to login page
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        enqueueSnackbar('You do not have permission to make payments.', { variant: 'error' });
      } else {
        enqueueSnackbar(error.message || 'Failed to initiate payment', { variant: 'error' });
      }
      
      options.onError?.(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [isScriptLoaded, enqueueSnackbar, options]);

  return {
    openRazorpay,
    isLoading,
    isScriptLoaded,
  };
};
