import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { formatVariationDisplayName } from '../../utils/formatters';
import { useSnackbar } from 'notistack';
import { useAddItemMutation } from '../cart/api';
import type { ProductVariation } from '../../api/products';

interface ProductVariationsDisplayProps {
  variations: ProductVariation[];
  productTitle: string;
  onAddToCart?: (variation: ProductVariation) => void;
}

export function ProductVariationsDisplay({ variations, productTitle, onAddToCart }: ProductVariationsDisplayProps) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [addItem, { isLoading: isAddingToCart }] = useAddItemMutation();
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleVariationClick = (variation: ProductVariation) => {
    setSelectedVariation(variation);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedVariation(null);
  };

  const handleAddToCart = async () => {
    if (!selectedVariation) return;

    try {
      await addItem({
        product_variation_id: selectedVariation.id,
        quantity: 1,
      }).unwrap();
      
      enqueueSnackbar(`${formatVariationDisplayName(selectedVariation?.display_name || '')} added to cart!`, { variant: 'success' });
      
      // Call the optional callback if provided
      if (onAddToCart) {
        onAddToCart(selectedVariation);
      }
      
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to add variation to cart:', error);
      enqueueSnackbar('Failed to add item to cart', { variant: 'error' });
    }
  };

  if (!variations || variations.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.primary.main }}>
        Available Sizes
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {variations.map((variation) => (
          <Box key={variation.id} sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card
              sx={{
                cursor: 'pointer',
                border: '1px solid',
                borderColor: theme.palette.divider,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: theme.shadows[4],
                  borderColor: theme.palette.primary.main,
                  transform: 'translateY(-2px)',
                },
              }}
              onClick={() => handleVariationClick(variation)}
            >
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {formatVariationDisplayName(variation.display_name || '')}
                </Typography>
                
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    ₹{variation.price}
                  </Typography>
                  {variation.has_offer && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textDecoration: 'line-through', 
                        color: 'text.secondary',
                        ml: 1 
                      }}
                    >
                      ₹{variation.original_price}
                    </Typography>
                  )}
                </Stack>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip
                    label={`Stock: ${variation.stock}`}
                    size="small"
                    color={variation.available ? 'success' : 'error'}
                    variant="outlined"
                  />
                  {variation.has_offer && (
                    <Chip
                      label={`${variation.discount_percentage}% OFF`}
                      size="small"
                      color="success"
                      variant="filled"
                    />
                  )}
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddIcon />}
                  disabled={!variation.available || isAddingToCart}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVariationClick(variation);
                  }}
                >
                  {isAddingToCart ? 'Adding...' : variation.available ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Variation Selection Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {productTitle} - {selectedVariation?.display_name ? formatVariationDisplayName(selectedVariation.display_name) : ''}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          {selectedVariation && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                  ₹{selectedVariation.price}
                </Typography>
                {selectedVariation.has_offer && (
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      textDecoration: 'line-through', 
                      color: 'text.secondary',
                      mb: 1 
                    }}
                  >
                    Original Price: ₹{selectedVariation.original_price}
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                <Chip
                  label={`Stock: ${selectedVariation.stock}`}
                  color={selectedVariation.available ? 'success' : 'error'}
                  variant="outlined"
                />
                {selectedVariation.has_offer && (
                  <Chip
                    label={`${selectedVariation.discount_percentage}% OFF`}
                    color="success"
                    variant="filled"
                  />
                )}
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                Quantity: {selectedVariation.quantity} {selectedVariation.unit}
              </Typography>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            disabled={!selectedVariation?.available || isAddingToCart}
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
