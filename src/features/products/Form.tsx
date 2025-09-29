import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper,
  useTheme,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useCreateProductMutation, useUpdateProductMutation, useGetProductQuery, useGetCategoriesQuery } from './api';
import { useSnackbar } from 'notistack';
import { ProductVariationsForm } from './ProductVariationsForm';

interface ProductFormProps {
  productId?: number;
}

export function ProductForm({ productId }: ProductFormProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    stock: '',
    unit: '1 kg',
    category_id: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string>('');

  // API hooks
  const { data: product, isLoading: isLoadingProduct } = useGetProductQuery(productId!, { 
    skip: !productId 
  });
  const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const isLoading = isLoadingProduct || isLoadingCategories || isCreating || isUpdating;

  React.useEffect(() => {
    if (product) {
      setForm({
        title: product.title || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        original_price: product.original_price?.toString() || '',
        stock: product.stock?.toString() || '',
        unit: product.unit || '1 kg',
        category_id: product.category_id?.toString() || '',
      });
      // Set image preview if product has an image
      if (product.image) {
        setImagePreview(product.image);
      }
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear price validation error when user types
    if (name === 'original_price' || name === 'price') {
      setPriceError('');
    }
  };

  const handleCategoryChange = (e: any) => {
    setForm({ ...form, category_id: e.target.value });
  };

  const validatePrices = () => {
    const originalPrice = parseFloat(form.original_price) || 0;
    const price = parseFloat(form.price) || 0;
    
    if (originalPrice > 0 && price > 0 && price >= originalPrice) {
      setPriceError('Price must be less than original price to show as an offer');
      return false;
    }
    
    setPriceError('');
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        enqueueSnackbar('Please select a valid image file', { variant: 'error' });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        enqueueSnackbar('Image size should be less than 5MB', { variant: 'error' });
        return;
      }

      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePrices()) {
      return;
    }
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('stock', form.stock);
      formData.append('unit', form.unit);
      formData.append('category_id', form.category_id);
      
      // Add original_price if provided
      if (form.original_price) {
        formData.append('original_price', form.original_price);
      }
      
      // Automatically set offer_price to the same value as price
      formData.append('offer_price', form.price);
      
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

    if (productId) {
        await updateProduct({ id: productId, data: formData }).unwrap();
        enqueueSnackbar('Product updated successfully!', { variant: 'success' });
    } else {
        await createProduct(formData).unwrap();
        enqueueSnackbar('Product created successfully!', { variant: 'success' });
      }
      navigate('/admin/products');
    } catch (err: any) {
      const errorMessage = err?.data?.title?.[0] || 
                          err?.data?.description?.[0] || 
                          err?.data?.price?.[0] || 
                          err?.data?.stock?.[0] || 
                          err?.data?.category_id?.[0] || 
                          err?.data?.image?.[0] || 
                          err?.data?.original_price?.[0] ||
                          err?.data?.non_field_errors?.[0] || 
                          'Failed to save product';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
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
                fontFamily: 'Playfair Display, serif',
              }}
            >
              {productId ? 'Edit Product' : 'Create New Product'}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontFamily: 'Inter, sans-serif' }}
            >
              {productId ? 'Update product information' : 'Add a new product to your store'}
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              label="Product Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'Inter, sans-serif',
                },
              }}
              inputProps={{
                maxLength: 255,
              }}
            />
            
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              required
              variant="outlined"
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'Inter, sans-serif',
                },
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                disabled={isLoading}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontFamily: 'Inter, sans-serif',
                  },
                }}
                inputProps={{
                  min: 0,
                  step: 0.01,
                }}
                helperText="This will be displayed as the offer price"
              />
              
              <TextField
                label="Stock"
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                variant="outlined"
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontFamily: 'Inter, sans-serif',
                  },
                }}
                inputProps={{
                  min: 0,
                }}
              />
            </Box>

            <TextField
              label="Unit"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              disabled={isLoading}
              placeholder="e.g., 1 kg, 500 ml, 10 nos"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'Inter, sans-serif',
                },
              }}
              inputProps={{
                maxLength: 50,
              }}
              helperText="Product unit (e.g., '1 kg', '500 ml', '10 nos')"
            />

            {/* Original Price Field */}
            <Typography variant="h6" sx={{ mt: 3, mb: 2, fontFamily: 'Inter, sans-serif', color: theme.palette.primary.main }}>
              Pricing Options
            </Typography>
            
            <TextField
              label="Original Price"
              name="original_price"
              type="number"
              value={form.original_price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={isLoading}
              placeholder="Leave empty to use product price"
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'Inter, sans-serif',
                },
              }}
              inputProps={{
                min: 0,
                step: 0.01,
              }}
              helperText="Leave empty to automatically use the product price. This will be shown with strikethrough when price is lower."
            />

            {priceError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {priceError}
              </Alert>
            )}

            <FormControl fullWidth margin="normal" disabled={isLoading}>
              <InputLabel>Category</InputLabel>
              <Select
                value={form.category_id}
                onChange={handleCategoryChange}
                label="Category"
                required
                sx={{
                  borderRadius: 2,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Image Upload Section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Inter, sans-serif' }}>
                Product Image
              </Typography>
              
              <Box
                sx={{
                  border: `2px dashed ${theme.palette.primary.main}`,
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: theme.palette.primary.light + '10',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light + '20',
                  },
                }}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  disabled={isLoading}
                />
                
                {imagePreview ? (
                  <Box>
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: 200,
                        borderRadius: 8,
                        marginBottom: 16,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Click to change image
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <CloudUploadIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                    <Typography variant="body1" sx={{ mb: 1, fontFamily: 'Inter, sans-serif' }}>
                      Click to upload image
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      PNG, JPG, JPEG up to 5MB
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Product Variations Section - Only show for existing products */}
            {productId && (
              <ProductVariationsForm
                productId={productId}
              />
            )}

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
                disabled={isLoading || !form.title.trim() || !form.category_id}
                startIcon={isLoading ? <CircularProgress size={20} /> : (productId ? <EditIcon /> : <AddIcon />)}
                sx={{
                  flex: { xs: 1, sm: 'none' },
                  minHeight: 48,
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                {isLoading ? 'Saving...' : (productId ? 'Update Product' : 'Create Product')}
              </Button>
              
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={isLoading}
                sx={{
                  flex: { xs: 1, sm: 'none' },
                  minHeight: 48,
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
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
