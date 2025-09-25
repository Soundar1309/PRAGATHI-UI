import React from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import BlogCard from '../../components/BlogCard';
import { useGetBlogsQuery } from './api';
import type { Blog } from '../../api/blogs';

const BlogList: React.FC = () => {
  const theme = useTheme();

  // API queries
  const {
    data: blogs = [],
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
    error: blogsError,
  } = useGetBlogsQuery({});


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


      {/* Results Count */}
      {!isLoadingBlogs && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            {blogs.length} blog{blogs.length !== 1 ? 's' : ''} found
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
                background: theme.palette.background.paper,
                border: `1px dashed ${theme.palette.primary.main}`,
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No blogs found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Check back later for new blog posts.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BlogList;
