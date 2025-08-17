import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAddItemMutation } from '../features/cart/api';

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
    console.log('handleAddToCart called with:', { productId, quantity, productTitle });
    setIsProcessing(true);

    try {
      console.log('Calling addItem mutation...');
      // Add to cart immediately (no authentication required)
      const result = await addItem({ product_id: productId, quantity }).unwrap();
      console.log('Add to cart successful:', result);
      
      enqueueSnackbar(`${productTitle} added to cart successfully!`, { 
        variant: 'success',
        autoHideDuration: 3000,
      });
      
      // Redirect to cart page
      navigate('/cart');
      
    } catch (error: any) {
      console.error('Add to cart error:', error);
      console.error('Error details:', {
        status: error?.status,
        data: error?.data,
        message: error?.message,
        error: error?.error
      });
      
      let errorMessage = 'Failed to add item to cart';
      
      if (error?.data?.message) {
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