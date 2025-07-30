import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Skeleton,
  Alert,
  useTheme,
  Fade,
  Grow,
  Divider,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ShoppingBag as ShoppingBagIcon,
  Visibility as VisibilityIcon,
  LocalShipping as LocalShippingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { useGetOrdersQuery } from './api';
import { useSnackbar } from 'notistack';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'success';
    case 'shipped':
      return 'info';
    case 'paid':
      return 'warning';
    case 'pending':
      return 'default';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircleIcon />;
    case 'shipped':
      return <LocalShippingIcon />;
    case 'paid':
      return <PaymentIcon />;
    case 'pending':
      return <PendingIcon />;
    case 'cancelled':
      return <CancelIcon />;
    default:
      return <PendingIcon />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'Delivered';
    case 'shipped':
      return 'Shipped';
    case 'paid':
      return 'Paid';
    case 'pending':
      return 'Pending';
    case 'cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

export function OrderList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: ordersResponse, isLoading, isError, refetch } = useGetOrdersQuery();

  const orders = ordersResponse?.results || [];

  const handleViewDetails = (orderId: number) => {
    navigate(`/orders/${orderId}`);
  };

  const handleReorder = () => {
    // TODO: Implement reorder functionality
    enqueueSnackbar('Reorder functionality coming soon!', { variant: 'info' });
  };

  const handleRetry = () => {
    refetch();
  };

  // Handle authentication error
  if (isError) {
    return (
      <Box sx={{
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, sm: 4 },
        py: 4
      }}>
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Retry
            </Button>
          }
        >
          Failed to load your orders. Please try again.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{
      maxWidth: 1200,
      mx: 'auto',
      px: { xs: 2, sm: 4 },
      py: 4
    }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          fontWeight={700}
          color="primary"
          sx={{
            fontFamily: `'Playfair Display', 'Merriweather', serif`,
            mb: 1
          }}
        >
          Order History
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`
          }}
        >
          Track your orders and view order details
        </Typography>
      </Box>

      {isLoading ? (
        // Loading skeleton
        <Grow in timeout={500}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[1, 2, 3].map((index) => (
              <Card key={index} sx={{
                boxShadow: theme.shadows[3],
                borderRadius: 3,
                overflow: 'visible'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Skeleton variant="text" width="30%" height={32} />
                    <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 2 }} />
                  </Box>
                  <Skeleton variant="text" width="20%" height={24} sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="40%" height={20} />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton variant="text" width="25%" height={24} />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
                      <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grow>
      ) : orders.length === 0 ? (
        // Empty state
        <Grow in timeout={600}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            gap: 3
          }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: theme.palette.grey[200],
                color: theme.palette.grey[600],
                fontSize: 48,
              }}
            >
              <ShoppingBagIcon sx={{ fontSize: 60 }} />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary"
                sx={{
                  fontFamily: `'Playfair Display', 'Merriweather', serif`,
                  mb: 1
                }}
              >
                No Orders Yet
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                  mb: 3
                }}
              >
                You haven't placed any orders yet. Start shopping to see your order history here.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/products')}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                }}
              >
                Start Shopping
              </Button>
            </Box>
          </Box>
        </Grow>
      ) : (
        // Orders list
        <Fade in timeout={600}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {orders.map((order) => (
              <Card
                key={order.id}
                sx={{
                  boxShadow: theme.shadows[3],
                  borderRadius: 3,
                  overflow: 'visible',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: theme.shadows[6],
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Order Header */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    flexWrap: 'wrap',
                    gap: 2
                  }}>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                          fontFamily: `'Playfair Display', 'Merriweather', serif`,
                          color: theme.palette.primary.main
                        }}
                      >
                        Order #{order.id}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`
                        }}
                      >
                        Placed on {formatDate(order.created_at)}
                      </Typography>
                    </Box>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={getStatusLabel(order.status)}
                      color={getStatusColor(order.status) as any}
                      variant="filled"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {/* Order Items */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                        mb: 2
                      }}
                    >
                      Items ({order.order_items.length})
                    </Typography>
                    <Grid container spacing={2}>
                      {order.order_items.map((item) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: theme.palette.grey[50]
                          }}>
                            <Avatar
                              src={item.product.image}
                              alt={item.product.title}
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 1
                              }}
                            />
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                variant="subtitle2"
                                fontWeight={600}
                                sx={{
                                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {item.product.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`
                                }}
                              >
                                Qty: {item.quantity} × {formatPrice(parseFloat(item.price))}
                              </Typography>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                color="primary"
                                sx={{
                                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`
                                }}
                              >
                                {formatPrice(item.subtotal)}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {/* Order Footer */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                  }}>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color="primary"
                        sx={{
                          fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`
                        }}
                      >
                        Total: {formatPrice(order.total)}
                      </Typography>
                      {order.delivery && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`
                          }}
                        >
                          Delivery: {order.delivery.first_name} {order.delivery.last_name}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Tooltip title="View order details">
                        <IconButton
                          onClick={() => handleViewDetails(order.id)}
                          sx={{
                            color: theme.palette.primary.main,
                            '&:hover': {
                              bgcolor: theme.palette.primary.light,
                              color: 'white'
                            }
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewDetails(order.id)}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          textTransform: 'none'
                        }}
                      >
                        View Details
                      </Button>
                      {order.status === 'delivered' && (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleReorder}
                          sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none'
                          }}
                        >
                          Reorder
                        </Button>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Fade>
      )}
    </Box>
  );
}