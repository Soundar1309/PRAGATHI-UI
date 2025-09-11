import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useTheme,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ProductImage from '../../components/ProductImage';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useGetProductsQuery, useDeleteProductMutation } from './api';
import { useSnackbar } from 'notistack';

export function ProductsList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: number; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateProduct = () => {
    navigate('/admin/products/new');
  };

  const handleEditProduct = (productId: number) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  const handleViewProduct = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleDeleteClick = (product: { id: number; title: string }) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id).unwrap();
      enqueueSnackbar('Product deleted successfully!', { variant: 'success' });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      refetch(); // Refresh the list
    } catch (err: any) {
      const errorMessage = err?.data?.detail || 'Failed to delete product';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Failed to load products. Please try again.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`,
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 3,
            background: theme.palette.background.paper,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 1,
                  fontFamily: `'Playfair Display', 'Merriweather', serif`,
                }}
              >
                Manage Products
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}
              >
                Create, edit, and delete products in your store
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateProduct}
              sx={{
                fontWeight: 600,
                fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                minHeight: 48,
                px: 3,
              }}
            >
              Add Product
            </Button>
          </Box>

          {/* Products Table */}
          <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Image</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Price</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Stock</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <ProductImage
                          src={product.image}
                          alt={product.title}
                          variant="avatar"
                          sx={{ width: 50, height: 50 }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`, fontWeight: 600 }}>
                        {product.title}
                      </TableCell>
                      <TableCell sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                        {product.category?.name || 'No Category'}
                      </TableCell>
                      <TableCell sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`, fontWeight: 600 }}>
                        ₹{product.price}
                      </TableCell>
                      <TableCell sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                        {product.stock}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          color={product.stock > 0 ? 'success' : 'error'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleViewProduct(product.id)}
                            sx={{ color: theme.palette.info.main }}
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEditProduct(product.id)}
                            sx={{ color: theme.palette.primary.main }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(product)}
                            sx={{ color: theme.palette.error.main }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No products found. Create your first product!
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`, fontWeight: 600 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
            Are you sure you want to delete the product "{productToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleDeleteCancel}
            disabled={isDeleting}
            sx={{
              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : <DeleteIcon />}
            sx={{
              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
              fontWeight: 600,
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Container component for consistent layout
const Container: React.FC<{ children: React.ReactNode; maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }> = ({ 
  children, 
  maxWidth = 'xl' 
}) => (
  <Box
    sx={{
      maxWidth: {
        xs: '100%',
        sm: maxWidth === 'xs' ? 600 : maxWidth === 'sm' ? 960 : maxWidth === 'md' ? 1280 : maxWidth === 'lg' ? 1920 : '100%',
      },
      mx: 'auto',
    }}
  >
    {children}
  </Box>
); 