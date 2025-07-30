import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddItemMutation } from '../features/cart/api';
import { useSnackbar } from 'notistack';

interface AddToCartParams {
  productId: number;
  quantity?: number;
  productTitle?: string;
}

export const useAddToCart = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [addItem, { isLoading }] = useAddItemMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddToCart = async ({ productId, quantity = 1, productTitle = 'Product' }: AddToCartParams) => {
    setIsProcessing(true);

    try {
      // Check if user is authenticated
      const token = localStorage.getItem('jwt');
      
      if (!token) {
        // User is not authenticated - save intended action and redirect to login
        const pendingAction = {
          type: 'ADD_TO_CART',
          productId,
          quantity,
          timestamp: Date.now(),
        };
        localStorage.setItem('pendingAction', JSON.stringify(pendingAction));
        
        enqueueSnackbar('Please log in to add items to your cart', { 
          variant: 'info',
          autoHideDuration: 3000,
        });
        
        navigate('/login');
        return;
      }

      // User is authenticated - add to cart immediately
      await addItem({ product_id: productId, quantity }).unwrap();
      
      enqueueSnackbar(`${productTitle} added to cart successfully!`, { 
        variant: 'success',
        autoHideDuration: 3000,
      });
      
      // Redirect to cart page
      navigate('/cart');
      
    } catch (error: any) {
      console.error('Add to cart error:', error);
      
      let errorMessage = 'Failed to add item to cart';
      
      if (error?.status === 401) {
        // Token expired or invalid - redirect to login
        localStorage.removeItem('jwt');
        const pendingAction = {
          type: 'ADD_TO_CART',
          productId,
          quantity,
          timestamp: Date.now(),
        };
        localStorage.setItem('pendingAction', JSON.stringify(pendingAction));
        
        enqueueSnackbar('Session expired. Please log in again.', { 
          variant: 'warning',
          autoHideDuration: 4000,
        });
        
        navigate('/login');
        return;
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.error) {
        errorMessage = error.error;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      enqueueSnackbar(errorMessage, { 
        variant: 'error',
        autoHideDuration: 4000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleAddToCart,
    isLoading: isLoading || isProcessing,
  };
}; 