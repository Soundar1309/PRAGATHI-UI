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
  Divider,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAddItemMutation } from '../cart/api';
import { useGetProductWithVariationsQuery } from './api';
import ProductImage from '../../components/ProductImage';
import type { ProductVariation } from '../../api/products';
import { formatPrice } from '../../utils/formatters';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductWithVariationsQuery(Number(id));
  const theme = useTheme();
  const [addItem, { isLoading: isAdding }] = useAddItemMutation();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [quantityInput, setQuantityInput] = React.useState('1');
  const [selectedVariation, setSelectedVariation] = React.useState<ProductVariation | null>(null);
  const [selectedProductId, setSelectedProductId] = React.useState<number | null>(null);

  // Helper function to format quantity without unnecessary decimal places
  const formatQuantity = (qty: number | string): string => {
    const num = Number(qty);
    return num % 1 === 0 ? Math.floor(num).toString() : num.toString();
  };

  // Handle quantity input changes
  const handleQuantityChange = (value: string) => {
    setQuantityInput(value);
    
    // Only update the actual quantity if it's a valid number >= 1
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 1) {
      setQuantity(numValue);
    }
  };

  // Handle quantity input blur - ensure minimum value
  const handleQuantityBlur = () => {
    const numValue = Number(quantityInput);
    if (isNaN(numValue) || numValue < 1) {
      setQuantityInput('1');
      setQuantity(1);
    } else {
      setQuantityInput(numValue.toString());
      setQuantity(numValue);
    }
  };

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Initialize selection with default variation or base product
  React.useEffect(() => {
    if (product && !selectedVariation && selectedProductId === null) {
      if (product.variations && product.variations.length > 0) {
        // Find default variation (250g for solid, 250ml for liquid)
        let defaultVar = null;
        if (product.product_type === 'solid') {
          defaultVar = product.variations.find((v: ProductVariation) => v.quantity === 250 && v.unit === 'g');
        } else if (product.product_type === 'liquid') {
          defaultVar = product.variations.find((v: ProductVariation) => v.quantity === 250 && v.unit === 'ml');
        }
        
        // If no default variation found, use the first available one
        if (!defaultVar) {
          defaultVar = product.variations.find((v: ProductVariation) => v.available) || product.variations[0];
        }
        
        // Only set as selected if the product is in stock and variation is available
        if (defaultVar && product.is_in_stock && defaultVar.available) {
          setSelectedVariation(defaultVar);
        } else {
          // If no available variations or product is out of stock, fall back to base product if available
          if (product.is_in_stock && product.stock > 0) {
            setSelectedProductId(product.id);
          }
        }
      } else {
        // If no variations, select base product
        setSelectedProductId(product.id);
      }
    }
  }, [product, selectedVariation, selectedProductId]);

  if (isLoading) return <Typography textAlign="center">Loading...</Typography>;
  if (!product) return <Typography textAlign="center">Product not found</Typography>;

  const handleAddToCart = async () => {
    try {
      if (selectedVariation) {
        await addItem({ 
          product_variation_id: selectedVariation.id,
          quantity 
        }).unwrap();
      } else if (selectedProductId) {
        await addItem({ product_id: selectedProductId, quantity }).unwrap();
      } else {
        await addItem({ product_id: product.id, quantity }).unwrap();
      }
      setSnackbarOpen(true);
    } catch (e) {
      alert('Failed to add to cart.');
    }
  };

  // Determine pricing display - use selected variation or base product
  const currentSelection = selectedVariation ? selectedVariation : (selectedProductId ? product : null);
  const displayPrice = currentSelection ? Number(currentSelection.price) : Number(product.price);
  const originalPrice = currentSelection ? currentSelection.original_price : product.original_price;
  const hasOffer = currentSelection ? (currentSelection as ProductVariation).has_offer || (originalPrice && originalPrice > displayPrice) : (originalPrice && originalPrice > displayPrice);
  const showOriginalPrice = currentSelection ? 
    ((currentSelection as ProductVariation).has_offer || (originalPrice && originalPrice !== displayPrice)) : 
    (originalPrice && originalPrice !== displayPrice);

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
                  label={`${selectedVariation?.discount_percentage || (product.has_offer ? product.discount_percentage : Math.round(((originalPrice - displayPrice) / originalPrice) * 100))}% OFF`}
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
                {product.title}{selectedVariation && ` - ${formatQuantity(selectedVariation.quantity)} ${selectedVariation.unit}`}{selectedProductId && !selectedVariation && ` - ${product.unit}`}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                {product.description}
              </Typography>
              
              {/* Quantity/Price Selector - Buttons */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
                  Select Quantity
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {/* Base product button with disabled tooltip */}
                  <Tooltip
                    title={!(product.is_in_stock && product.stock > 0) ? 'Out of Stock' : ''}
                    disableHoverListener={product.is_in_stock && product.stock > 0}
                  >
                    <span>
                      <Button
                        size="small"
                        variant={!selectedVariation && selectedProductId ? 'contained' : 'outlined'}
                        onClick={() => { setSelectedProductId(product.id); setSelectedVariation(null); }}
                        disabled={!(product.is_in_stock && product.stock > 0)}
                      >
                        {product.unit}
                      </Button>
                    </span>
                  </Tooltip>
                  {/* Variation buttons */}
                  {product.variations && product.variations.map((variation: ProductVariation) => {
                    const isVariationDisabled = !product.is_in_stock || !variation.available;
                    return (
                      <Tooltip
                        key={variation.id}
                        title={isVariationDisabled ? 'Out of Stock' : ''}
                        disableHoverListener={!isVariationDisabled}
                      >
                        <span>
                          <Button
                            size="small"
                            variant={selectedVariation?.id === variation.id ? 'contained' : 'outlined'}
                            onClick={() => { setSelectedVariation(variation); setSelectedProductId(null); }}
                            disabled={isVariationDisabled}
                          >
                            {formatQuantity(variation.quantity)} {variation.unit}
                          </Button>
                        </span>
                      </Tooltip>
                    );
                  })}
                </Stack>

                {/* Details panel below buttons */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1.5,
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Left: Offer price above original price */}
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h5"
                      color="primary"
                      fontWeight={700}
                      sx={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.2 }}
                    >
                      ₹{formatPrice(displayPrice)}
                    </Typography>
                    {showOriginalPrice && (
                      <Typography
                        variant="h6"
                        sx={{ textDecoration: 'line-through', color: theme.palette.error.main, fontFamily: 'Inter, sans-serif' }}
                      >
                        ₹{formatPrice(originalPrice)}
                      </Typography>
                    )}
                  </Box>

                  {/* Right: Discount and stock chips */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto', flexWrap: 'wrap' }}>
                    {showOriginalPrice && (
                      <Chip
                        label={`${selectedVariation?.discount_percentage || (product.has_offer ? product.discount_percentage : Math.round(((originalPrice - displayPrice) / originalPrice) * 100))}% OFF`}
                        size="small"
                        color="error"
                        sx={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                      />
                    )}
                    <Chip
                      label={(selectedVariation ? (product.is_in_stock && selectedVariation.available) : (product.is_in_stock && product.stock > 0)) ? 'In Stock' : 'Out of Stock'}
                      size="small"
                      color={(selectedVariation ? (product.is_in_stock && selectedVariation.available) : (product.is_in_stock && product.stock > 0)) ? 'success' : 'error'}
                      variant="outlined"
                      sx={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
              </Box>
              
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <TextField
                  label="Quantity"
                  type="number"
                  size="small"
                  value={quantityInput}
                  onChange={e => handleQuantityChange(e.target.value)}
                  onBlur={handleQuantityBlur}
                  onFocus={(e) => {
                    // Select all text when focused to make it easier to type new value
                    e.target.select();
                  }}
                  inputProps={{ min: 1, style: { width: 60 } }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ fontWeight: 700, borderRadius: 1, boxShadow: 'none', fontFamily: 'Inter, sans-serif' }}
                  onClick={handleAddToCart}
                  disabled={isAdding || (selectedVariation ? !(product.is_in_stock && selectedVariation.available) : selectedProductId ? !(product.is_in_stock && product.stock > 0) : false)}
                >
                  {isAdding ? 'Adding...' : 
                   (selectedVariation && !(product.is_in_stock && selectedVariation.available)) || 
                   (selectedProductId && !(product.is_in_stock && product.stock > 0)) ? 'Out of Stock' : 'Add to Cart'}
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
