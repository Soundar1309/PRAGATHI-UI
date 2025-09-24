import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import BlogCard from '../../components/BlogCard';
import { useGetBlogsQuery, useGetBlogCategoriesQuery, useGetBlogTagsQuery } from './api';
import type { Blog, BlogCategory, BlogTag } from '../../api/blogs';

interface BlogFilters {
  search: string;
  category: string;
  tag: string;
  featured: boolean | null;
}

const BlogList: React.FC = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    category: '',
    tag: '',
    featured: null,
  });
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // API queries
  const {
    data: blogs = [],
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
    error: blogsError,
  } = useGetBlogsQuery({
    search: debouncedSearch || undefined,
    category: filters.category || undefined,
    tag: filters.tag || undefined,
    featured: filters.featured || undefined,
  });

  const {
    data: categoriesData = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetBlogCategoriesQuery();

  const {
    data: tagsData = [],
    isLoading: isLoadingTags,
    isError: isErrorTags,
  } = useGetBlogTagsQuery();

  // Ensure data is always an array
  const categories = Array.isArray(categoriesData) ? categoriesData : [];
  const tags = Array.isArray(tagsData) ? tagsData : [];

  const handleFilterChange = (key: keyof BlogFilters, value: string | boolean | null) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      tag: '',
      featured: null,
    });
    setDebouncedSearch('');
  };

  const hasActiveFilters = filters.search || filters.category || filters.tag || filters.featured !== null;

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Our Blog
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem' },
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Discover insights, tips, and stories about organic farming, sustainable living, and healthy nutrition.
        </Typography>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: alpha(theme.palette.background.paper, 0.8),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: theme.shadows[2],
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <FilterListIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Filter & Search
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Search */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search blogs..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Category Filter */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value)}
                sx={{ borderRadius: 2 }}
                disabled={isLoadingCategories || isErrorCategories}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category: BlogCategory) => (
                  <MenuItem key={category.id} value={category.slug}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Tag Filter */}
          <Grid size={{ xs: 12, md: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Tag</InputLabel>
              <Select
                value={filters.tag}
                label="Tag"
                onChange={(e) => handleFilterChange('tag', e.target.value)}
                sx={{ borderRadius: 2 }}
                disabled={isLoadingTags || isErrorTags}
              >
                <MenuItem value="">All Tags</MenuItem>
                {tags.map((tag: BlogTag) => (
                  <MenuItem key={tag.id} value={tag.slug}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Featured Filter */}
          <Grid size={{ xs: 12, md: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.featured === null ? '' : filters.featured.toString()}
                label="Type"
                onChange={(e) => {
                  const value = e.target.value;
                  handleFilterChange('featured', value === '' ? null : value === 'true');
                }}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">All Posts</MenuItem>
                <MenuItem value="true">Featured</MenuItem>
                <MenuItem value="false">Regular</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Active Filters & Clear Button */}
        {hasActiveFilters && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              Active filters:
            </Typography>
            {filters.search && (
              <Chip
                label={`Search: "${filters.search}"`}
                onDelete={() => handleFilterChange('search', '')}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {filters.category && (
              <Chip
                label={`Category: ${categories.find((c: BlogCategory) => c.slug === filters.category)?.name}`}
                onDelete={() => handleFilterChange('category', '')}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {filters.tag && (
              <Chip
                label={`Tag: ${tags.find((t: BlogTag) => t.slug === filters.tag)?.name}`}
                onDelete={() => handleFilterChange('tag', '')}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            {filters.featured !== null && (
              <Chip
                label={`Type: ${filters.featured ? 'Featured' : 'Regular'}`}
                onDelete={() => handleFilterChange('featured', null)}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
            <Button
              startIcon={<ClearIcon />}
              onClick={clearFilters}
              size="small"
              sx={{ ml: 'auto' }}
            >
              Clear All
            </Button>
          </Box>
        )}
      </Box>

      {/* Results Count */}
      {!isLoadingBlogs && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            {blogs.length} blog{blogs.length !== 1 ? 's' : ''} found
            {hasActiveFilters && ' matching your filters'}
          </Typography>
        </Box>
      )}

      {/* Loading State */}
      {isLoadingBlogs && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      )}

      {/* Error State */}
      {isErrorBlogs && (
        <Alert severity="error" sx={{ mb: 4 }}>
          Failed to load blogs. Please try again later.
          {blogsError && ' ' + String(blogsError)}
        </Alert>
      )}

      {/* Blog Grid */}
      {!isLoadingBlogs && !isErrorBlogs && (
        <>
          {blogs.length > 0 ? (
            <Grid container spacing={3}>
              {blogs.map((blog: Blog) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={blog.id}>
                  <BlogCard blog={blog} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 3,
                borderRadius: 3,
                background: alpha(theme.palette.background.paper, 0.5),
                border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No blogs found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {hasActiveFilters
                  ? 'Try adjusting your filters or search terms.'
                  : 'Check back later for new blog posts.'}
              </Typography>
              {hasActiveFilters && (
                <Button variant="outlined" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BlogList;
