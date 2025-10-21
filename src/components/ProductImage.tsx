import React from 'react';
import { Box, useTheme, Skeleton } from '@mui/material';
import type { SxProps } from '@mui/material';

export interface ProductImageProps {
  src: string;
  alt: string;
  variant?: 'card' | 'detail' | 'list' | 'mini' | 'avatar';
  borderRadius?: number | string;
  sx?: SxProps;
  loading?: boolean;
  onClick?: () => void;
  lazy?: boolean;
  productType?: 'solid' | 'liquid' | 'other';
}

// Fallback placeholder image component
const FallbackImage: React.FC<{ alt: string; sx?: SxProps }> = ({ sx }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[400],
        fontSize: '2rem',
        fontWeight: 600,
        ...sx,
      }}
    >
      📦
    </Box>
  );
};


const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  variant = 'card',
  borderRadius,
  sx = {},
  loading = false,
  onClick,
  lazy = true,
  productType = 'solid',
}) => {
  const theme = useTheme();

  // Define max width based on variant - all will be 1:1 aspect ratio
  const getMaxWidth = () => {
    switch (variant) {
      case 'card':
        return { xs: 240, sm: 280, md: 320 };
      case 'detail':
        return { xs: '100%', sm: 400, md: 500 };
      case 'list':
        return { xs: 200, sm: 250 };
      case 'mini':
        return 60;
      case 'avatar':
        return 50;
      default:
        return { xs: 240, sm: 280, md: 320 };
    }
  };

  const maxWidth = getMaxWidth();
  const defaultBorderRadius = borderRadius || (variant === 'avatar' ? '50%' : 2);

  // Handle loading state
  if (loading) {
    const loadingWidth = typeof maxWidth === 'object' ? maxWidth.xs : maxWidth;
    
    return (
      <Skeleton
        variant="rectangular"
        width={loadingWidth}
        height={loadingWidth} // Square aspect ratio
        sx={{
          borderRadius: defaultBorderRadius,
          ...sx,
        }}
      />
    );
  }

  // Handle missing image
  if (!src) {
    return (
      <Box
        sx={{
          aspectRatio: '1 / 1',
          width: maxWidth,
          maxWidth: '100%',
          borderRadius: defaultBorderRadius,
          overflow: 'hidden',
          cursor: onClick ? 'pointer' : 'default',
          ...sx,
        }}
        onClick={onClick}
      >
        <FallbackImage
          alt={alt}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: defaultBorderRadius,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        aspectRatio: '1 / 1',
        width: maxWidth,
        maxWidth: '100%',
        borderRadius: defaultBorderRadius,
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        ...sx,
      }}
      onClick={onClick}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        onError={(e) => {
          // Replace with fallback image on error
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            const fallback = document.createElement('div');
            fallback.innerHTML = '📦';
            fallback.style.cssText = `
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              background-color: ${theme.palette.grey[100]};
              color: ${theme.palette.grey[400]};
              font-size: 2rem;
              font-weight: 600;
              position: absolute;
              top: 0;
              left: 0;
            `;
            parent.appendChild(fallback);
          }
        }}
      />
    </Box>
  );
};

export default ProductImage;
