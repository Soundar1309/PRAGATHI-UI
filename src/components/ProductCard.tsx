import React from 'react';
import {
  Card,
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
import ProductImage from './ProductImage';

export interface Product {
  id: number;
  title: string;
  description?: string;
  image: string;
  price: number;
  original_price?: number;
  offer_price?: number;
  category: string;
  rating?: number;
  reviewCount?: number;
  freeDelivery?: boolean;
  has_offer?: boolean;
  discount_percentage?: number;
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

  // Determine which price to display
  const displayPrice = product.price; // Always show the price field
  const originalPrice = product.original_price || 10000; // Use original_price or default
  const hasOffer = originalPrice > displayPrice; // Show offer if original price is higher than current price

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // Fixed height for equal card sizes
        height: { xs: 420, sm: 450, md: 480 },
        minHeight: { xs: 420, sm: 450, md: 480 },
        // Responsive width
        width: '100%',
        maxWidth: { xs: '100%', sm: 280, md: 300, lg: 320 },
        minWidth: { xs: '100%', sm: 260 },
        // Reduced border radius
        borderRadius: { xs: 1, sm: 1.5, md: 2 },
        boxShadow: theme.shadows[3],
        background: theme.palette.background.paper,
        // No padding on card - let sections handle their own padding
        p: 0,
        // Hover effects with smooth transitions
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: { xs: 'none', sm: 'translateY(-4px)' }, // No hover transform on mobile
          boxShadow: { xs: theme.shadows[3], sm: theme.shadows[8] },
        },
        // Ensure card doesn't break layout on small screens
        overflowWrap: 'break-word',
        overflow: 'hidden', // Prevent content from overflowing
        // Ensure card respects container boundaries
        boxSizing: 'border-box',
      }}
    >
      {/* Image Section - Square 1:1 ratio */}
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          // Ensure the image container maintains 1:1 aspect ratio
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          borderRadius: { xs: 1, sm: 1.5, md: 2 },
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <ProductImage
          src={product.image}
          alt={product.title}
          variant="card"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 0, // Remove border radius from image since container handles it
          }}
        />
        
        {/* Category Chip */}
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
            borderRadius: 0.5,
            boxShadow: theme.shadows[1],
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            maxWidth: { xs: 100, sm: 120 },
            ...ELLIPSIS_SX,
          }}
        />
        
        {/* Offer Chip */}
        {hasOffer && (
          <Chip
            label={`${Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% OFF`}
            size="small"
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 12 },
              right: { xs: 8, sm: 12 },
              bgcolor: theme.palette.error.main,
              color: '#fff',
              fontWeight: 600,
              borderRadius: 0.5,
              boxShadow: theme.shadows[1],
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              maxWidth: { xs: 80, sm: 100 },
              ...ELLIPSIS_SX,
            }}
          />
        )}
        
        {/* Free Delivery Indicator */}
        {product.freeDelivery && (
          <Tooltip title="Free Delivery">
            <Box sx={{
              position: 'absolute',
              bottom: { xs: 8, sm: 12 },
              right: { xs: 8, sm: 12 },
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.95)',
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
                  display: { xs: 'none', sm: 'block' },
                  fontSize: { sm: '0.7rem', md: '0.75rem' }
                }}
              >
                Free Delivery
              </Typography>
            </Box>
          </Tooltip>
        )}
      </Box>

      {/* Content Section - Product Details */}
      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, sm: 2 },
        // Ensure content doesn't overflow and uses available space
        minHeight: 0,
        overflow: 'hidden',
        // Fixed height for content area to ensure consistency
        height: { xs: 120, sm: 130, md: 140 },
        maxHeight: { xs: 120, sm: 130, md: 140 },
      }}>
        {/* Product Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          color="text.primary"
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            lineHeight: 1.3,
            mb: { xs: 1, sm: 1 },
            // Allow text to wrap naturally
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            // Limit to 2 lines with ellipsis
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {product.title}
        </Typography>

        {/* Product Description */}
        {product.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              lineHeight: 1.4,
              mb: { xs: 1, sm: 1 },
              // Allow text to wrap naturally
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto',
              // Limit to 2 lines with ellipsis
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.description}
          </Typography>
        )}

        {/* Rating Section */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1, sm: 1 }}
          sx={{ 
            mt: 'auto', // Push rating to bottom of content area
            mb: { xs: 1, sm: 1 },
            flexShrink: 0, // Prevent rating from shrinking
          }}
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
              display: { xs: 'none', sm: 'block' }
            }}
          >
            ({product.reviewCount || 0} reviews)
          </Typography>
        </Stack>
      </CardContent>

      {/* Actions Section - Price and Buttons */}
      <CardActions sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, sm: 2 },
        py: { xs: 2, sm: 2 },
        flexDirection: 'row',
        gap: { xs: 2, sm: 1 },
        width: '100%',
        flexShrink: 0, // Prevent actions from shrinking
        // Ensure buttons don't wrap
        flexWrap: 'nowrap',
        // Fixed height for actions area
        height: { xs: 60, sm: 65, md: 70 },
        minHeight: { xs: 60, sm: 65, md: 70 },
        maxHeight: { xs: 60, sm: 65, md: 70 },
      }}>
        {/* Price Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start',
          flexShrink: 0,
          minWidth: 0, // Allow price to shrink if needed
        }}>
          {hasOffer ? (
            <>
              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  lineHeight: 1.2,
                  // Prevent price from being too long
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                ₹{Number(displayPrice).toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textDecoration: 'line-through',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  opacity: 0.7,
                  lineHeight: 1.2,
                }}
              >
                ₹{Number(originalPrice).toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography
              variant="h6"
              color="primary"
              fontWeight={700}
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                lineHeight: 1.2,
                // Prevent price from being too long
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
            >
              ₹{Number(displayPrice).toFixed(2)}
            </Typography>
          )}
        </Box>

        {/* Buttons Section */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: { xs: 1, sm: 1 },
          flexShrink: 0,
          minWidth: 0, // Allow buttons to shrink if needed
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
              borderRadius: { xs: 0.5, sm: 0.5 },
              boxShadow: 'none',
              // Responsive sizing
              minWidth: { xs: 80, sm: 100 },
              maxWidth: { xs: 120, sm: 140 },
              minHeight: { xs: 36, sm: 40 },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              py: { xs: 1, sm: 1 },
              px: { xs: 1, sm: 2 },
              position: 'relative',
              // Enhanced touch feedback
              '&:active': {
                transform: 'scale(0.98)',
              },
              // Ensure button doesn't overflow
              flexShrink: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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