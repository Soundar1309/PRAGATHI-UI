import { Box, Grid, Button, Typography, useTheme, IconButton, Collapse, Fade, alpha, LinearProgress, CircularProgress, Skeleton } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import ProductCard, { type Product } from '../../components/ProductCard';
import { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetRecentlyAddedProductsQuery } from './api';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { FeatureHighlightsRow } from './FeatureHighlightsRow';
import { useAddToCart } from '../../hooks/useAddToCart';
import { motion, AnimatePresence } from 'framer-motion';

// Carousel data with clean images
const carouselSlides = [
  {
    id: 1,
    image: '/assets/img8.png',
  },
  {
    id: 2,
    image: '/assets/img11.png',
  },
  {
    id: 3,
    image: '/assets/img15.png',
  },
  {
    id: 4,
    image: '/assets/img16.png',
  },
  {
    id: 5,
    image: '/assets/img20.png',
  },
  {
    id: 6,
    image: '/assets/img22.png',
  },
  {
    id: 7,
    image: '/assets/img25.png',
  },
  {
    id: 8,
    image: '/assets/img30.png',
  },
];

export function ProductList() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<{ id: number | null; name: string }>({ id: null, name: 'All' });
  const [showAllProducts, setShowAllProducts] = useState(false);
  const navigate = useNavigate();
  const { handleAddToCart } = useAddToCart();
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: allProducts, isLoading: isLoadingAll, isError: isErrorAll, refetch: refetchAllProducts } = useGetProductsQuery();
  const { data: categoriesData, isLoading: isLoadingCategories, refetch: refetchCategories } = useGetCategoriesQuery();
  
  // Fetch products by category when a category is selected
  const { data: categoryProducts, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetProductsByCategoryQuery(
    selectedCategory.id!, 
    { skip: !selectedCategory.id }
  );

  // Fetch recently added products (only when showing all products)
  const { data: recentlyAddedProducts, isLoading: isLoadingRecentlyAdded, isError: isErrorRecentlyAdded } = useGetRecentlyAddedProductsQuery(
    { limit: 10 },
    { skip: selectedCategory.id !== null } // Skip when a specific category is selected
  );

  // Determine which data to use based on selection
  const products = selectedCategory.id ? categoryProducts : allProducts;
  const isLoading = selectedCategory.id ? isLoadingCategory : isLoadingAll;
  const isError = selectedCategory.id ? isErrorCategory : isErrorAll;

  // Add network status indicator
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>('online');
  
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check initial status
    setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Force refetch on component mount to ensure data is loaded
  useEffect(() => {
    console.log('ProductList component mounted, triggering API calls...');
    // Refetch products and categories when component mounts
    const timer = setTimeout(() => {
      console.log('Executing API calls...');
      refetchAllProducts();
      refetchCategories();
    }, 100); // Small delay to ensure component is fully mounted
    
    return () => {
      clearTimeout(timer);
    };
  }, [refetchAllProducts, refetchCategories]);

  // Debug logging to see loading states
  useEffect(() => {
    console.log('Loading states:', {
      isLoadingAll,
      isLoadingCategories,
      isLoadingCategory,
      hasAllProducts: !!allProducts,
      hasCategories: !!categoriesData,
      productsCount: allProducts?.length || 0,
      categoriesCount: categoriesData?.length || 0
    });
    
    // Log API configuration
    console.log('API Configuration:', {
      baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
      isOnline: navigator.onLine,
      networkStatus
    });
  }, [isLoadingAll, isLoadingCategories, isLoadingCategory, allProducts, categoriesData, networkStatus]);

  // Add a loading state for initial mount when no data is available
  const isInitialLoading = !allProducts && !categoriesData && !isErrorAll && !isErrorCategory;
  
  // Add a more aggressive loading state that shows immediately on mount
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const [showInitialLoading, setShowInitialLoading] = useState(true);
  
  useEffect(() => {
    // Show initial loading immediately
    setShowInitialLoading(true);
    
    // Set initial loading state to true after a short delay
    const timer = setTimeout(() => {
      setHasInitiallyLoaded(true);
      setShowInitialLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check if we're in a network error state
  const hasNetworkError = isErrorAll || isErrorCategory;

  // Filter out nursery categories from farm store
  const nurseryCategories = ['coconut tree', 'vermi composter', 'medicinal plants'];
  const filteredProducts = (products || []).filter((product: any) => {
    const categoryName = product.category?.name || product.category || '';
    const categoryString = typeof categoryName === 'string' ? categoryName : String(categoryName);
    return !nurseryCategories.some(nurseryCategory => 
      categoryString.toLowerCase().includes(nurseryCategory.toLowerCase())
    );
  });

  // Map backend data to ProductCard props (if needed)
  const mappedProducts: Product[] = filteredProducts.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    price: p.price,
    original_price: p.original_price,
    offer_price: p.offer_price,
    stock: p.stock,
    unit: p.unit,
    category: p.category?.name || p.category || '',
    rating: p.rating,
    reviewCount: p.review_count,
    freeDelivery: p.free_delivery,
    has_offer: p.has_offer,
    discount_percentage: p.discount_percentage,
  }));

  // Filter recently added products to exclude nursery categories
  const filteredRecentlyAddedProducts = (recentlyAddedProducts || []).filter((product: any) => {
    const categoryName = product.category?.name || product.category || '';
    const categoryString = typeof categoryName === 'string' ? categoryName : String(categoryName);
    return !nurseryCategories.some(nurseryCategory => 
      categoryString.toLowerCase().includes(nurseryCategory.toLowerCase())
    );
  });

  // Map recently added products
  const mappedRecentlyAddedProducts: Product[] = filteredRecentlyAddedProducts.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    price: p.price,
    original_price: p.original_price,
    offer_price: p.offer_price,
    unit: p.unit,
    category: p.category?.name || p.category || '',
    rating: p.rating,
    reviewCount: p.review_count,
    freeDelivery: p.free_delivery,
    has_offer: p.has_offer,
    discount_percentage: p.discount_percentage,
  }));

  // Reset showAllProducts when category changes
  useEffect(() => {
    setShowAllProducts(false);
  }, [selectedCategory]);

  // Carousel auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, []);

  // Pure auto-play - no manual controls

  // Note: Carousel now uses pure auto-play only - no manual controls

  // Responsive product display counts
  const getInitialProductCount = () => {
    // Show different amounts based on screen size
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) return 6; // Mobile: show 2 initially
    if (screenWidth < 768) return 8; // Tablet: show 4 initially
    return 8; // Desktop: show 4 initially
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
        py: { xs: 2, sm: 3, md: 4 },
        // Prevent horizontal scroll and ensure proper positioning
        overflowX: 'hidden',
        position: 'relative',
        // Add top margin to ensure content is below fixed header
      }}
    >
      {/* Modern Carousel Banner */}
      <Box
        sx={{
          width: '100vw',
          maxWidth: '100vw',
          height: { xs: 200, sm: 300, md: 400, lg: 500, xl: 600 },
          position: 'relative',
          overflow: 'hidden',
          mb: { xs: 3, sm: 4, md: 5 },
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          // Remove curved edges and make full width
          marginLeft: { xs: '-16px', sm: '-24px', md: '-32px' },
          marginRight: { xs: '-16px', sm: '-24px', md: '-32px' },
          // Ensure proper centering and positioning
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {/* Carousel Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              // Ensure proper centering
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${carouselSlides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                // Ensure image is properly centered and covers the full area
                overflow: 'hidden',
                // Force image to be perfectly centered
                backgroundOrigin: 'center',
                backgroundClip: 'border-box',
              }}
            />
          </motion.div>
        </AnimatePresence>


      </Box>
      
      {/* Content Container with proper padding */}
      <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <FeatureHighlightsRow />
      </Box>
      
      {/* Initial Loading State - Shows immediately when page loads */}
      {(showInitialLoading || isInitialLoading || isLoadingAll || (!allProducts && !isErrorAll) || !hasInitiallyLoaded) && !selectedCategory.id && (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            py: { xs: 4, sm: 6, md: 8 },
            px: 2,
            mb: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Typography 
            variant="h5" 
            color="primary" 
            textAlign="center" 
            sx={{ 
              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
              fontWeight: 600,
              mb: 3,
            }}
          >
            Loading Your Products...
          </Typography>
          
          {/* Animated Progress Bar */}
          <Box sx={{ width: '100%', maxWidth: 500, mb: 4 }}>
            <LinearProgress 
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 6,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.primary.main} 100%)`,
                  backgroundSize: '200% 100%',
                  animation: 'loading-shimmer 2s ease-in-out infinite',
                },
                '@keyframes loading-shimmer': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' },
                },
              }}
            />
          </Box>
          
          {/* Loading Spinner */}
          <CircularProgress 
            size={50}
            thickness={5}
            sx={{
              color: theme.palette.primary.main,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
        </Box>
      )}
      
      <Typography 
        variant="h4" 
        fontWeight={700} 
        color="primary" 
        mb={{ xs: 4, sm: 5, md: 6 }}
        textAlign="center" 
        sx={{ 
          fontFamily: `'Playfair Display', 'Merriweather', serif`,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
          px: { xs: 2, sm: 0 },
          opacity: isLoadingAll && !selectedCategory.id ? 0.7 : 1,
          transition: 'opacity 0.3s ease-in-out',
          '@keyframes pulse': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.3 },
            '100%': { opacity: 1 },
          },
        }}
      >
        Your Favorites | All in One Place
        {isLoadingAll && !selectedCategory.id && (
          <Box 
            component="span" 
            sx={{ 
              display: 'inline-block',
              ml: 1,
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          >
            ...
          </Box>
        )}
      </Typography>
      
      <div 
        className="tamil-motif" 
        style={{ 
          margin: '0 auto 2rem auto',
          maxWidth: '90%',
        }} 
      />
      
      {/* Responsive Category Filter */}
      <Box sx={{ 
        position: 'relative', 
        mb: { xs: 4, sm: 5, md: 6 }, 
        px: { xs: 1, sm: 0 },
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
      }}>
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
            gap: { xs: 2, sm: 3, md: 3 },
            px: { xs: 4, sm: 5 }, // Space for arrows
            py: { xs: 2, sm: 3, md: 4 },
            scrollbarWidth: 'none', // Hide scrollbar on Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar on Chrome
            // Smooth scrolling
            scrollBehavior: 'smooth',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {isLoadingCategories ? (
            // Category loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={130}
                height={52}
                sx={{ 
                  borderRadius: 99,
                  flexShrink: 0,
                }}
              />
            ))
          ) : (
            categories.map((cat) => (
              <Button
                key={cat.id || cat.name}
                onClick={() => handleCategoryClick(cat)}
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 14, sm: 16, md: 17 },
                  letterSpacing: 0.5,
                  borderRadius: 99,
                  px: { xs: 3, sm: 4, md: 4 },
                  py: { xs: 2, sm: 2, md: 3 },
                  minWidth: { xs: 90, sm: 110, md: 130 },
                  minHeight: { xs: 44, sm: 48, md: 52 },
                  whiteSpace: 'nowrap',
                  flexShrink: 0, // Prevent shrinking
                  boxShadow: selectedCategory.id === cat.id ? 4 : 2,
                  bgcolor: selectedCategory.id === cat.id 
                    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[100]} 100%)`,
                  color: selectedCategory.id === cat.id ? 'common.white' : 'primary.dark',
                  border: selectedCategory.id === cat.id ? '2px solid' : '1px solid',
                  borderColor: selectedCategory.id === cat.id ? 'primary.dark' : 'grey.300',
                  transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                  textShadow: selectedCategory.id === cat.id
                    ? '0 2px 8px rgba(0,0,0,0.18), 0 1px 1px rgba(0,0,0,0.10)'
                    : 'none',
                  '&:hover': {
                    bgcolor: selectedCategory.id === cat.id 
                      ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                      : `linear-gradient(135deg, ${theme.palette.grey[100]} 0%, ${theme.palette.grey[200]} 100%)`,
                    color: selectedCategory.id === cat.id ? 'common.white' : 'primary.main',
                    borderColor: 'primary.main',
                    boxShadow: 6,
                    textShadow: selectedCategory.id === cat.id
                      ? '0 2px 12px rgba(0,0,0,0.22)'
                      : '0 1px 4px rgba(0,0,0,0.10)',
                    transform: { xs: 'none', sm: 'translateY(-3px)' }, // Enhanced transform on desktop
                  },
                  '&:active': {
                    transform: 'scale(0.96)',
                  },
                }}
              >
                {cat.name}
              </Button>
            ))
          )}
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
      
      {/* Spacer between category filter and products */}
      <Box sx={{ height: { xs: 3, sm: 4, md: 5 } }} />
      
      {/* Category Loading Indicator */}
      {isLoadingCategory && selectedCategory.id && (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 3,
            py: 2,
          }}
        >
          <CircularProgress 
            size={20} 
            thickness={4}
            sx={{ mr: 2, color: theme.palette.primary.main }}
          />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            Switching to {selectedCategory.name}...
          </Typography>
        </Box>
      )}
      
      {/* Responsive Product Grid */}
      {showInitialLoading || isInitialLoading || isLoading || (!products && !isError) || !hasInitiallyLoaded ? (
        <Box>
          {/* Loading Progress Bar */}
          <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 4 }}>
            <LinearProgress 
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  animation: 'loading-pulse 2s ease-in-out infinite',
                },
                '@keyframes loading-pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                  '100%': { opacity: 1 },
                },
              }}
            />
          </Box>
          
          {/* Loading Text with Category */}
          <Typography 
            variant="h6" 
            color="text.secondary" 
            textAlign="center" 
            sx={{ 
              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              mb: 2,
            }}
          >
            {isInitialLoading 
              ? 'Initializing products...' 
              : `Loading ${selectedCategory.name !== 'All' ? `${selectedCategory.name} products` : 'products'}...`
            }
          </Typography>
          
          {/* Network Status Indicator */}
          {networkStatus === 'offline' && (
            <Typography 
              variant="body2" 
              color="warning.main" 
              textAlign="center" 
              sx={{ 
                fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                mb: 3,
                fontStyle: 'italic',
              }}
            >
              ⚠️ You appear to be offline. Please check your internet connection.
            </Typography>
          )}
          
          {/* Skeleton Loading Grid */}
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }} 
            sx={{ 
              px: { xs: 2, sm: 0 },
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            {Array.from({ length: initialProductCount }).map((_, index) => (
              <Grid 
                key={index}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                }}
              >
                <Box 
                  sx={{ 
                    width: '100%',
                    maxWidth: { xs: '100%', sm: 350, md: 320 },
                    p: 2,
                  }}
                >
                  {/* Product Image Skeleton */}
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={200}
                    sx={{ 
                      borderRadius: 2, 
                      mb: 2,
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                  
                  {/* Product Title Skeleton */}
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={24}
                    sx={{ mb: 1 }}
                  />
                  
                  {/* Product Description Skeleton */}
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={20}
                    sx={{ mb: 2 }}
                  />
                  
                  {/* Price Skeleton */}
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={28}
                    sx={{ mb: 2 }}
                  />
                  
                  {/* Button Skeleton */}
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={44}
                    sx={{ borderRadius: 2 }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          
          {/* Loading Spinner at Bottom */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress 
              size={40}
              thickness={4}
              sx={{
                color: theme.palette.primary.main,
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
          </Box>
          
          {/* Manual Refresh Button for debugging */}
          {isInitialLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  refetchAllProducts();
                  refetchCategories();
                }}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                }}
              >
                Refresh Products
              </Button>
            </Box>
          )}
        </Box>
      ) : isError ? (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: { xs: 300, sm: 350, md: 400 },
            px: 2,
            mt: { xs: 4, sm: 5, md: 6 },
            py: { xs: 4, sm: 5, md: 6 },
          }}
        >
          <Typography 
            variant="h6" 
            color="error" 
            textAlign="center" 
            sx={{ 
              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              mb: 2,
            }}
          >
            Failed to load products.
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            textAlign="center" 
            sx={{ 
              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              mb: 3,
              maxWidth: 400,
            }}
          >
            {hasNetworkError 
              ? 'There seems to be a connection issue. Please check your internet connection and try again.'
              : 'Unable to fetch products at the moment. Please try refreshing the page.'
            }
          </Typography>
          
          <Button
            variant="contained"
            onClick={() => {
              refetchAllProducts();
              refetchCategories();
            }}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 2,
              fontWeight: 600,
            }}
          >
            Try Again
          </Button>
        </Box>
      ) : mappedProducts.length > 0 ? (
        <Box>
          {/* Initial Products - Responsive Grid */}
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }} 
            sx={{ 
              mt: { xs: 3, sm: 4, md: 5 },
              px: { xs: 2, sm: 0 },
              justifyContent: { xs: 'center', sm: 'flex-start' },
              width: '100%',
              maxWidth: '100%',
              margin: 0,
            }}
          >
            {displayedProducts.map((product, index) => (
              <Grid 
                key={product.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'stretch',
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
              spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }} 
              sx={{ 
                mt: { xs: 3, sm: 4, md: 5 },
                px: { xs: 2, sm: 0 },
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
                {mappedProducts.slice(initialProductCount).map((product, index) => (
                  <Grid 
                    size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                    key={product.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'stretch',
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 5, sm: 6, md: 7 }, px: 2 }}>
              <Button
                onClick={handleToggleProducts}
                variant="outlined"
                size="large"
                endIcon={showAllProducts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                sx={{
                  borderRadius: 99,
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1, sm: 2 },
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
            minHeight: { xs: 300, sm: 380, md: 450 },
            height: { xs: '35vh', sm: '40vh', md: '45vh' },
            maxHeight: 600,
            textAlign: 'center',
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 5, sm: 6, md: 7 },
            mt: { xs: 3, sm: 4, md: 5 },
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
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
              py: { xs: 1, sm: 2 },
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

      {/* Recently Added Section - Only show when viewing all products */}
      {!selectedCategory.id && (
        <Box sx={{ mt: { xs: 6, sm: 8, md: 10 } }}>
          {/* Section Header */}
          <Typography 
            variant="h4" 
            fontWeight={700} 
            color="primary" 
            mb={{ xs: 4, sm: 5, md: 6 }}
            textAlign="center" 
            sx={{ 
              fontFamily: `'Playfair Display', 'Merriweather', serif`,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
              px: { xs: 2, sm: 0 },
            }}
          >
            Recently Added
          </Typography>

          {/* Recently Added Products Loading State */}
          {isLoadingRecentlyAdded ? (
            <Box>
              {/* Loading Progress Bar */}
              <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 4 }}>
                <LinearProgress 
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      animation: 'loading-pulse 2s ease-in-out infinite',
                    },
                    '@keyframes loading-pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                      '100%': { opacity: 1 },
                    },
                  }}
                />
              </Box>
              
              {/* Loading Text */}
              <Typography 
                variant="h6" 
                color="text.secondary" 
                textAlign="center" 
                sx={{ 
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  mb: 4,
                }}
              >
                Loading recently added products...
              </Typography>
              
              {/* Skeleton Loading Grid */}
              <Grid 
                container 
                spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }} 
                sx={{ 
                  px: { xs: 2, sm: 0 },
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                }}
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <Grid 
                    key={index}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'stretch',
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: '100%',
                        maxWidth: { xs: '100%', sm: 350, md: 320 },
                        p: 2,
                      }}
                    >
                      {/* Product Image Skeleton */}
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={200}
                        sx={{ 
                          borderRadius: 2, 
                          mb: 2,
                          animation: 'pulse 1.5s ease-in-out infinite',
                        }}
                      />
                      
                      {/* Product Title Skeleton */}
                      <Skeleton
                        variant="text"
                        width="80%"
                        height={24}
                        sx={{ mb: 1 }}
                      />
                      
                      {/* Product Description Skeleton */}
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={20}
                        sx={{ mb: 2 }}
                      />
                      
                      {/* Price Skeleton */}
                      <Skeleton
                        variant="text"
                        width="40%"
                        height={28}
                        sx={{ mb: 2 }}
                      />
                      
                      {/* Button Skeleton */}
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={44}
                        sx={{ borderRadius: 2 }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : isErrorRecentlyAdded ? (
            // Error State for Recently Added
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: { xs: 200, sm: 250 },
                px: 2,
                py: { xs: 4, sm: 5 },
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
              }}
            >
              <Typography 
                variant="h6" 
                color="error" 
                textAlign="center" 
                sx={{ 
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  mb: 2,
                }}
              >
                Failed to load recently added products
              </Typography>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                textAlign="center" 
                sx={{ 
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  mb: 3,
                  maxWidth: 400,
                }}
              >
                Unable to fetch recently added products at the moment.
              </Typography>
            </Box>
          ) : mappedRecentlyAddedProducts.length > 0 ? (
            // Recently Added Products Grid
            <Grid 
              container 
              spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }} 
              sx={{ 
                px: { xs: 2, sm: 0 },
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              {mappedRecentlyAddedProducts.map((product, index) => (
                <Grid 
                  key={product.id}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'stretch',
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
                          transform: { xs: 'none', sm: 'scale(1.02)' },
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
          ) : (
            // Empty State for Recently Added
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: 200, sm: 250 },
                textAlign: 'center',
                px: { xs: 3, sm: 4 },
                py: { xs: 4, sm: 5 },
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Typography 
                variant="h6" 
                color="text.primary" 
                sx={{
                  fontFamily: `'Playfair Display', 'Merriweather', serif`,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                No Recent Products
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  lineHeight: 1.6,
                  maxWidth: { xs: '100%', sm: 400 },
                }}
              >
                No recently added products available at the moment.
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}