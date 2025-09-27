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
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  Refresh,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

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
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  isLoading?: boolean;
}> = ({ title, value, icon, color, isLoading }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2">
            {title}
          </Typography>
          <Typography variant="h4" component="div" color={color}>
            {isLoading ? <CircularProgress size={24} /> : value}
          </Typography>
        </Box>
        <Box color={color}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
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
  const theme = useTheme();
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

      const token = localStorage.getItem('access_token');
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
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="textSecondary">
            Last updated: {new Date(stats.last_updated).toLocaleString()}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <StatCard
          title="Total Orders"
          value={stats.total_orders.toLocaleString()}
          icon={<ShoppingCart sx={{ fontSize: 40 }} />}
          color={theme.palette.primary.main}
          isLoading={isRefreshing}
        />
        <StatCard
          title="Products Sold"
          value={stats.total_products_sold.toLocaleString()}
          icon={<TrendingUp sx={{ fontSize: 40 }} />}
          color={theme.palette.success.main}
          isLoading={isRefreshing}
        />
        <StatCard
          title="Total Users"
          value={stats.total_users.toLocaleString()}
          icon={<People sx={{ fontSize: 40 }} />}
          color={theme.palette.info.main}
          isLoading={isRefreshing}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.total_revenue.toLocaleString()}`}
          icon={<AttachMoney sx={{ fontSize: 40 }} />}
          color={theme.palette.warning.main}
          isLoading={isRefreshing}
        />
      </Box>

      {/* Charts Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3, mb: 4 }}>
        {/* Orders per Day Chart */}
        <Paper sx={{ p: 3, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Orders per Day (Last 30 Days)
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.orders_per_day}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => [value, 'Orders']}
              />
              <Bar dataKey="count" fill={theme.palette.primary.main} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Sales by Category Chart */}
        <Paper sx={{ p: 3, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Sales by Category
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
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
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Monthly Revenue Chart */}
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Revenue Trends
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthly_revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={theme.palette.success.main} 
                strokeWidth={2}
                dot={{ fill: theme.palette.success.main, strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>    

      {/* Tables Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        {/* Recent Orders */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Orders
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.recent_orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.user_email}</TableCell>
                    <TableCell>
                      <StatusChip status={order.status} />
                    </TableCell>
                    <TableCell align="right">₹{order.total.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Top Products */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Top Selling Products
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Qty Sold</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.top_products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                        {product.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{product.quantity_sold}</TableCell>
                    <TableCell align="right">₹{product.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};
