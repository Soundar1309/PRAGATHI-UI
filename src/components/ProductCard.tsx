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
  stock?: number;
  unit?: string;
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
  const displayPrice = Number(product.price); // Always show the price field
  const originalPrice = product.original_price ? Number(product.original_price) : null; // Get the actual original_price (could be null/undefined)
  const hasOffer = originalPrice && originalPrice > displayPrice; // Show offer if original price exists and is higher than current price
  const showOriginalPrice = originalPrice && originalPrice !== displayPrice; // Only show original price if it exists and is different from current price

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // Fixed height for equal card sizes - adjusted for proper content display
        height: { xs: 420, sm: 450, md: 480 },
        minHeight: { xs: 420, sm: 450, md: 480 },
        // Responsive width with proper constraints
        width: '100%',
        maxWidth: { xs: '100%', sm: 300, md: 320, lg: 350 },
        minWidth: { xs: '100%', sm: 280, md: 300, lg: 320 },
        // Enhanced border radius
        // borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        background: theme.palette.background.paper,
        // No padding on card - let sections handle their own padding
        p: 0,
        // Enhanced hover effects with smooth transitions
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: { xs: 'none', sm: 'translateY(-6px)' }, // No hover transform on mobile
          boxShadow: { xs: '0 4px 20px rgba(0, 0, 0, 0.08)', sm: '0 12px 40px rgba(0, 0, 0, 0.15)' },
        },
        // Ensure card doesn't break layout on small screens
        overflowWrap: 'break-word',
        overflow: 'hidden', // Prevent content from overflowing
        // Ensure card respects container boundaries
        boxSizing: 'border-box',
        // Force consistent sizing regardless of content
        flexShrink: 0,
        // Prevent content from expanding the card
        position: 'relative',
      }}
    >
      {/* Image Section - Square 1:1 ratio */}
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '100%',
          // Ensure the image container maintains 1:1 aspect ratio
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          // borderRadius: { xs: 1, sm: 1.5, md: 2 },
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          boxSizing: 'border-box',
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
            bgcolor: theme.palette.primary.dark,
            color: '#fff',
            fontWeight: 700,
            borderRadius: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            maxWidth: { xs: 100, sm: 120 },
            // Add text shadow for better readability
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            // Add border for better definition
            border: '1px solid rgba(255,255,255,0.2)',
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
              bgcolor: theme.palette.error.dark,
              color: '#fff',
              fontWeight: 700,
              borderRadius: 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              maxWidth: { xs: 80, sm: 100 },
              // Add text shadow for better readability
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              // Add border for better definition
              border: '1px solid rgba(255,255,255,0.2)',
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
        p: { xs: 1.5, sm: 2 },
        // Ensure content doesn't overflow and uses available space
        minHeight: 0,
        overflow: 'hidden',
        // Adjusted height for proper content display
        height: { xs: 80, sm: 85, md: 90 },
        maxHeight: { xs: 80, sm: 85, md: 90 },
        // Add subtle background gradient for visual appeal
        background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.9) 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
        }
      }}>
        {/* Product Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          color="text.primary"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
            // lineHeight: 1.4,
            // mb: { xs: 2, sm: 2.5, md: 3 }, // Increased margin bottom for more space
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
            // Add subtle text shadow for better readability
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          {product.title}{product.unit && ` - ${product.unit}`}
        </Typography>


        {/* Rating Section */}
        {/* <Stack
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
        </Stack> */}
      </CardContent>

      {/* Actions Section - Price and Buttons */}
      <CardActions sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2.5, sm: 3 },
        py: { xs: 2.5, sm: 3 },
        flexDirection: 'row',
        gap: { xs: 2, sm: 2.5 },
        width: '100%',
        flexShrink: 0, // Prevent actions from shrinking
        // Ensure buttons don't wrap
        flexWrap: 'nowrap',
        // Adjusted height for actions area - proper content display
        height: { xs: 80, sm: 85, md: 90 },
        minHeight: { xs: 80, sm: 85, md: 90 },
        maxHeight: { xs: 80, sm: 85, md: 90 },
        // Add subtle border and background
        borderTop: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
        position: 'relative',
        // Add subtle shadow for depth
        boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
      }}>
        {/* Price Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start',
          flexShrink: 0,
          minWidth: 0, // Allow price to shrink if needed
          gap: { xs: 0.5, sm: 0.75 }, // Add gap between prices
        }}>
          {showOriginalPrice ? (
            <>
              <Typography
                variant="h6"
                color="primary"
                fontWeight={700}
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                  lineHeight: 1.2,
                  // Prevent price from being too long
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                  // Add subtle text shadow
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  // Add subtle background highlight
                  background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                }}
              >
                ₹{Number(displayPrice).toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textDecoration: 'line-through',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  opacity: 0.6,
                  lineHeight: 1.2,
                  fontWeight: 500,
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
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                lineHeight: 1.2,
                // Prevent price from being too long
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                // Add subtle text shadow
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                // Add subtle background highlight
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
                borderRadius: 1,
                px: 1,
                py: 0.5,
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
              borderRadius: { xs: 1, sm: 1.5 },
              // Enhanced shadow and gradient - changed to green theme
              background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
              // Responsive sizing
              minWidth: { xs: 90, sm: 110, md: 120 },
              maxWidth: { xs: 130, sm: 150, md: 160 },
              minHeight: { xs: 40, sm: 44, md: 48 },
              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
              py: { xs: 1.25, sm: 1.5 },
              px: { xs: 1.5, sm: 2, md: 2.5 },
              position: 'relative',
              // Enhanced hover and active states
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)',
                boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
                transform: 'translateY(-2px)',
              },
              '&:active': {
                transform: 'translateY(0) scale(0.98)',
                boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
              },
              // Ensure button doesn't overflow
              flexShrink: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              // Add subtle border
              border: '1px solid rgba(255, 255, 255, 0.2)',
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