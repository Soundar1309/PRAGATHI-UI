import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAddItemMutation } from '../cart/api';
import { useGetProductQuery } from './api';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductQuery(Number(id));
  const theme = useTheme();
  const [addItem, { isLoading: isAdding }] = useAddItemMutation();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);

  if (isLoading) return <Typography textAlign="center">Loading...</Typography>;
  if (!product) return <Typography textAlign="center">Product not found</Typography>;

  const handleAddToCart = async () => {
    try {
      await addItem({ product_id: product.id, quantity }).unwrap();
      setSnackbarOpen(true);
    } catch (e) {
      alert('Failed to add to cart.');
    }
  };

  // Determine pricing display
  const displayPrice = product.price; // Always show the price field
  const originalPrice = product.original_price || 10000; // Use original_price or default
  const hasOffer = originalPrice > displayPrice; // Show offer if original price is higher than current price

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 1, sm: 2, md: 4 }, py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3], p: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ height: 340, objectFit: 'cover', borderRadius: 2, background: theme.palette.background.paper }}
              />
              <Chip
                label={product.category?.name || product.category || ''}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  bgcolor: theme.palette.primary.main,
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 1,
                  boxShadow: theme.shadows[1],
                  fontFamily: 'Inter, sans-serif',
                }}
              />
              {hasOffer && (
                <Chip
                  label={`${Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% OFF`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: theme.palette.error.main,
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: 1,
                    boxShadow: theme.shadows[1],
                    fontFamily: 'Inter, sans-serif',
                  }}
                />
              )}
              {product.free_delivery && (
                <Tooltip title="Free Delivery">
                  <Box sx={{
                    position: 'absolute',
                    top: hasOffer ? 48 : 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    boxShadow: theme.shadows[1],
                    gap: 0.5,
                  }}>
                    <LocalShippingIcon color="success" fontSize="small" />
                    <Typography variant="caption" color="success.main" fontWeight={600}>
                      Free Delivery
                    </Typography>
                  </Box>
                </Tooltip>
              )}
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3], p: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="h4" fontWeight={700} gutterBottom color="primary" sx={{ fontFamily: 'Playfair Display, serif' }}>
                {product.title}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Rating value={product.rating || 0} precision={0.1} size="medium" readOnly sx={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>
                  {product.rating?.toFixed(1) || '0.0'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>
                  ({product.review_count || 0} reviews)
                </Typography>
              </Stack>
              
              {/* Pricing Display */}
              <Box sx={{ mb: 2 }}>
                {hasOffer ? (
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography 
                      variant="h4" 
                      color="primary" 
                      fontWeight={700} 
                      sx={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      ₹{Number(displayPrice).toFixed(2)}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      color="text.secondary" 
                      sx={{ 
                        textDecoration: 'line-through',
                        opacity: 0.7,
                        fontFamily: 'Inter, sans-serif' 
                      }}
                    >
                      ₹{Number(originalPrice).toFixed(2)}
                    </Typography>
                    <Chip
                      label={`${Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% OFF`}
                      size="small"
                      color="error"
                      sx={{
                        fontWeight: 600,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    />
                  </Stack>
                ) : (
                  <Typography 
                    variant="h4" 
                    color="primary" 
                    fontWeight={700} 
                    sx={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    ₹{Number(displayPrice).toFixed(2)}
                  </Typography>
                )}
              </Box>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                {product.description}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="Quantity"
                  type="number"
                  size="small"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                  inputProps={{ min: 1, style: { width: 60 } }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ fontWeight: 700, borderRadius: 1, boxShadow: 'none', fontFamily: 'Inter, sans-serif' }}
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </Button>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Inter, sans-serif' }}>
                Category: {product.category?.name || product.category || ''}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className="tamil-motif" style={{ margin: '2rem auto 0 auto' }} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Added to cart!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}
