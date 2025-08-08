import { Box, Grid, Button, Typography, useTheme, IconButton, Collapse, Fade } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import ProductCard, { type Product } from '../../components/ProductCard';
import { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from './api';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import FactoryIcon from '@mui/icons-material/Factory';
import SpaIcon from '@mui/icons-material/Spa';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { FeatureHighlightsRow } from './FeatureHighlightsRow';
import { useAddToCart } from '../../hooks/useAddToCart';

export function ProductList() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<{ id: number | null; name: string }>({ id: null, name: 'All' });
  const [showAllProducts, setShowAllProducts] = useState(false);
  const navigate = useNavigate();
  const { handleAddToCart } = useAddToCart();

  const { data: allProducts, isLoading: isLoadingAll, isError: isErrorAll } = useGetProductsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  
  // Fetch products by category when a category is selected
  const { data: categoryProducts, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetProductsByCategoryQuery(
    selectedCategory.id!, 
    { skip: !selectedCategory.id }
  );

  // Determine which data to use based on selection
  const products = selectedCategory.id ? categoryProducts : allProducts;
  const isLoading = selectedCategory.id ? isLoadingCategory : isLoadingAll;
  const isError = selectedCategory.id ? isErrorCategory : isErrorAll;

  // Map backend data to ProductCard props (if needed)
  const mappedProducts: Product[] = (products || []).map((p: any) => ({
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

  // Reset showAllProducts when category changes
  useEffect(() => {
    setShowAllProducts(false);
  }, [selectedCategory]);

  // Responsive product display counts
  const getInitialProductCount = () => {
    // Show different amounts based on screen size
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) return 2; // Mobile: show 2 initially
    if (screenWidth < 768) return 4; // Tablet: show 4 initially
    return 4; // Desktop: show 4 initially
  };

  const [initialProductCount] = useState(getInitialProductCount());
  const displayedProducts = showAllProducts ? mappedProducts : mappedProducts.slice(0, initialProductCount);
  const hasMoreProducts = mappedProducts.length > initialProductCount;

  // Map backend categories to names, add 'All'
  const categories = [
    { id: null, name: 'All' },
    ...(categoriesData || [])
  ];

  const handleCategoryClick = (category: { id: number | null; name: string }) => {
    setSelectedCategory(category);
  };

  const handleToggleProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const checkScroll = () => {
        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 1); // +1 for rounding
      };
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [categoriesData, selectedCategory]);

  const handleScroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = window.innerWidth < 768 ? 150 : 200; // Smaller scroll on mobile
      el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box 
      sx={{ 
        maxWidth: '100%',
        width: '100%',
        mx: 'auto', 
        px: { xs: 0, sm: 1, md: 2 }, 
        py: { xs: 2, sm: 3, md: 4 },
        // Prevent horizontal scroll
        overflowX: 'hidden',
      }}
    >
      {/* Responsive Banner Image */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 120, sm: 160, md: 200, lg: 300, xl: 360 },
          backgroundImage: `linear-gradient(0deg,rgba(31,41,55,0.32),rgba(31,41,55,0.10)), url('/assets/banner_img.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: { xs: 2, sm: 3, md: 4 },
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          mb: { xs: 2, sm: 3, md: 4 },
          // Ensure banner doesn't cause horizontal scroll
          maxWidth: '100%',
          overflow: 'hidden',
        }}
        role="img"
        aria-label="Assorted millets in clay pots"
      />
      
      <FeatureHighlightsRow />
      
      <Typography 
        variant="h4" 
        fontWeight={700} 
        color="primary" 
        mb={{ xs: 2, sm: 3 }}
        textAlign="center" 
        sx={{ 
          fontFamily: `'Playfair Display', 'Merriweather', serif`,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
          px: { xs: 2, sm: 0 },
        }}
      >
        Your Favorites | All in One Place
      </Typography>
      
      <div 
        className="tamil-motif" 
        style={{ 
          margin: '0 auto 1rem auto',
          maxWidth: '90%',
        }} 
      />
      
      {/* Responsive Category Filter */}
      <Box sx={{ position: 'relative', mb: { xs: 2, sm: 3 }, px: { xs: 1, sm: 0 } }}>
        {showLeft && (
          <IconButton
            onClick={() => handleScroll('left')}
            sx={{ 
              position: 'absolute', 
              left: { xs: -8, sm: 0 }, 
              top: '50%', 
              zIndex: 2, 
              transform: 'translateY(-50%)',
              backgroundColor: 'background.paper',
              boxShadow: 2,
              minWidth: { xs: 36, sm: 44 },
              minHeight: { xs: 36, sm: 44 },
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ChevronLeftIcon fontSize={window.innerWidth < 768 ? 'small' : 'medium'} />
          </IconButton>
        )}
        
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: { xs: 1, sm: 1.5 },
            px: { xs: 4, sm: 5 }, // Space for arrows
            py: 1,
            scrollbarWidth: 'none', // Hide scrollbar on Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar on Chrome
            // Smooth scrolling
            scrollBehavior: 'smooth',
          }}
        >
          {categories.map((cat) => (
            <Button
              key={cat.id || cat.name}
              onClick={() => handleCategoryClick(cat)}
              sx={{
                fontWeight: 800,
                fontSize: { xs: 14, sm: 16, md: 17 },
                letterSpacing: 0.5,
                borderRadius: 99,
                px: { xs: 2, sm: 2.5, md: 3 },
                py: { xs: 0.75, sm: 1, md: 1.25 },
                minWidth: { xs: 80, sm: 100, md: 120 },
                minHeight: { xs: 36, sm: 40, md: 44 },
                whiteSpace: 'nowrap',
                flexShrink: 0, // Prevent shrinking
                boxShadow: selectedCategory.id === cat.id ? 3 : 0,
                bgcolor: selectedCategory.id === cat.id ? 'primary.main' : 'grey.100',
                color: selectedCategory.id === cat.id ? 'common.white' : 'primary.dark',
                border: selectedCategory.id === cat.id ? '2px solid' : '1px solid',
                borderColor: selectedCategory.id === cat.id ? 'primary.dark' : 'grey.300',
                transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                textShadow: selectedCategory.id === cat.id
                  ? '0 2px 8px rgba(0,0,0,0.18), 0 1px 1px rgba(0,0,0,0.10)'
                  : 'none',
                '&:hover': {
                  bgcolor: selectedCategory.id === cat.id ? 'primary.dark' : 'grey.200',
                  color: selectedCategory.id === cat.id ? 'common.white' : 'primary.main',
                  borderColor: 'primary.main',
                  boxShadow: 4,
                  textShadow: selectedCategory.id === cat.id
                    ? '0 2px 12px rgba(0,0,0,0.22)'
                    : '0 1px 4px rgba(0,0,0,0.10)',
                  transform: { xs: 'none', sm: 'translateY(-2px)' }, // No transform on mobile
                },
                '&:active': {
                  transform: 'scale(0.96)',
                },
              }}
            >
              {cat.name}
            </Button>
          ))}
        </Box>
        
        {showRight && (
          <IconButton
            onClick={() => handleScroll('right')}
            sx={{ 
              position: 'absolute', 
              right: { xs: -8, sm: 0 }, 
              top: '50%', 
              zIndex: 2, 
              transform: 'translateY(-50%)',
              backgroundColor: 'background.paper',
              boxShadow: 2,
              minWidth: { xs: 36, sm: 44 },
              minHeight: { xs: 36, sm: 44 },
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <ChevronRightIcon fontSize={window.innerWidth < 768 ? 'small' : 'medium'} />
          </IconButton>
        )}
      </Box>
      
      {/* Responsive Product Grid */}
      {isLoading ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: { xs: 200, sm: 250, md: 300 },
            px: 2,
          }}
        >
          <Typography 
            variant="h6" 
            color="text.secondary" 
            textAlign="center" 
            sx={{ 
              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Loading {selectedCategory.name !== 'All' ? `${selectedCategory.name} products` : 'products'}...
          </Typography>
        </Box>
      ) : isError ? (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: { xs: 200, sm: 250, md: 300 },
            px: 2,
          }}
        >
          <Typography 
            variant="h6" 
            color="error" 
            textAlign="center" 
            sx={{ 
              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Failed to load products.
          </Typography>
        </Box>
      ) : mappedProducts.length > 0 ? (
        <Box>
          {/* Initial Products - Responsive Grid */}
          <Grid 
            container 
            spacing={{ xs: 2, sm: 2.5, md: 3 }} 
            sx={{ 
              mt: { xs: 1, sm: 2 },
              px: { xs: 1, sm: 0 },
            }}
          >
            {displayedProducts.map((product, index) => (
              <Grid 
                key={product.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Fade in timeout={300 + (index * 100)}>
                  <Box 
                    onClick={() => handleProductClick(product.id)} 
                    sx={{ 
                      cursor: 'pointer', 
                      height: '100%',
                      width: '100%',
                      maxWidth: { xs: '100%', sm: 350, md: 320 },
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: { xs: 'none', sm: 'scale(1.02)' }, // No hover effect on mobile
                      },
                    }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={() => handleAddToCartClick(product)}
                    />
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>

          {/* Additional Products (Collapsible) */}
          {hasMoreProducts && (
            <Collapse in={showAllProducts} timeout={400} easing="ease-in-out">
              <Grid 
                container 
                spacing={{ xs: 2, sm: 2.5, md: 3 }} 
                sx={{ 
                  mt: { xs: 1, sm: 2 },
                  px: { xs: 1, sm: 0 },
                }}
              >
                {mappedProducts.slice(initialProductCount).map((product, index) => (
                  <Grid 
                    size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                    key={product.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Fade in timeout={300 + (index * 50)}>
                      <Box 
                        onClick={() => handleProductClick(product.id)} 
                        sx={{ 
                          cursor: 'pointer', 
                          height: '100%',
                          width: '100%',
                          maxWidth: { xs: '100%', sm: 350, md: 320 },
                          transition: 'transform 0.2s ease-in-out',
                          '&:hover': {
                            transform: { xs: 'none', sm: 'scale(1.02)' }, // No hover effect on mobile
                          },
                        }}
                      >
                        <ProductCard
                          product={product}
                          onAddToCart={() => handleAddToCartClick(product)}
                        />
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Collapse>
          )}

          {/* Responsive See More/Less Button */}
          {hasMoreProducts && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 3, sm: 4 }, px: 2 }}>
              <Button
                onClick={handleToggleProducts}
                variant="outlined"
                size="large"
                endIcon={showAllProducts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  borderRadius: 99,
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.25, sm: 1.5 },
                  fontWeight: 600,
                  fontSize: { xs: 14, sm: 16 },
                  letterSpacing: 0.5,
                  borderWidth: 2,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  minHeight: { xs: 44, sm: 48 }, // Touch-friendly
                  minWidth: { xs: 160, sm: 200 },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main',
                    transform: { xs: 'none', sm: 'translateY(-2px)' },
                    boxShadow: { xs: 2, sm: '0 8px 25px rgba(0,0,0,0.15)' },
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  },
                }}
              >
                {showAllProducts 
                  ? 'See Less' 
                  : `See More${mappedProducts.length - initialProductCount > 0 ? ` (${mappedProducts.length - initialProductCount} more)` : ''}`
                }
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        // Enhanced Empty State
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: { xs: 250, sm: 320, md: 400 },
            height: { xs: '30vh', sm: '35vh', md: '40vh' },
            maxHeight: 500,
            textAlign: 'center',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, sm: 4 },
          }}
        >
          <SentimentDissatisfiedIcon 
            sx={{ 
              fontSize: { xs: 60, sm: 80, md: 100 }, 
              color: 'text.secondary',
              mb: { xs: 2, sm: 3 },
            }} 
          />
          <Typography 
            variant="h5" 
            color="text.primary" 
            gutterBottom
            sx={{
              fontFamily: `'Playfair Display', 'Merriweather', serif`,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              fontWeight: 600,
              mb: 1,
            }}
          >
            No Products Found
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.6,
              maxWidth: { xs: '100%', sm: 400 },
            }}
          >
            {selectedCategory.name !== 'All' 
              ? `No products available in "${selectedCategory.name}" category.`
              : 'No products available at the moment.'
            }
          </Typography>
          <Button
            onClick={() => handleCategoryClick({ id: null, name: 'All' })}
            variant="outlined"
            sx={{
              mt: { xs: 2, sm: 3 },
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              minHeight: { xs: 44, sm: 48 },
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            View All Products
          </Button>
        </Box>
      )}

      {/* Why buy with Naatusakkarai.com Section */}
      <Box sx={{ mt: 8, mb: 4, width: '100%' }}>
        <Typography variant="h4" fontWeight={700} color="primary" textAlign="center" mb={3} sx={{ fontFamily: `'Playfair Display', 'Merriweather', serif` }}>
          Why buy with PragathiFarms.com
        </Typography>
        <Box
          sx={{
            width: '100%',
            bgcolor: '#F8F8F5',
            py: 3,
            px: { xs: 1, sm: 4 },
            display: 'flex',
            flexDirection: 'row',
            justifyContent: { xs: 'flex-start', md: 'center' },
            alignItems: 'center',
            gap: 0,
            overflowX: { xs: 'auto', md: 'visible' },
            boxShadow: '0 1px 8px rgba(44,70,57,0.04)',
          }}
        >
          {/* Direct from farmers */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, borderRadius: 99, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(44,70,57,0.06)', mx: 1, minWidth: 180 }}>
            <GroupsIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: 15 }}>Direct from farmers</Typography>
          </Box>
          {/* Handpicked ingredients */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, borderRadius: 99, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(44,70,57,0.06)', mx: 1, minWidth: 180 }}>
            <EmojiNatureIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: 15 }}>Handpicked ingredients</Typography>
          </Box>
          {/* Made in large */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, borderRadius: 99, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(44,70,57,0.06)', mx: 1, minWidth: 180 }}>
            <FactoryIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: 15 }}>Made in large</Typography>
          </Box>
          {/* 100% organic */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, borderRadius: 99, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(44,70,57,0.06)', mx: 1, minWidth: 180 }}>
            <SpaIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: 15 }}>100% organic</Typography>
          </Box>
          {/* Door step delivery */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, borderRadius: 99, bgcolor: '#fff', boxShadow: '0 1px 4px rgba(44,70,57,0.06)', mx: 1, minWidth: 180 }}>
            <LocalShippingIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: 15 }}>Door step delivery</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}