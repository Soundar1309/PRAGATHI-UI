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
import WishlistButton from './WishlistButton';

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
  WebkitLineClamp: 2,
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
        // Responsive height and sizing
        height: {
          xs: 'auto', // Auto height on mobile for better content flow
          sm: 380,    // Fixed height on small tablets and up
          md: 400,    // Slightly larger on medium screens
        },
        minHeight: { xs: 320, sm: 380, md: 400 }, // Ensure minimum height on mobile
        // Responsive width
        width: '100%',
        maxWidth: { xs: '100%', sm: 280, md: 300, lg: 320 },
        minWidth: { xs: '100%', sm: 260 },
        // Responsive border radius
        borderRadius: { xs: 2, sm: 3, md: 3 },
        boxShadow: theme.shadows[3],
        background: theme.palette.background.paper,
        // Responsive padding
        p: { xs: 2, sm: 2 },
        // Hover effects with smooth transitions
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: { xs: 'none', sm: 'translateY(-4px)' }, // No hover transform on mobile
          boxShadow: { xs: theme.shadows[3], sm: theme.shadows[8] },
        },
        // Ensure card doesn't break layout on small screens
        overflowWrap: 'break-word',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{
            // Responsive image sizing
            height: { xs: 160, sm: 180, md: 200 },
            objectFit: 'cover',
            borderRadius: { xs: 1, sm: 2 },
            background: '#F7F7F2',
            // Ensure images are responsive
            width: '100%',
            maxWidth: '100%',
          }}
        />
        <Chip
          label={product.category}
          size="small"
          sx={{
            position: 'absolute',
            top: { xs: 8, sm: 12 },
            left: { xs: 8, sm: 12 },
            bgcolor: theme.palette.primary.main,
            color: '#fff',
            fontWeight: 600,
            borderRadius: 1,
            boxShadow: theme.shadows[1],
            // Responsive font size
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            maxWidth: { xs: 100, sm: 120 },
            ...ELLIPSIS_SX,
          }}
        />
        {product.freeDelivery && (
          <Tooltip title="Free Delivery">
            <Box sx={{
              position: 'absolute',
              top: { xs: 8, sm: 12 },
              right: { xs: 8, sm: 12 },
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#fff',
              borderRadius: 1,
              px: { xs: 1, sm: 1 },
              py: 1,
              boxShadow: theme.shadows[1],
              gap: 1,
            }}>
              <LocalShippingIcon
                color="success"
                sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
              />
              <Typography
                variant="caption"
                color="success.main"
                fontWeight={600}
                sx={{
                  display: { xs: 'none', sm: 'block' }, // Hide text on mobile
                  fontSize: { sm: '0.7rem', md: '0.75rem' }
                }}
              >
                Free Delivery
              </Typography>
            </Box>
          </Tooltip>
        )}
      </Box>

      <CardContent sx={{
        flexGrow: 1,
        pb: 0,
        px: { xs: 2, sm: 2 },
        pt: { xs: 2, sm: 2 },
      }}>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          color="text.primary"
          sx={{
            minHeight: { xs: 'auto', sm: 48 },
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            lineHeight: 1.3,
            ...MULTILINE_ELLIPSIS_SX,
            WebkitLineClamp: 2
          }}
        >
          {product.title}
        </Typography>

        {product.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              minHeight: { xs: 'auto', sm: 36 },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              lineHeight: 1.4,
              mb: { xs: 1, sm: 2 },
              ...MULTILINE_ELLIPSIS_SX,
              WebkitLineClamp: { xs: 1, sm: 2 } // Less text on mobile
            }}
          >
            {product.description}
          </Typography>
        )}

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1, sm: 1 }}
          sx={{ mt: { xs: 2, sm: 1 }, mb: { xs: 2, sm: 1 } }}
        >
          <Rating
            value={product.rating || 0}
            precision={0.1}
            size="small"
            readOnly
            sx={{
              color: theme.palette.primary.main,
              '& .MuiRating-icon': {
                fontSize: { xs: '1rem', sm: '1.2rem' }
              }
            }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
          >
            {product.rating?.toFixed(1) || '0.0'}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              display: { xs: 'none', sm: 'block' } // Hide review count on mobile
            }}
          >
            ({product.reviewCount || 0} reviews)
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{
        mt: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, sm: 2 },
        pb: { xs: 2, sm: 2 },
        pt: { xs: 2, sm: 2 },
        // Keep horizontal layout on all screen sizes
        flexDirection: 'row',
        gap: { xs: 2, sm: 0 },
        width: '100%',
      }}>
        <Typography
          variant="h6"
          color="primary"
          fontWeight={700}
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            textAlign: 'left',
            flexShrink: 0,
            mr: { xs: 1, sm: 0 },
          }}
        >
          ₹{Number(product.price).toFixed(2)}
        </Typography>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: { xs: 1.5, sm: 1 },
          flexShrink: 0,
        }}>
          <WishlistButton
            productId={product.id}
            size="small"
          />

          <Button
            variant="contained"
            color="secondary"
            sx={{
              fontWeight: 700,
              borderRadius: { xs: 2, sm: 1 },
              boxShadow: 'none',
              // Touch-friendly sizing
              minWidth: { xs: 100, sm: 120 },
              minHeight: { xs: 40, sm: 40 },
              fontSize: { xs: '0.9rem', sm: '0.875rem' },
              px: { xs: 2, sm: 2 },
              py: { xs: 1, sm: 1 },
              position: 'relative',
              // Enhanced touch feedback
              '&:active': {
                transform: 'scale(0.98)',
              },
              // Ensure proper mobile layout
              flexShrink: 0,
            }}
            onClick={handleAddToCartClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress
                  size={16}
                  sx={{ mr: 1, color: 'white' }}
                />
                <span style={{ fontSize: 'inherit' }}>
                  {/* Shorter text on mobile */}
                  <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                    Adding...
                  </Box>
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    Adding...
                  </Box>
                </span>
              </>
            ) : (
              <>
                {/* Responsive button text */}
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Add to Cart
                </Box>
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Add to Cart
                </Box>
              </>
            )}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductCard; 