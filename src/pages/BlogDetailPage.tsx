import React from 'react';
import { Container, Box } from '@mui/material';
import BlogDetail from '../features/blogs/BlogDetail';

const BlogDetailPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth={false} sx={{ py: 4 }}>
        <BlogDetail />
      </Container>
    </Box>
  );
};

export default BlogDetailPage;
