import { useState } from 'react';
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
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  Stack,
  Container,
} from '@mui/material';
import ProductImage from '../../components/ProductImage';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductPartialMutation } from './api';
import { useSnackbar } from 'notistack';

export function ProductsList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductPartial] = useUpdateProductPartialMutation();
  
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
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'flex-start', sm: 'space-between' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 2, sm: 0 },
            mb: 4 
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 1,
                  fontFamily: `'Playfair Display', 'Merriweather', serif`,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
                }}
              >
                Manage Products
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ 
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
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
                fontSize: { xs: '0.875rem', sm: '1rem' },
                minHeight: { xs: 44, sm: 48 },
                px: { xs: 2, sm: 3 },
                width: { xs: '100%', sm: 'auto' },
                mt: { xs: 1, sm: 0 }
              }}
            >
              Add Product
            </Button>
          </Box>

          {/* Products Display - Responsive */}
          {isMobile ? (
            // Mobile Card Layout
            <Box>
              {products && products.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {products.map((product) => (
                    <Box key={product.id}>
                      <Card 
                        sx={{ 
                          borderRadius: 2, 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          '&:hover': {
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease-in-out'
                          }
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ProductImage
                              src={product.image}
                              alt={product.title}
                              variant="avatar"
                              sx={{ width: { xs: 50, sm: 60 }, height: { xs: 50, sm: 60 }, mr: 2 }}
                            />
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`, 
                                  fontWeight: 600,
                                  mb: 0.5,
                                  fontSize: { xs: '1rem', sm: '1.25rem' },
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {product.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ 
                                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}
                              >
                                {product.category?.name || 'No Category'}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Stack 
                            direction="row" 
                            spacing={{ xs: 1.5, sm: 2 }} 
                            sx={{ 
                              mb: 2,
                              flexWrap: 'wrap',
                              gap: { xs: 1, sm: 0 }
                            }}
                          >
                            <Box sx={{ minWidth: { xs: '30%', sm: 'auto' } }}>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                              >
                                Price
                              </Typography>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`, 
                                  fontWeight: 600,
                                  color: theme.palette.primary.main,
                                  fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}
                              >
                                ₹{product.price}
                              </Typography>
                            </Box>
                            <Box sx={{ minWidth: { xs: '30%', sm: 'auto' } }}>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                              >
                                Stock
                              </Typography>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                                  fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}
                              >
                                {product.stock}
                              </Typography>
                            </Box>
                             <Box sx={{ minWidth: { xs: '30%', sm: 'auto' } }}>
                               <Typography 
                                 variant="caption" 
                                 color="text.secondary"
                                 sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                               >
                                 Status
                               </Typography>
                               <Box sx={{ mt: 0.5 }}>
                                 <Chip
                                   label={(product.is_in_stock && product.stock > 0) ? 'In Stock' : 'Out of Stock'}
                                   color={(product.is_in_stock && product.stock > 0) ? 'success' : 'error'}
                                   size="small"
                                   variant="outlined"
                                   sx={{ 
                                     fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                     height: { xs: 20, sm: 24 }
                                   }}
                                 />
                               </Box>
                             </Box>
                          </Stack>
                        </CardContent>
                        
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            size="small"
                            startIcon={<ViewIcon />}
                            onClick={() => handleViewProduct(product.id)}
                            sx={{ 
                              color: theme.palette.info.main,
                              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                              fontWeight: 600
                            }}
                          >
                            View
                          </Button>
                          <Button
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditProduct(product.id)}
                            sx={{ 
                              color: theme.palette.primary.main,
                              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                              fontWeight: 600
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(product)}
                            sx={{ 
                              color: theme.palette.error.main,
                              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                              fontWeight: 600
                            }}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No products found. Create your first product!
                  </Typography>
                </Box>
              )}
            </Box>
          ) : (
            // Desktop Table Layout
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
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>In Stock</TableCell>
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
                            label={(product.is_in_stock && product.stock > 0) ? 'In Stock' : 'Out of Stock'}
                            color={(product.is_in_stock && product.stock > 0) ? 'success' : 'error'}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant={product.is_in_stock ? 'contained' : 'outlined'}
                            color={product.is_in_stock ? 'success' : 'error'}
                            onClick={async () => {
                              try {
                                await updateProductPartial({ id: product.id, data: { is_in_stock: !product.is_in_stock } }).unwrap();
                                enqueueSnackbar(`Marked ${!product.is_in_stock ? 'In Stock' : 'Out of Stock'}`, { variant: 'success' });
                                refetch();
                              } catch (e: any) {
                                enqueueSnackbar(e?.data?.detail || 'Failed to update stock status', { variant: 'error' });
                              }
                            }}
                          >
                            {product.is_in_stock ? 'In Stock' : 'Out of Stock'}
                          </Button>
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
          )}
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
