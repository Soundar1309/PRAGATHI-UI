import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper,
  useTheme,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { useGetCategoryQuery, useCreateCategoryMutation, useUpdateCategoryMutation } from './api';
import { useSnackbar } from 'notistack';

interface CategoryFormProps {
  categoryId?: number;
}

export function CategoryForm({ categoryId }: CategoryFormProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  // API hooks
  const { data: category, isLoading: isLoadingCategory } = useGetCategoryQuery(categoryId!, { 
    skip: !categoryId 
  });
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const isLoading = isLoadingCategory || isCreating || isUpdating;

  React.useEffect(() => {
    if (category) {
      setForm({
        name: category.name || '',
        description: category.description || '',
      });
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (categoryId) {
        await updateCategory({ id: categoryId, data: form }).unwrap();
        enqueueSnackbar('Category updated successfully!', { variant: 'success' });
      } else {
        await createCategory(form).unwrap();
        enqueueSnackbar('Category created successfully!', { variant: 'success' });
      }
      navigate('/admin/categories');
    } catch (err: any) {
      const errorMessage = err?.data?.name?.[0] || 
                          err?.data?.description?.[0] || 
                          err?.data?.non_field_errors?.[0] || 
                          'Failed to save category';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const handleCancel = () => {
    navigate('/admin/categories');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`,
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 3,
            background: theme.palette.background.paper,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
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
              {categoryId ? 'Edit Category' : 'Create New Category'}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif` }}
            >
              {categoryId ? 'Update category information' : 'Add a new product category to your store'}
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="Category Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                },
              }}
              inputProps={{
                maxLength: 100,
              }}
            />
            
            <TextField
              label="Description (Optional)"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                },
              }}
              inputProps={{
                maxLength: 500,
              }}
            />

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mt: 4,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || !form.name.trim()}
                startIcon={isLoading ? <CircularProgress size={20} /> : (categoryId ? <EditIcon /> : <AddIcon />)}
                sx={{
                  flex: { xs: 1, sm: 'none' },
                  minHeight: 48,
                  fontWeight: 600,
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                {isLoading ? 'Saving...' : (categoryId ? 'Update Category' : 'Create Category')}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={isLoading}
                sx={{
                  flex: { xs: 1, sm: 'none' },
                  minHeight: 48,
                  fontWeight: 600,
                  fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// Container component for consistent layout
const Container: React.FC<{ children: React.ReactNode; maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }> = ({ 
  children, 
  maxWidth = 'md' 
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