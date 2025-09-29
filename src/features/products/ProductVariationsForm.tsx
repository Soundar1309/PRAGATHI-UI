import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Chip,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import type { ProductVariation, CreateProductVariationData } from '../../api/products';
import { productVariationsApi } from '../../api/products';

interface ProductVariationsFormProps {
  productId: number;
  onVariationsChange?: (variations: ProductVariation[]) => void;
}

interface VariationFormData {
  quantity: string;
  unit: string;
  price: string;
  original_price: string;
  stock: string;
  image: File | null;
  imagePreview: string | null;
}

const UNIT_CHOICES = [
  { value: 'ml', label: 'Milliliter (ml)' },
  { value: 'l', label: 'Liter (l)' },
  { value: 'g', label: 'Gram (g)' },
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'nos', label: 'Numbers (nos)' },
  { value: 'pcs', label: 'Pieces (pcs)' },
];

export function ProductVariationsForm({ productId, onVariationsChange }: ProductVariationsFormProps) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<VariationFormData>({
    quantity: '',
    unit: 'ml',
    price: '',
    original_price: '',
    stock: '',
    image: null,
    imagePreview: null,
  });

  // Load existing variations
  useEffect(() => {
    loadVariations();
  }, [productId]);

  const loadVariations = async () => {
    try {
      setIsLoading(true);
      const response = await productVariationsApi.getAll({ product_id: productId });
      setVariations(response.results || response);
      onVariationsChange?.(response.results || response);
    } catch (error) {
      console.error('Failed to load variations:', error);
      enqueueSnackbar('Failed to load product variations', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (field: keyof VariationFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

      setFormData(prev => ({ ...prev, image: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, imagePreview: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.quantity || !formData.price || !formData.stock) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return false;
    }

    const quantity = parseFloat(formData.quantity);
    const price = parseFloat(formData.price);
    const originalPrice = parseFloat(formData.original_price) || 0;
    const stock = parseInt(formData.stock);

    if (quantity <= 0) {
      enqueueSnackbar('Quantity must be greater than 0', { variant: 'error' });
      return false;
    }

    if (price <= 0) {
      enqueueSnackbar('Price must be greater than 0', { variant: 'error' });
      return false;
    }

    if (originalPrice > 0 && price >= originalPrice) {
      enqueueSnackbar('Price must be less than original price to show as an offer', { variant: 'error' });
      return false;
    }

    if (stock < 0) {
      enqueueSnackbar('Stock cannot be negative', { variant: 'error' });
      return false;
    }

    return true;
  };

  const handleCreateVariation = async () => {
    if (!validateForm()) return;

    try {
      setIsCreating(true);

      const variationData: CreateProductVariationData = {
        product: productId,
        quantity: parseFloat(formData.quantity),
        unit: formData.unit,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : undefined,
        stock: parseInt(formData.stock),
        image: formData.image || undefined,
        is_active: true,
      };

      await productVariationsApi.create(variationData);
      enqueueSnackbar('Product variation created successfully!', { variant: 'success' });

      // Reset form
      setFormData({
        quantity: '',
        unit: 'ml',
        price: '',
        original_price: '',
        stock: '',
        image: null,
        imagePreview: null,
      });
      setShowForm(false);

      // Reload variations
      await loadVariations();
    } catch (error: any) {
      console.error('Failed to create variation:', error);
      const errorMessage = error?.response?.data?.quantity?.[0] ||
        error?.response?.data?.price?.[0] ||
        error?.response?.data?.stock?.[0] ||
        error?.response?.data?.non_field_errors?.[0] ||
        'Failed to create product variation';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteVariation = async (variationId: number) => {
    if (!window.confirm('Are you sure you want to delete this variation?')) return;

    try {
      await productVariationsApi.delete(variationId);
      enqueueSnackbar('Product variation deleted successfully!', { variant: 'success' });
      await loadVariations();
    } catch (error) {
      console.error('Failed to delete variation:', error);
      enqueueSnackbar('Failed to delete product variation', { variant: 'error' });
    }
  };

  const resetForm = () => {
    setFormData({
      quantity: '',
      unit: 'ml',
      price: '',
      original_price: '',
      stock: '',
      image: null,
      imagePreview: null,
    });
    setShowForm(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          background: theme.palette.background.paper,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            Product Variations
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowForm(true)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Add Variation
          </Button>
        </Box>

        {/* Existing Variations */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : variations.length > 0 ? (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {variations.map((variation) => (
              <Box key={variation.id} sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <Card
                  sx={{
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    borderRadius: 2,
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {variation.display_name}
                      </Typography>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteVariation(variation.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {variation.image && (
                      <Box sx={{ mb: 2, textAlign: 'center' }}>
                        <img
                          src={variation.image}
                          alt={variation.display_name}
                          style={{
                            width: '100%',
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: 8,
                          }}
                        />
                      </Box>
                    )}

                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Price: ₹{variation.price}
                      </Typography>
                      {variation.has_offer && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                          Original: ₹{variation.original_price}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={`Stock: ${variation.stock}`}
                        size="small"
                        color={variation.available ? 'success' : 'error'}
                        variant="outlined"
                      />
                      {variation.has_offer && (
                        <Chip
                          label={`${variation.discount_percentage}% OFF`}
                          size="small"
                          color="success"
                          variant="filled"
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </ Box>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ mb: 3 }}>
            No variations added yet. Click "Add Variation" to create product variations with different quantities and units.
          </Alert>
        )}

        {/* Add Variation Form */}
        {showForm && (
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid',
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.light + '05',
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Add New Variation
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Quantity"
                  value={formData.quantity}
                  onChange={(e) => handleFormChange('quantity', e.target.value)}
                  fullWidth
                  type="number"
                  required
                  inputProps={{ min: 0, step: 0.01 }}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth required>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    value={formData.unit}
                    onChange={(e) => handleFormChange('unit', e.target.value)}
                    label="Unit"
                    sx={{ borderRadius: 2 }}
                  >
                    {UNIT_CHOICES.map((unit) => (
                      <MenuItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Price"
                  value={formData.price}
                  onChange={(e) => handleFormChange('price', e.target.value)}
                  fullWidth
                  type="number"
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  inputProps={{ min: 0, step: 0.01 }}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Original Price (Optional)"
                  value={formData.original_price}
                  onChange={(e) => handleFormChange('original_price', e.target.value)}
                  fullWidth
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  inputProps={{ min: 0, step: 0.01 }}
                  sx={{ borderRadius: 2 }}
                  helperText="Leave empty to automatically use the price"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Stock"
                  value={formData.stock}
                  onChange={(e) => handleFormChange('stock', e.target.value)}
                  fullWidth
                  type="number"
                  required
                  inputProps={{ min: 0 }}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>

              <Grid size={12}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Variation Image (Optional)
                  </Typography>
                  <Box
                    sx={{
                      border: `2px dashed ${theme.palette.primary.main}`,
                      borderRadius: 2,
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: theme.palette.primary.light + '10',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light + '20',
                      },
                    }}
                    onClick={() => document.getElementById('variation-image-upload')?.click()}
                  >
                    <input
                      id="variation-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />

                    {formData.imagePreview ? (
                      <Box>
                        <img
                          src={formData.imagePreview}
                          alt="Variation preview"
                          style={{
                            maxWidth: '100%',
                            maxHeight: 120,
                            borderRadius: 8,
                            marginBottom: 8,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Click to change image
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <CloudUploadIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mb: 1 }} />
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          Click to upload image
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          PNG, JPG, JPEG up to 5MB
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleCreateVariation}
                disabled={isCreating}
                startIcon={isCreating ? <CircularProgress size={16} /> : <AddIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {isCreating ? 'Creating...' : 'Create Variation'}
              </Button>

              <Button
                variant="outlined"
                onClick={resetForm}
                disabled={isCreating}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}
