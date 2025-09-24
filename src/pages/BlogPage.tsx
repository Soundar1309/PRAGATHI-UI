import React from 'react';
import { Container, Box } from '@mui/material';
import BlogList from '../features/blogs/BlogList';

const BlogPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth={false} sx={{ py: 4 }}>
        <BlogList />
      </Container>
    </Box>
  );
};

export default BlogPage;
