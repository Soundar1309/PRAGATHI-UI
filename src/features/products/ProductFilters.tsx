import {
    Clear as ClearIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    FilterList as FilterIcon,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Collapse,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export interface ProductFilters {
  search?: string;
  category_id?: number;
  product_type?: string;
  is_in_stock?: boolean;
  has_offer?: boolean;
  min_price?: number;
  max_price?: number;
  min_stock?: number;
  max_stock?: number;
  ordering?: string;
}

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: Array<{ id: number; name: string }>;
  onClearFilters: () => void;
}

const PRODUCT_TYPES = [
  { value: 'solid', label: 'Solid (Rice, Pulses, etc.)' },
  { value: 'liquid', label: 'Liquid (Oil, etc.)' },
  { value: 'other', label: 'Other' },
];

const ORDERING_OPTIONS = [
  { value: '-created_at', label: 'Newest First' },
  { value: 'created_at', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
  { value: '-title', label: 'Title Z-A' },
  { value: 'price', label: 'Price Low to High' },
  { value: '-price', label: 'Price High to Low' },
  { value: 'stock', label: 'Stock Low to High' },
  { value: '-stock', label: 'Stock High to Low' },
];

export function ProductFiltersComponent({
  filters,
  onFiltersChange,
  categories,
  onClearFilters,
}: ProductFiltersProps) {
  const [expanded, setExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters);

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => 
      value !== undefined && value !== '' && value !== null
    ).length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon />
          <Typography variant="h6">Filters</Typography>
          {activeFiltersCount > 0 && (
            <Chip 
              label={activeFiltersCount} 
              size="small" 
              color="primary" 
            />
          )}
        </Box>
        <Box>
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          {activeFiltersCount > 0 && (
            <Button
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              size="small"
              color="secondary"
            >
              Clear All
            </Button>
          )}
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Grid container spacing={2}>
          {/* Search */}
          <Grid size={{ xs: 12, md: 6 }} component="div">
            <TextField
              fullWidth
              label="Search Products"
              placeholder="Search by title, description, or category..."
              value={localFilters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              size="small"
            />
          </Grid>

          {/* Category */}
          <Grid size={{ xs: 12, md: 6 }} component="div">
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={localFilters.category_id || ''}
                onChange={(e) => handleFilterChange('category_id', e.target.value || undefined)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Product Type */}
          <Grid size={{ xs: 12, md: 6 }} component="div">
            <FormControl fullWidth size="small">
              <InputLabel>Product Type</InputLabel>
              <Select
                value={localFilters.product_type || ''}
                onChange={(e) => handleFilterChange('product_type', e.target.value || undefined)}
                label="Product Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {PRODUCT_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Stock Status */}
          <Grid size={{ xs: 12, md: 6 }} component="div">
            <FormControl fullWidth size="small">
              <InputLabel>Stock Status</InputLabel>
              <Select
                value={localFilters.is_in_stock === undefined ? '' : localFilters.is_in_stock}
                onChange={(e) => handleFilterChange('is_in_stock', e.target.value === '' ? undefined : e.target.value)}
                label="Stock Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">In Stock</MenuItem>
                <MenuItem value="false">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Offer Status */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Offer Status</InputLabel>
              <Select
                value={localFilters.has_offer === undefined ? '' : localFilters.has_offer}
                onChange={(e) => handleFilterChange('has_offer', e.target.value === '' ? undefined : e.target.value)}
                label="Offer Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">Has Offer</MenuItem>
                <MenuItem value="false">No Offer</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Ordering */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={localFilters.ordering || '-created_at'}
                onChange={(e) => handleFilterChange('ordering', e.target.value)}
                label="Sort By"
              >
                {ORDERING_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" gutterBottom>
              Price Range
            </Typography>
          </Grid>

          {/* Price Range */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Min Price (₹)"
              type="number"
              value={localFilters.min_price || ''}
              onChange={(e) => handleFilterChange('min_price', e.target.value ? Number(e.target.value) : undefined)}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Max Price (₹)"
              type="number"
              value={localFilters.max_price || ''}
              onChange={(e) => handleFilterChange('max_price', e.target.value ? Number(e.target.value) : undefined)}
              size="small"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" gutterBottom>
              Stock Range
            </Typography>
          </Grid>

          {/* Stock Range */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Min Stock"
              type="number"
              value={localFilters.min_stock || ''}
              onChange={(e) => handleFilterChange('min_stock', e.target.value ? Number(e.target.value) : undefined)}
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Max Stock"
              type="number"
              value={localFilters.max_stock || ''}
              onChange={(e) => handleFilterChange('max_stock', e.target.value ? Number(e.target.value) : undefined)}
              size="small"
            />
          </Grid>
        </Grid>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Active Filters:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {filters.search && (
                <Chip
                  label={`Search: "${filters.search}"`}
                  onDelete={() => handleFilterChange('search', undefined)}
                  size="small"
                />
              )}
              {filters.category_id && (
                <Chip
                  label={`Category: ${categories.find(c => c.id === filters.category_id)?.name || 'Unknown'}`}
                  onDelete={() => handleFilterChange('category_id', undefined)}
                  size="small"
                />
              )}
              {filters.product_type && (
                <Chip
                  label={`Type: ${PRODUCT_TYPES.find(t => t.value === filters.product_type)?.label || filters.product_type}`}
                  onDelete={() => handleFilterChange('product_type', undefined)}
                  size="small"
                />
              )}
              {filters.is_in_stock !== undefined && (
                <Chip
                  label={`Stock: ${filters.is_in_stock ? 'In Stock' : 'Out of Stock'}`}
                  onDelete={() => handleFilterChange('is_in_stock', undefined)}
                  size="small"
                />
              )}
              {filters.has_offer !== undefined && (
                <Chip
                  label={`Offer: ${filters.has_offer ? 'Has Offer' : 'No Offer'}`}
                  onDelete={() => handleFilterChange('has_offer', undefined)}
                  size="small"
                />
              )}
              {filters.min_price && (
                <Chip
                  label={`Min Price: ₹${filters.min_price}`}
                  onDelete={() => handleFilterChange('min_price', undefined)}
                  size="small"
                />
              )}
              {filters.max_price && (
                <Chip
                  label={`Max Price: ₹${filters.max_price}`}
                  onDelete={() => handleFilterChange('max_price', undefined)}
                  size="small"
                />
              )}
              {filters.min_stock && (
                <Chip
                  label={`Min Stock: ${filters.min_stock}`}
                  onDelete={() => handleFilterChange('min_stock', undefined)}
                  size="small"
                />
              )}
              {filters.max_stock && (
                <Chip
                  label={`Max Stock: ${filters.max_stock}`}
                  onDelete={() => handleFilterChange('max_stock', undefined)}
                  size="small"
                />
              )}
            </Stack>
          </Box>
        )}
      </Collapse>
    </Paper>
  );
}
