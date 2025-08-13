import { Box, Grid, Button, Typography, useTheme, IconButton, Collapse, Fade } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import ProductCard, { type Product } from '../../components/ProductCard';
import { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from './api';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { FeatureHighlightsRow } from './FeatureHighlightsRow';
import { useAddToCart } from '../../hooks/useAddToCart';
import { motion, AnimatePresence } from 'framer-motion';

// Carousel data with nature-themed content
const carouselSlides = [
  {
    id: 1,
    image: '/assets/banner_img.png', // Keep existing image for now
    title: 'Fresh from Our Farms',
    subtitle: 'Organic produce grown with care',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    overlayColor: 'rgba(34, 139, 34, 0.7)',
  },
  {
    id: 2,
    image: '/assets/banner_img.png', // You can replace with actual images
    title: 'Explore Our Nursery',
    subtitle: 'Beautiful plants for your garden',
    ctaText: 'Visit Nursery',
    ctaLink: '/nursery',
    overlayColor: 'rgba(85, 107, 47, 0.7)',
  },
  {
    id: 3,
    image: '/assets/banner_img.png', // You can replace with actual images
    title: 'Engineering Solutions',
    subtitle: 'Sustainable farming technology',
    ctaText: 'Learn More',
    ctaLink: '/engineering',
    overlayColor: 'rgba(46, 139, 87, 0.7)',
  },
  {
    id: 4,
    image: '/assets/banner_img.png', // You can replace with actual images
    title: 'Natural & Pure',
    subtitle: '100% organic, no chemicals',
    ctaText: 'Discover Benefits',
    ctaLink: '/benefits',
    overlayColor: 'rgba(60, 179, 113, 0.7)',
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Carousel auto-play effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleCarouselHover = () => setIsAutoPlaying(false);
  const handleCarouselLeave = () => setIsAutoPlaying(true);

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 3 seconds
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Navigate to next/previous slide
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

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
      {/* Modern Carousel Banner */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 200, sm: 300, md: 400, lg: 500, xl: 600 },
          position: 'relative',
          borderRadius: { xs: 2, sm: 3, md: 4 },
          overflow: 'hidden',
          mb: { xs: 3, sm: 4, md: 5 },
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}
        onMouseEnter={handleCarouselHover}
        onMouseLeave={handleCarouselLeave}
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
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${carouselSlides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: carouselSlides[currentSlide].overlayColor,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  px: { xs: 2, sm: 4, md: 6 },
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                      mb: { xs: 1, sm: 2 },
                      textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      fontFamily: `'Playfair Display', 'Merriweather', serif`,
                    }}
                  >
                    {carouselSlides[currentSlide].title}
                  </Typography>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      fontWeight: 400,
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                      mb: { xs: 2, sm: 3, md: 4 },
                      textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      opacity: 0.9,
                    }}
                  >
                    {carouselSlides[currentSlide].subtitle}
                  </Typography>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate(carouselSlides[currentSlide].ctaLink)}
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      color: 'white',
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                      px: { xs: 3, sm: 4, md: 5 },
                      py: { xs: 1.5, sm: 2, md: 2.5 },
                      borderRadius: '50px',
                      textTransform: 'none',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                      },
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {carouselSlides[currentSlide].ctaText}
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <IconButton
          onClick={goToPrev}
          sx={{
            position: 'absolute',
            left: { xs: 8, sm: 16, md: 24 },
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: theme.palette.primary.main,
            minWidth: { xs: 40, sm: 48, md: 56 },
            minHeight: { xs: 40, sm: 48, md: 56 },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,1)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
            zIndex: 2,
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>

        <IconButton
          onClick={goToNext}
          sx={{
            position: 'absolute',
            right: { xs: 8, sm: 16, md: 24 },
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            color: theme.palette.primary.main,
            minWidth: { xs: 40, sm: 48, md: 56 },
            minHeight: { xs: 40, sm: 48, md: 56 },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,1)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
            zIndex: 2,
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>

        {/* Dots Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 16, sm: 24, md: 32 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 2,
          }}
        >
          {carouselSlides.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: { xs: 8, sm: 10, md: 12 },
                height: { xs: 8, sm: 10, md: 12 },
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.8)',
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
        </Box>
      </Box>
      
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
    </Box>
  );
}