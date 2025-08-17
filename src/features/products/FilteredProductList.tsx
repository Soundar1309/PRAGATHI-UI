import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box, Button, Collapse, Fade, Grid, IconButton, Typography } from '@mui/material';
import Grow from '@mui/material/Grow';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard, { type Product } from '../../components/ProductCard';
import { useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductsQuery } from './api';
import { useAddToCart } from '../../hooks/useAddToCart';

export function FilteredProductList() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('category');
    const { handleAddToCart } = useAddToCart();

    const [showAllProducts, setShowAllProducts] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<{ id: number | null; name: string }>({
        id: categoryId ? parseInt(categoryId) : null,
        name: 'All'
    });

    const { data: allProducts, isLoading: isLoadingAll, isError: isErrorAll } = useGetProductsQuery();
    const { data: categoriesData } = useGetCategoriesQuery();

    // Fetch products by category when a category is selected
    const { data: categoryProducts, isLoading: isLoadingCategory, isError: isErrorCategory } = useGetProductsByCategoryQuery(
        selectedCategory.id!,
        { skip: !selectedCategory.id }
    );

    // Update selected category when URL changes
    useEffect(() => {
        const newCategoryId = searchParams.get('category');
        if (newCategoryId) {
            const category = categoriesData?.find(cat => cat.id === parseInt(newCategoryId));
            setSelectedCategory({
                id: parseInt(newCategoryId),
                name: category?.name || 'Category'
            });
        } else {
            setSelectedCategory({ id: null, name: 'All' });
        }
    }, [searchParams, categoriesData]);

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

    // Get products to display (first 4 or all)
    const displayedProducts = showAllProducts ? mappedProducts : mappedProducts.slice(0, 4);
    const hasMoreProducts = mappedProducts.length > 4;

    // Map backend categories to names, add 'All'
    const categories = [
        { id: null, name: 'All' },
        ...(categoriesData || [])
    ];

    const handleCategoryClick = (category: { id: number | null; name: string }) => {
        if (category.id) {
            navigate(`/products?category=${category.id}`);
        } else {
            navigate('/products');
        }
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
            setShowLeft(el.scrollLeft > 0);
            setShowRight(el.scrollWidth > el.clientWidth + el.scrollLeft);
        }
    }, [categoriesData, selectedCategory]);

    const handleScroll = (dir: 'left' | 'right') => {
        const el = scrollRef.current;
        if (el) {
            const scrollAmount = 200; // px
            el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <Box sx={{ 
            maxWidth: 1400, 
            mx: 'auto', 
            px: { xs: 2, sm: 2, md: 4 }, 
            py: 4,
            // Add top margin to ensure content is below fixed header
            // mt: { xs: '100px', sm: '100px', md: '180px', lg: '150px' }
        }}>

            {/* Category Filter */}
            <Box sx={{ position: 'relative', mb: { xs: 3, sm: 2 } }}>
                {showLeft && (
                    <IconButton
                        onClick={() => handleScroll('left')}
                        sx={{ 
                            position: 'absolute', 
                            left: { xs: -8, sm: 0 }, 
                            top: '50%', 
                            zIndex: 1, 
                            transform: 'translateY(-50%)',
                            backgroundColor: 'background.paper',
                            boxShadow: 2,
                            minWidth: { xs: 36, sm: 44 },
                            minHeight: { xs: 36, sm: 44 },
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                )}
                <Box
                    ref={scrollRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: { xs: 1, sm: 1, md: 2 },
                        px: { xs: 3, sm: 5 }, // space for arrows
                        scrollbarWidth: 'none', // hide scrollbar on Firefox
                        '&::-webkit-scrollbar': { display: 'none' }, // hide scrollbar on Chrome
                    }}
                    onScroll={() => {
                        const el = scrollRef.current;
                        if (el) {
                            setShowLeft(el.scrollLeft > 0);
                            setShowRight(el.scrollWidth > el.clientWidth + el.scrollLeft);
                        }
                    }}
                >
                    {categories.map((cat) => (
                        <Button
                            key={cat.id || cat.name}
                            onClick={() => handleCategoryClick(cat)}
                            sx={{
                                fontWeight: 800, // bolder
                                fontSize: { xs: 14, sm: 16, md: 17 }, // responsive font size
                                letterSpacing: 0.5,
                                borderRadius: 99,
                                px: { xs: 2, sm: 3 },
                                py: { xs: 1, sm: 1 },
                                minWidth: { xs: 100, sm: 120 },
                                whiteSpace: 'nowrap',
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
                            zIndex: 1, 
                            transform: 'translateY(-50%)',
                            backgroundColor: 'background.paper',
                            boxShadow: 2,
                            minWidth: { xs: 36, sm: 44 },
                            minHeight: { xs: 36, sm: 44 },
                        }}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                )}
            </Box>

            {/* Product Grid */}
            {isLoading ? (
                <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                    Loading {selectedCategory.name !== 'All' ? `${selectedCategory.name} products` : 'products'}...
                </Typography>
            ) : isError ? (
                <Typography variant="h6" color="error" textAlign="center" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                    Failed to load products.
                </Typography>
            ) : mappedProducts.length > 0 ? (
                <Box>
                    {/* Initial 4 Products */}
                    <Grid 
                        container 
                        spacing={{ xs: 2, sm: 3, md: 4 }} 
                        sx={{ 
                            mt: 2,
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                        }}
                    >
                        {displayedProducts.map((product) => (
                            <Grid 
                                size={{ xs: 12, sm: 6, md: 3 }} 
                                key={product.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'stretch',
                                }}
                            >
                                <Fade in timeout={300}>
                                    <Box 
                                        onClick={() => handleProductClick(product.id)} 
                                        sx={{ 
                                            cursor: 'pointer', 
                                            height: '100%',
                                            width: '100%',
                                            maxWidth: { xs: '100%', sm: 350, md: 320 },
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
                                spacing={{ xs: 2, sm: 3, md: 4 }} 
                                sx={{ 
                                    mt: 2,
                                    justifyContent: { xs: 'center', sm: 'flex-start' },
                                }}
                            >
                                {mappedProducts.slice(4).map((product, index) => (
                                    <Grid 
                                        size={{ xs: 12, sm: 6, md: 3 }} 
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

                    {/* See More/Less Button */}
                    {hasMoreProducts && (
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            mt: { xs: 5, sm: 4 },
                            px: 2,
                        }}>
                            <Button
                                onClick={handleToggleProducts}
                                variant="outlined"
                                size="large"
                                endIcon={showAllProducts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                sx={{
                                    borderRadius: 99,
                                    px: { xs: 3, sm: 4 },
                                    py: { xs: 1.5, sm: 2 },
                                    fontWeight: 600,
                                    fontSize: { xs: 14, sm: 16 },
                                    letterSpacing: 0.5,
                                    borderWidth: 2,
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        borderColor: 'primary.main',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                    },
                                    '&:active': {
                                        transform: 'translateY(0)',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    },
                                }}
                            >
                                {showAllProducts ? 'See Less' : `See More (${mappedProducts.length - 4} more)`}
                            </Button>
                        </Box>
                    )}
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: { xs: 280, sm: 320 },
                        height: { xs: '30vh', sm: '40vh' },
                        width: '100%',
                        mt: { xs: 5, sm: 4 },
                        px: 2,
                    }}
                >
                    <Grow in timeout={500}>
                        <Box>
                            <SentimentDissatisfiedIcon sx={{ fontSize: 72, color: 'grey.400', mb: 2 }} />
                            <Typography
                                variant="h6"
                                color="text.secondary"
                                textAlign="center"
                                sx={{
                                    fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                                    fontWeight: 600,
                                    fontSize: 22,
                                    letterSpacing: 0.5,
                                }}
                            >
                                No products found in {selectedCategory.name !== 'All' ? selectedCategory.name : 'this category'}.
                            </Typography>
                        </Box>
                    </Grow>
                </Box>
            )}

        </Box>
    );
} 