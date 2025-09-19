import React, { useState } from 'react';
import { IconButton, Tooltip, Snackbar, Alert, Portal } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWishlist } from '../hooks/useWishlist';

interface WishlistButtonProps {
  productId: number;
  size?: 'small' | 'medium' | 'large';
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  size = 'medium'
}) => {
  const { wishlist, isInWishlist, addToWishlist, removeFromWishlist, error, clearError } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleWishlistToggle = async (event: React.MouseEvent) => {
    // Prevent the click from bubbling up to parent click handlers
    event.stopPropagation();

    try {
      setIsLoading(true);
      clearError(); // Clear any previous errors

      console.log('Current wishlist state:', wishlist);
      console.log('Is product in wishlist before toggle:', isInWishlist(productId));

      if (isInWishlist(productId)) {
        console.log('Removing product from wishlist:', productId);
        await removeFromWishlist(productId);
        console.log('Product removed from wishlist');
        setSnackbar({
          open: true,
          message: 'Removed from wishlist',
          severity: 'success'
        });
      } else {
        console.log('Adding product to wishlist:', productId);
        await addToWishlist(productId);
        console.log('Product added to wishlist');
        setSnackbar({
          open: true,
          message: 'Added to wishlist',
          severity: 'success'
        });
      }

      // Log the updated state after operation
      console.log('Wishlist state after operation:', wishlist);
      console.log('Is product in wishlist after toggle:', isInWishlist(productId));

    } catch (error: unknown) {
      console.error('Wishlist operation failed:', error);

      let errorMessage = 'Failed to update wishlist';
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (axiosError.message) {
        errorMessage = axiosError.message;
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const isWishlisted = isInWishlist(productId);

  // Show error from context if exists
  React.useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: 'error'
      });
      clearError();
    }
  }, [error, clearError]);

  return (
    <>
      <Tooltip title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
        <IconButton
          onClick={handleWishlistToggle}
          disabled={isLoading}
          size={size}
          sx={{
            color: isWishlisted ? 'error.main' : 'text.secondary',
            '&:hover': {
              color: isWishlisted ? 'error.dark' : 'error.main',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>

      <Portal>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            position: 'fixed !important',
            bottom: '16px !important',
            right: '16px !important',
            zIndex: 9999,
            '& .MuiSnackbar-root': {
              position: 'fixed !important',
              bottom: '16px !important',
              right: '16px !important',
            }
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ 
              width: '100%',
              minWidth: 300,
              maxWidth: 400,
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Portal>
    </>
  );
};

export default WishlistButton;
