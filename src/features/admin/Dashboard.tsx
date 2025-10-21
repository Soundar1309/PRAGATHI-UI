import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Avatar,
  Skeleton,
  IconButton,
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  Refresh,
  Dashboard as DashboardIcon,
  Analytics,
  Timeline,
  Assessment,
  ArrowUpward,
  ArrowDownward,
  MoreVert,
  Visibility,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { motion } from 'framer-motion';

// API function
const fetchDashboardStats = async (token: string) => {
  const response = await fetch('http://localhost:8000/api/admin/stats/', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }

  return response.json();
};

interface DashboardStats {
  total_orders: number;
  total_products_sold: number;
  total_users: number;
  total_revenue: number;
  orders_per_day: Array<{ date: string; count: number }>;
  sales_by_category: Array<{ category: string; value: number }>;
  monthly_revenue: Array<{ month: string; value: number }>;
  recent_orders: Array<{
    id: number;
    user_email: string;
    status: string;
    total: number;
    created_at: string;
  }>;
  top_products: Array<{
    title: string;
    quantity_sold: number;
    revenue: number;
  }>;
  last_updated: string;
  trends: {
    orders_trend: number;
    products_sold_trend: number;
    users_trend: number;
    revenue_trend: number;
  };
  monthly_comparison: {
    current_month: {
      orders: number;
      products_sold: number;
      users: number;
      revenue: number;
    };
    previous_month: {
      orders: number;
      products_sold: number;
      users: number;
      revenue: number;
    };
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  isLoading?: boolean;
  trend?: number;
  subtitle?: string;
}> = ({ title, value, icon, color, isLoading, trend, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card 
      sx={{ 
        height: '100%',
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Box>
            <Typography
              color="text.secondary"
              variant="body2"
              fontWeight={600}
              sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.75rem' }}
            >
              {title}
            </Typography>
            <Typography
              variant="h3"
              component="div"
              fontWeight={700}
              sx={{
                background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
              }}
            >
              {isLoading ? <Skeleton width={80} height={40} /> : value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: `${color}15`,
              color: color,
              width: 56,
              height: 56,
              boxShadow: `0 4px 20px ${color}30`,
            }}
          >
            {icon}
          </Avatar>
        </Stack>

        {trend !== undefined && (
          <Stack direction="row" alignItems="center" spacing={1}>
            {trend > 0 ? (
              <ArrowUpward sx={{ color: 'success.main', fontSize: 16 }} />
            ) : trend < 0 ? (
              <ArrowDownward sx={{ color: 'error.main', fontSize: 16 }} />
            ) : null}
            <Typography
              variant="body2"
              color={trend > 0 ? 'success.main' : trend < 0 ? 'error.main' : 'text.secondary'}
              fontWeight={600}
            >
              {trend > 0 ? `+${trend}%` : trend < 0 ? `${trend}%` : '0%'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              vs last month
            </Typography>
          </Stack>
        )}
      </CardContent>

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, transparent 0%, ${color}05 100%)`,
          pointerEvents: 'none',
        }}
      />
    </Card>
  </motion.div>
);

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'shipped':
      case 'delivered':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      color={getStatusColor(status) as any}
      size="small"
    />
  );
};

export const AdminDashboard: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardStats = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const data = await fetchDashboardStats(token);
      setStats(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data';
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const handleRefresh = () => {
    loadDashboardStats(true);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={handleRefresh} startIcon={<Refresh />}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!stats) {
    return (
      <Alert severity="warning">
        No dashboard data available
      </Alert>
    );
  }

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
        {/* Modern Header */}
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
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 48,
                  height: 48,
                  boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
                }}
              >
                <DashboardIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" component="h1" fontWeight={700} color="text.primary">
                  Admin Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Welcome back! Here's what's happening with your business today.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Chip
                icon={<Timeline />}
                label={`Last updated: ${new Date(stats.last_updated).toLocaleString()}`}
                variant="outlined"
                sx={{
                  background: 'rgba(25, 118, 210, 0.1)',
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                }}
              />
              <Button
                variant="contained"
                startIcon={isRefreshing ? <CircularProgress size={16} /> : <Refresh />}
                onClick={handleRefresh}
                disabled={isRefreshing}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {/* Modern Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Orders"
              value={stats.total_orders.toLocaleString()}
              icon={<ShoppingCart sx={{ fontSize: 28 }} />}
              color="#667eea"
              isLoading={isRefreshing}
              trend={stats.trends.orders_trend}
              subtitle={`${stats.monthly_comparison.current_month.orders} this month`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Products Sold"
              value={stats.total_products_sold.toLocaleString()}
              icon={<TrendingUp sx={{ fontSize: 28 }} />}
              color="#00C49F"
              isLoading={isRefreshing}
              trend={stats.trends.products_sold_trend}
              subtitle={`${stats.monthly_comparison.current_month.products_sold} this month`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Users"
              value={stats.total_users.toLocaleString()}
              icon={<People sx={{ fontSize: 28 }} />}
              color="#FFBB28"
              isLoading={isRefreshing}
              trend={stats.trends.users_trend}
              subtitle={`${stats.monthly_comparison.current_month.users} new this month`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title="Total Revenue"
              value={`₹${stats.total_revenue.toLocaleString()}`}
              icon={<AttachMoney sx={{ fontSize: 28 }} />}
              color="#FF8042"
              isLoading={isRefreshing}
              trend={stats.trends.revenue_trend}
              subtitle={`₹${stats.monthly_comparison.current_month.revenue.toLocaleString()} this month`}
            />
          </Grid>
        </Grid>

        {/* Modern Charts Row */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                sx={{
                  p: 3,
                  height: 400,
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 1,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: '#667eea', width: 40, height: 40 }}>
                      <Analytics />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Orders per Day
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last 30 days performance
                      </Typography>
                    </Box>
                  </Stack>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Stack>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={stats.orders_per_day}>
                    <defs>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#667eea" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: '#666' }}
                      axisLine={{ stroke: '#e0e0e0' }}
                    />
                    <YAxis tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#e0e0e0' }} />
                    <RechartsTooltip
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: 8,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      }}
                      labelFormatter={(value: string) => new Date(value).toLocaleDateString()}
                      formatter={(value: number) => [value, 'Orders']}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#667eea"
                      strokeWidth={2}
                      fill="url(#colorOrders)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Paper
                sx={{
                  p: 3,
                  height: 400,
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 1,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: '#00C49F', width: 40, height: 40 }}>
                      <Assessment />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Sales by Category
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Revenue distribution
                      </Typography>
                    </Box>
                  </Stack>
                  <IconButton size="small">
                    <Visibility />
                  </IconButton>
                </Stack>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={stats.sales_by_category}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => `${props.category} ${(props.percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.sales_by_category.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: 8,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Monthly Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Paper 
            sx={{ 
              p: 3, 
              height: 400,
              mb: 10,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: 1,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: '#FF8042', width: 40, height: 40 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Monthly Revenue Trends
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    12 months revenue analysis
                  </Typography>
                </Box>
              </Stack>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Stack>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={stats.monthly_revenue}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8042" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF8042" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#e0e0e0' }} />
                <RechartsTooltip
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FF8042"
                  strokeWidth={3}
                  dot={{ fill: '#FF8042', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#FF8042', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </motion.div>

        {/* Modern Tables Row */}
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {/* Recent Orders Table */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 1,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: '#667eea', width: 40, height: 40 }}>
                      <ShoppingCart />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Recent Orders
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Latest customer orders
                      </Typography>
                    </Box>
                  </Stack>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Stack>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 600, color: 'text.primary' } }}>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.recent_orders.length > 0 ? (
                        stats.recent_orders.map((order) => (
                          <TableRow
                            key={order.id}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.05)'
                              }
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" fontWeight={600} color="primary">
                                #{order.id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" noWrap>
                                {order.user_email}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <StatusChip status={order.status} />
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={600}>
                                ₹{order.total.toLocaleString()}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                            <Typography variant="body2" color="text.secondary">
                              No recent orders
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </motion.div>
          </Grid>

          {/* Top Products Table */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: 1,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: '#00C49F', width: 40, height: 40 }}>
                      <TrendingUp />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Top Products
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Best selling items
                      </Typography>
                    </Box>
                  </Stack>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Stack>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 600, color: 'text.primary' } }}>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Qty Sold</TableCell>
                        <TableCell align="right">Revenue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.top_products.length > 0 ? (
                        stats.top_products.map((product, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(0, 196, 159, 0.05)'
                              }
                            }}
                          >
                            <TableCell>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  sx={{
                                    maxWidth: 200,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  {product.title}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={600}>
                                {product.quantity_sold}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={600} color="success.main">
                                ₹{product.revenue.toLocaleString()}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                            <Typography variant="body2" color="text.secondary">
                              No product data available
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};
