import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAddItemMutation } from '../cart/api';
import { useGetProductWithVariationsQuery } from './api';
import ProductImage from '../../components/ProductImage';
import type { ProductVariation } from '../../api/products';
import { formatVariationDisplayName } from '../../utils/formatters';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductWithVariationsQuery(Number(id));
  const theme = useTheme();
  const [addItem, { isLoading: isAdding }] = useAddItemMutation();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedVariation, setSelectedVariation] = React.useState<ProductVariation | null>(null);

  // Initialize selected variation with default variation or first available variation
  React.useEffect(() => {
    if (product?.variations && product.variations.length > 0 && !selectedVariation) {
      // Find default variation (250g for solid, 250ml for liquid)
      let defaultVar = null;
      if (product.product_type === 'solid') {
        defaultVar = product.variations.find((v: ProductVariation) => v.quantity === 250 && v.unit === 'g');
      } else if (product.product_type === 'liquid') {
        defaultVar = product.variations.find((v: ProductVariation) => v.quantity === 250 && v.unit === 'ml');
      }
      
      // If no default variation found, use the first available one
      if (!defaultVar) {
        defaultVar = product.variations.find((v: ProductVariation) => v.is_active && v.available) || product.variations[0];
      }
      
      setSelectedVariation(defaultVar);
    }
  }, [product, selectedVariation]);

  if (isLoading) return <Typography textAlign="center">Loading...</Typography>;
  if (!product) return <Typography textAlign="center">Product not found</Typography>;

  const handleAddToCart = async () => {
    try {
      if (selectedVariation) {
        await addItem({ 
          product_variation_id: selectedVariation.id,
          quantity 
        }).unwrap();
      } else {
        await addItem({ product_id: product.id, quantity }).unwrap();
      }
      setSnackbarOpen(true);
    } catch (e) {
      alert('Failed to add to cart.');
    }
  };

  // Determine pricing display - use selected variation if available
  const currentVariation = selectedVariation;
  const displayPrice = currentVariation ? Number(currentVariation.price) : Number(product.price);
  const originalPrice = currentVariation ? currentVariation.original_price : product.original_price;
  const hasOffer = currentVariation ? currentVariation.has_offer : (originalPrice && originalPrice > displayPrice);
  const showOriginalPrice = currentVariation ? currentVariation.has_offer : (originalPrice && originalPrice !== displayPrice);

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 1, sm: 2, md: 4 }, py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3], p: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <ProductImage
                src={product.image}
                alt={product.title}
                variant="detail"
                sx={{ borderRadius: 2, background: theme.palette.background.paper }}
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
                  label={`${currentVariation?.discount_percentage || Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% OFF`}
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
                    py: 1,
                    boxShadow: theme.shadows[1],
                    gap: 1,
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
                {product.title}{currentVariation?.display_name && ` - ${formatVariationDisplayName(currentVariation.display_name)}`}
              </Typography>
              
              {/* Pricing Display */}
              <Box sx={{ mb: 2 }}>
                {showOriginalPrice ? (
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
                      label={`${currentVariation?.discount_percentage || Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% OFF`}
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
              
              {/* Quantity/Price Selector */}
              {product.variations && product.variations.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
                    Select Size & Quantity
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select
                      value={selectedVariation?.id || ''}
                      onChange={(e) => {
                        const variationId = e.target.value;
                        const variation = product.variations.find((v: ProductVariation) => v.id === variationId);
                        setSelectedVariation(variation || null);
                      }}
                      displayEmpty
                      sx={{
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      {product.variations.map((variation: ProductVariation) => (
                        <MenuItem key={variation.id} value={variation.id}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="body1" fontWeight={600}>
                                {formatVariationDisplayName(variation.display_name || '')}
                              </Typography>
                              {variation.has_offer && (
                                <Typography variant="caption" color="text.secondary">
                                  {variation.discount_percentage}% OFF
                                </Typography>
                              )}
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="body1" color="primary" fontWeight={700}>
                                ₹{variation.price}
                              </Typography>
                              {variation.has_offer && (
                                <Typography variant="caption" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                                  ₹{variation.original_price}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  <Divider sx={{ my: 2 }} />
                </Box>
              )}
              
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
                  disabled={isAdding || (currentVariation ? !currentVariation.available : false)}
                >
                  {isAdding ? 'Adding...' : currentVariation && !currentVariation.available ? 'Out of Stock' : 'Add to Cart'}
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
