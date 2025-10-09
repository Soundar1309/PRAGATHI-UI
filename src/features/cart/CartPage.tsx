import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Fade,
    Grid,
    Grow,
    IconButton,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImage from '../../components/ProductImage';
import { formatVariationDisplayName, formatProductName } from '../../utils/formatters';
import { useGetCartQuery, useRemoveItemMutation, useUpdateItemMutation } from './api';

export function CartPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { data: cart, isLoading, isError, refetch } = useGetCartQuery();
    const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
    const [removeItem, { isLoading: isRemoving }] = useRemoveItemMutation();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleQuantityChange = async (itemId: number, newQuantity: number) => {
        try {
            await updateItem({ id: itemId, quantity: newQuantity }).unwrap();
            enqueueSnackbar('Cart updated successfully!', { variant: 'success' });
            refetch();
        } catch (error: any) {
            enqueueSnackbar('Failed to update cart', { variant: 'error' });
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            await removeItem(itemId).unwrap();
            enqueueSnackbar('Item removed from cart!', { variant: 'success' });
            refetch();
        } catch (error: any) {
            enqueueSnackbar('Failed to remove item', { variant: 'error' });
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        navigate('/products');
    };

    if (isLoading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress size={60} />
                <Typography variant="h6" color="text.secondary">
                    Loading your cart...
                </Typography>
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    Failed to load cart. Please try again.
                </Alert>
                <Button variant="contained" onClick={() => refetch()}>
                    Retry
                </Button>
            </Box>
        );
    }

    if (!cart || cart.cart_items.length === 0) {
        return (
            <Box sx={{
                maxWidth: 1400,
                mx: 'auto',
                px: { xs: 1, sm: 2, md: 4 },
                py: 4,
                textAlign: 'center'
            }}>
                <Grow in timeout={500}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '60vh',
                        gap: 3
                    }}>
                        <ShoppingCartIcon sx={{ fontSize: 120, color: 'grey.400' }} />
                        <Typography variant="h4" fontWeight={700} color="primary" sx={{ fontFamily: `'Playfair Display', 'Merriweather', serif` }}>
                            Your Cart is Empty
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                            Looks like you haven't added any items to your cart yet.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleContinueShopping}
                            sx={{
                                mt: 2,
                                px: 4,
                                py: 2,
                                borderRadius: 2,
                                fontWeight: 600,
                                fontSize: 16,
                            }}
                        >
                            Start Shopping
                        </Button>
                    </Box>
                </Grow>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 1, sm: 2, md: 4 }, py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" fontWeight={700} color="primary" sx={{ fontFamily: `'Playfair Display', 'Merriweather', serif` }}>
                    Shopping Cart
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                    {cart.item_count} item{cart.item_count !== 1 ? 's' : ''} in your cart
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Cart Items */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {cart.cart_items.map((item, index) => (
                            <Fade in timeout={300 + (index * 100)} key={item.id}>
                                <Card sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    overflow: 'visible',
                                    boxShadow: theme.shadows[3],
                                    borderRadius: 2,
                                }}>
                                    {/* Product Image */}
                                    <ProductImage
                                        src={item.item_image || ''}
                                        alt={item.item_name}
                                        variant="list"
                                        sx={{
                                            width: { xs: '100%', sm: 200 },
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => navigate(`/products/${item.product?.id || item.product_variation?.product}`)}
                                    />

                                    {/* Product Details */}
                                    <CardContent sx={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        p: 3
                                    }}>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                fontWeight={600}
                                                sx={{
                                                    cursor: 'pointer',
                                                    '&:hover': { color: 'primary.main' },
                                                    fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`
                                                }}
                                                onClick={() => navigate(`/products/${item.product?.id || item.product_variation?.product}`)}
                                            >
                                                {formatProductName(item.item_name)}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    mt: 1,
                                                    mb: 2,
                                                    fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`
                                                }}
                                            >
                                                {item.product?.description || (item.product_variation?.display_name ? formatVariationDisplayName(item.product_variation.display_name) : '')}
                                            </Typography>
                                        </Box>

                                        {/* Quantity Controls and Price */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            gap: 2
                                        }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexDirection: 'column' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                                        disabled={isUpdating || isRemoving}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <TextField
                                                        value={item.quantity}
                                                        onChange={(e) => {
                                                            const newQuantity = parseInt(e.target.value) || 1;
                                                            if (newQuantity > 0) {
                                                                handleQuantityChange(item.id, newQuantity);
                                                            }
                                                        }}
                                                        size="small"
                                                        sx={{ width: 80 }}
                                                        inputProps={{
                                                            min: 1,
                                                            style: { textAlign: 'center' }
                                                        }}
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        disabled={isUpdating || isRemoving}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>

                                            </Box>

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Typography variant="h6" fontWeight={600} color="primary">
                                                    ₹{item.subtotal.toFixed(2)}
                                                </Typography>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    disabled={isUpdating || isRemoving}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Fade>
                        ))}
                    </Box>
                </Grid>

                {/* Order Summary */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Card sx={{
                        position: 'sticky',
                        top: 20,
                        boxShadow: theme.shadows[4],
                        borderRadius: 2,
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h5" fontWeight={700} sx={{ mb: 3, fontFamily: `'Playfair Display', 'Merriweather', serif` }}>
                                Order Summary
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Items ({cart.item_count})
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        ₹{cart.total.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Divider />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Total
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700} color="primary">
                                        ₹{cart.total.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={handleCheckout}
                                sx={{
                                    mb: 2,
                                    py: 2,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                            >
                                Proceed to Checkout
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                size="large"
                                onClick={handleContinueShopping}
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
} 