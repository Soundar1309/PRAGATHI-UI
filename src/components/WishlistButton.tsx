import React, { useState } from 'react';
import { IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useWishlist } from '../contexts/WishlistContext';

interface WishlistButtonProps {
  productId: number;
  size?: 'small' | 'medium' | 'large';
  onAuthRequired?: () => void;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  productId, 
  size = 'medium',
  onAuthRequired 
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
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
    
    // Check if user is authenticated
    const token = localStorage.getItem('jwt');
    if (!token) {
      if (onAuthRequired) {
        onAuthRequired();
      }
      return;
    }

    try {
      setIsLoading(true);
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId);
        setSnackbar({
          open: true,
          message: 'Removed from wishlist',
          severity: 'success'
        });
      } else {
        await addToWishlist(productId);
        setSnackbar({
          open: true,
          message: 'Added to wishlist',
          severity: 'success'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update wishlist',
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default WishlistButton;
