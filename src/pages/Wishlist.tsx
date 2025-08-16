import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useWishlist } from '../contexts/WishlistContext';
import { useAddToCart } from '../hooks/useAddToCart';
import type { WishlistItem } from '../api/wishlist';

const Wishlist: React.FC = () => {
  const theme = useTheme();
  const { wishlist, isLoading, removeFromWishlist } = useWishlist();
  const { handleAddToCart: addToCart } = useAddToCart();

  const handleRemoveFromWishlist = async (productId: number) => {
    try {
      await removeFromWishlist(productId);
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const handleAddToCartFromWishlist = async (product: WishlistItem['product']) => {
    await addToCart({
      productId: product.id,
      quantity: 1,
      productTitle: product.title,
    });
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (wishlist.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" py={8}>
          <FavoriteIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" color="text.secondary" gutterBottom>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start adding products to your wishlist to see them here
          </Typography>
          <Button variant="contained" color="primary" href="/">
            Browse Products
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        My Wishlist ({wishlist.length} items)
      </Typography>

      <Grid container spacing={3}>
        {wishlist.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={item.product.image}
                  alt={item.product.title}
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                  }}
                />
                <Chip
                  label={item.product.category.name}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    fontWeight: 600,
                  }}
                />
                {/* Free delivery indicator removed as it's not available in backend */}
              </Box>

              <CardContent sx={{ flexGrow: 1, pb: 0 }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  gutterBottom
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: 48,
                  }}
                >
                  {item.product.title}
                </Typography>

                {item.product.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      mb: 1.5,
                    }}
                  >
                    {item.product.description}
                  </Typography>
                )}

                {/* Rating and review count removed as they're not available in backend */}
              </CardContent>

              <CardActions sx={{ mt: 'auto', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="primary" fontWeight={700}>
                  ₹{Number(item.product.price).toFixed(2)}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    onClick={() => handleRemoveFromWishlist(item.product_id)}
                    color="error"
                    size="small"
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>

                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleAddToCartFromWishlist(item.product)}
                    sx={{
                      fontWeight: 600,
                      minWidth: 100,
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishlist;
