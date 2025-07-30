import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  useTheme,
  Rating,
  Stack,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import type { SxProps } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useAddToCart } from '../hooks/useAddToCart';

export interface Product {
  id: number;
  title: string;
  description?: string;
  image: string;
  price: number;
  category: string;
  rating?: number;
  reviewCount?: number;
  freeDelivery?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAuthRequired?: (message?: string) => void;
}

const ELLIPSIS_SX: SxProps = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const MULTILINE_ELLIPSIS_SX: SxProps = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2, // Change to 1 for single line, 2 for two lines, etc.
  WebkitBoxOrient: 'vertical',
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const theme = useTheme();
  const { handleAddToCart, isLoading } = useAddToCart();

  const handleAddToCartClick = async (event: React.MouseEvent) => {
    // Prevent the click from bubbling up to the parent container
    event.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      await handleAddToCart({
        productId: product.id,
        quantity: 1,
        productTitle: product.title,
      });
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 370, // Set a fixed height for all cards
        minWidth: 260,
        maxWidth: 320,
        borderRadius: 1.5,
        boxShadow: theme.shadows[3],
        background: theme.palette.background.paper,
        p: 1,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            height: 180,
            objectFit: 'cover',
            borderRadius: 1,
            background: '#F7F7F2',
          }}
        />
        <Chip
          label={product.category}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: theme.palette.primary.main,
            color: '#fff',
            fontWeight: 600,
            borderRadius: 1,
            boxShadow: theme.shadows[1],
            maxWidth: 120, // Limit width for badge
            ...ELLIPSIS_SX,
          }}
        />
        {product.freeDelivery && (
          <Tooltip title="Free Delivery">
            <Box sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#fff',
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
      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          color="text.primary"
          sx={{ minHeight: 48, ...MULTILINE_ELLIPSIS_SX, WebkitLineClamp: 2 }}
        >
          {product.title}
        </Typography>
        {product.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: 36, ...MULTILINE_ELLIPSIS_SX, WebkitLineClamp: 2 }}
          >
            {product.description}
          </Typography>
        )}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, mb: 0.5 }}>
          <Rating value={product.rating || 0} precision={0.1} size="small" readOnly sx={{ color: theme.palette.primary.main }} />
          <Typography variant="caption" color="text.secondary">
            {product.rating?.toFixed(1) || '0.0'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ({product.reviewCount || 0} reviews)
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ mt: 'auto', justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Typography variant="h6" color="primary" fontWeight={700}>
          ₹{Number(product.price).toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            fontWeight: 700,
            borderRadius: 1,
            boxShadow: 'none',
            minWidth: 120,
            position: 'relative',
          }}
          onClick={handleAddToCartClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CircularProgress size={16} sx={{ mr: 1, color: 'white' }} />
              Adding...
            </>
          ) : (
            'Add to Cart'
          )}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard; 