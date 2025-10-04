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
  Card,
  CardContent,
  CardActions,
  Grid,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from './api';
import { useSnackbar } from 'notistack';

export function CategoriesList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { data: categories, isLoading, isError, refetch } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: number; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateCategory = () => {
    navigate('/admin/categories/new');
  };

  const handleEditCategory = (categoryId: number) => {
    navigate(`/admin/categories/${categoryId}/edit`);
  };

  const handleDeleteClick = (category: { id: number; name: string }) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteCategory(categoryToDelete.id).unwrap();
      enqueueSnackbar('Category deleted successfully!', { variant: 'success' });
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
      refetch(); // Refresh the list
    } catch (err: any) {
      const errorMessage = err?.data?.detail || 'Failed to delete category';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
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
          Failed to load categories. Please try again.
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
      <Container maxWidth="lg">
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
                Manage Categories
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ 
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                Create, edit, and delete product categories
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateCategory}
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
              Add Category
            </Button>
          </Box>

          {/* Categories Display - Responsive */}
          {isMobile ? (
            // Mobile Card Layout
            <Box>
              {categories && categories.length > 0 ? (
                <Grid container spacing={2}>
                  {categories.map((category) => (
                    <Grid size={{ xs: 12 }} key={category.id}>
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
                          <Box sx={{ mb: 2 }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`, 
                                fontWeight: 600,
                                mb: 0.5,
                                fontSize: { xs: '1rem', sm: '1.25rem' },
                                color: theme.palette.primary.main
                              }}
                            >
                              {category.name}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ 
                                fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                              }}
                            >
                              ID: {category.id}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                            >
                              Description
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              {category.description ? (
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  sx={{ 
                                    fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                  }}
                                >
                                  {category.description}
                                </Typography>
                              ) : (
                                <Chip 
                                  label="No description" 
                                  size="small" 
                                  variant="outlined"
                                  sx={{ 
                                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                    height: { xs: 20, sm: 24 }
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        </CardContent>
                        
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditCategory(category.id)}
                            sx={{ 
                              color: theme.palette.primary.main,
                              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                              fontWeight: 600,
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              minHeight: { xs: 36, sm: 32 },
                              width: { xs: '100%', sm: 'auto' },
                              flex: { xs: 1, sm: 'none' }
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(category)}
                            sx={{ 
                              color: theme.palette.error.main,
                              fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                              fontWeight: 600,
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              minHeight: { xs: 36, sm: 32 },
                              width: { xs: '100%', sm: 'auto' },
                              flex: { xs: 1, sm: 'none' }
                            }}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No categories found. Create your first category!
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
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>ID</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Description</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <TableRow key={category.id} hover>
                        <TableCell sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                          {category.id}
                        </TableCell>
                        <TableCell sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`, fontWeight: 600 }}>
                          {category.name}
                        </TableCell>
                        <TableCell sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}>
                          {category.description ? (
                            <Typography variant="body2" color="text.secondary">
                              {category.description}
                            </Typography>
                          ) : (
                            <Chip label="No description" size="small" variant="outlined" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditCategory(category.id)}
                              sx={{ color: theme.palette.primary.main }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteClick(category)}
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
                      <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No categories found. Create your first category!
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
            Are you sure you want to delete the category "{categoryToDelete?.name}"? This action cannot be undone.
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
  maxWidth = 'lg' 
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