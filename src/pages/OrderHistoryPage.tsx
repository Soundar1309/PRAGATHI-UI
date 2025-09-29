import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stack,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ShoppingCart,
  Visibility,
  LocalShipping,
  CheckCircle,
  Cancel,
  AccessTime,
  LocationOn,
  Receipt,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { fetchOrders, type Order, type OrderItem } from '../api/orders';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'paid':
      return 'info';
    case 'shipped':
      return 'primary';
    case 'delivered':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <AccessTime />;
    case 'paid':
      return <Receipt />;
    case 'shipped':
      return <LocalShipping />;
    case 'delivered':
      return <CheckCircle />;
    case 'cancelled':
      return <Cancel />;
    default:
      return <ShoppingCart />;
  }
};

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    try {
      loadOrders();
    } catch (err) {
      console.error('Error in useEffect:', err);
      setError('Failed to load orders');
      setLoading(false);
    }
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching orders...');
      const ordersData = await fetchOrders();
      console.log('Orders data received:', ordersData);
      setOrders(ordersData);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={loadOrders}>
          Retry
        </Button>
      </Box>
    );
  }

  // Ensure orders is always an array
  const safeOrders = Array.isArray(orders) ? orders : [];

  try {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: '#f5f5f5',
        p: { xs: 3, sm: 4, md: 6 },
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
        {/* Header */}
        <Paper
          sx={{
            p: 3,
            mb: 6,
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 48,
                height: 48,
                boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
              }}
            >
              <ShoppingCart />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700} color="text.primary">
                Order History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and track all your orders
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Orders Table */}
        <Paper
          sx={{
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: 1,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
        >
          {safeOrders.length === 0 ? (
            <Box p={6} textAlign="center">
              <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No orders found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You haven't placed any orders yet.
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 600, color: 'text.primary' } }}>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {safeOrders.map((order) => (
                    <TableRow 
                      key={order.id}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(25, 118, 210, 0.05)' 
                        } 
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight={600} color="primary">
                          #{order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(order.created_at).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(order.created_at).toLocaleTimeString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(order.status)}
                          label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          color={getStatusColor(order.status) as any}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          ₹{parseFloat(order.total).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {order.order_items.length} item{order.order_items.length !== 1 ? 's' : ''}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleViewOrder(order)}
                          sx={{ color: 'primary.main' }}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Order Details Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              maxHeight: '90vh',
            }
          }}
        >
          <DialogTitle>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ShoppingCart color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Order #{selectedOrder?.id}
              </Typography>
            </Stack>
          </DialogTitle>
          
          <DialogContent dividers>
            {selectedOrder && (
              <Box>
                {/* Order Status */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                      <Typography variant="h6" fontWeight={600}>
                        Order Status
                      </Typography>
                      <Chip
                        icon={getStatusIcon(selectedOrder.status)}
                        label={selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                        color={getStatusColor(selectedOrder.status) as any}
                        variant="outlined"
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      Order placed on {new Date(selectedOrder.created_at).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Order Items
                    </Typography>
                    <Stack spacing={2}>
                      {selectedOrder.order_items.map((item: OrderItem) => (
                        <Paper
                          key={item.id}
                          sx={{
                            p: 2,
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: 1,
                          }}
                        >
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                              src={item.product.image}
                              sx={{ width: 60, height: 60 }}
                              variant="rounded"
                            />
                            <Box flex={1}>
                              <Typography variant="subtitle1" fontWeight={600}>
                                {item.product.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.product.category.name}
                              </Typography>
                              <Typography variant="body2">
                                Quantity: {item.quantity} × ₹{parseFloat(item.price).toLocaleString()}
                              </Typography>
                            </Box>
                            <Typography variant="h6" fontWeight={600} color="primary">
                              ₹{parseFloat(item.subtotal).toLocaleString()}
                            </Typography>
                          </Stack>
                        </Paper>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>

                {/* Order Summary */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Order Summary
                    </Typography>
                    <Stack spacing={1}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2">Subtotal:</Typography>
                        <Typography variant="body2">
                          ₹{parseFloat(selectedOrder.total).toLocaleString()}
                        </Typography>
                      </Stack>
                      <Divider />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={600}>Total:</Typography>
                        <Typography variant="h6" fontWeight={600} color="primary">
                          ₹{parseFloat(selectedOrder.total).toLocaleString()}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Delivery Address
                    </Typography>
                    <Stack direction="row" alignItems="flex-start" spacing={1}>
                      <LocationOn color="action" />
                      <Box>
                        <Typography variant="body2">
                          {selectedOrder.address.street}
                        </Typography>
                        <Typography variant="body2">
                          {selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.postal_code}
                        </Typography>
                        <Typography variant="body2">
                          {selectedOrder.address.country}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            )}
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseDialog} variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Box>
    );
  } catch (error) {
    console.error('Error in OrderHistoryPage render:', error);
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Something went wrong while rendering the page. Please try refreshing.
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </Box>
    );
  }
};

export default OrderHistoryPage;
