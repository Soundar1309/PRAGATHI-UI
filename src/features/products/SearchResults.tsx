import { Box, Grid, Typography, useTheme, Fade, Grow } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductCard, { type Product } from '../../components/ProductCard';
import { useSearchProductsQuery } from './api';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useAddToCart } from '../../hooks/useAddToCart';

export function SearchResults() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { handleAddToCart } = useAddToCart();

  const { data: searchResults, isLoading, isError } = useSearchProductsQuery(searchQuery, {
    skip: !searchQuery.trim(),
  });

  // Map backend data to ProductCard props
  const mappedProducts: Product[] = (searchResults || []).map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    price: p.price,
    category: p.category?.name || p.category || '',
    rating: p.rating,
    reviewCount: p.review_count,
    freeDelivery: p.free_delivery,
  }));

  const handleAddToCartClick = async (product: Product) => {
    await handleAddToCart({
      productId: product.id,
      quantity: 1,
      productTitle: product.title,
    });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (!searchQuery.trim()) {
    return (
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 1, sm: 2, md: 4 }, py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
            textAlign: 'center',
          }}
        >
          <SearchIcon sx={{ fontSize: 72, color: 'grey.400', mb: 2 }} />
          <Typography variant="h4" fontWeight={700} color="primary" mb={2} sx={{ fontFamily: `'Playfair Display', 'Merriweather', serif` }}>
            Search Products
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
            Enter a search term to find products
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 1, sm: 2, md: 4 }, py: 4 }}>
      {/* Search Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
          <SearchIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" fontWeight={700} color="primary" sx={{ fontFamily: `'Playfair Display', 'Merriweather', serif` }}>
            Search Results
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
          Showing results for "{searchQuery}"
        </Typography>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
            Searching for "{searchQuery}"...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {isError && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
            Failed to search products. Please try again.
          </Typography>
        </Box>
      )}

      {/* Search Results */}
      {!isLoading && !isError && (
        <>
          {mappedProducts.length > 0 ? (
            <>
              <Typography variant="h6" color="text.secondary" mb={3} sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                Found {mappedProducts.length} product{mappedProducts.length !== 1 ? 's' : ''}
              </Typography>
              <Grid container spacing={3}>
                {mappedProducts.map((product, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
                    <Fade in timeout={300 + (index * 100)}>
                      <Box onClick={() => handleProductClick(product.id)} sx={{ cursor: 'pointer', height: '100%' }}>
                        <ProductCard
                          product={product}
                          onAddToCart={() => handleAddToCartClick(product)}
                        />
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 400,
                textAlign: 'center',
              }}
            >
              <Grow in timeout={500}>
                <Box>
                  <SentimentDissatisfiedIcon sx={{ fontSize: 72, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h5" fontWeight={600} color="text.secondary" mb={2} sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                    No products found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                    No products match your search for "{searchQuery}"
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1} sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                    Try different keywords or browse our categories
                  </Typography>
                </Box>
              </Grow>
            </Box>
          )}
        </>
      )}
    </Box>
  );
} 