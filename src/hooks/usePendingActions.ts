import { useNavigate } from 'react-router-dom';
import { useAddItemMutation } from '../features/cart/api';
import { useSnackbar } from 'notistack';

export const usePendingActions = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [addItem] = useAddItemMutation();

  const executePendingAction = async () => {
    const pendingActionStr = localStorage.getItem('pendingAction');
    
    if (!pendingActionStr) return;

    try {
      const pendingAction = JSON.parse(pendingActionStr);
      const now = Date.now();
      const actionAge = now - pendingAction.timestamp;
      
      // Clear pending action immediately to prevent double execution
      localStorage.removeItem('pendingAction');
      
      // Check if action is still valid (within 1 hour)
      if (actionAge > 3600000) { // 1 hour in milliseconds
        enqueueSnackbar('Your previous action has expired. Please try again.', { 
          variant: 'warning',
          autoHideDuration: 4000,
        });
        return;
      }

      if (pendingAction.type === 'ADD_TO_CART') {
        await addItem({ 
          product_id: pendingAction.productId, 
          quantity: pendingAction.quantity 
        }).unwrap();
        
        enqueueSnackbar('Item added to cart successfully!', { 
          variant: 'success',
          autoHideDuration: 3000,
        });
        
        // Redirect to cart page
        navigate('/cart');
      }
      
    } catch (error: any) {
      console.error('Error executing pending action:', error);
      
      let errorMessage = 'Failed to complete your previous action';
      
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.error) {
        errorMessage = error.error;
      }
      
      enqueueSnackbar(errorMessage, { 
        variant: 'error',
        autoHideDuration: 4000,
      });
    }
  };

  return { executePendingAction };
}; 