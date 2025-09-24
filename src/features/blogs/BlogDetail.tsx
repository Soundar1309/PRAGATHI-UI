import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Chip,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  TextField,
  Alert,
  Snackbar,
  useTheme,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  AccessTime,
  CalendarToday,
  Person,
  Facebook,
  Twitter,
  LinkedIn,
  WhatsApp,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import { useGetBlogQuery, useGetRelatedBlogsQuery, useAddBlogCommentMutation } from './api';
import type { Blog } from '../../api/blogs';

const BlogDetail: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    author_email: '',
    content: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // API queries
  const {
    data: blog,
    isLoading,
    isError,
  } = useGetBlogQuery(slug!, { skip: !slug });

  const {
    data: relatedBlogs = [],
  } = useGetRelatedBlogsQuery(slug!, { skip: !slug });

  const [addComment, { isLoading: isSubmittingComment }] = useAddBlogCommentMutation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;

    try {
      await addComment({
        slug,
        comment: commentForm,
      }).unwrap();
      
      setCommentForm({ author_name: '', author_email: '', content: '' });
      setSnackbarMessage('Comment submitted successfully! It will be reviewed before being published.');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to submit comment. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleShare = (platform: string) => {
    if (!blog) return;
    
    const url = window.location.href;
    const title = blog.title;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Typography>Loading blog...</Typography>
      </Box>
    );
  }

  if (isError || !blog) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Blog not found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/blog')}>
          Back to Blog
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/blog')}
          sx={{ textDecoration: 'none' }}
        >
          Blog
        </Link>
        {blog.category && (
          <Typography variant="body2" color="text.secondary">
            {blog.category.name}
          </Typography>
        )}
        <Typography variant="body2" color="text.primary">
          {blog.title}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Hero Image */}
          {blog.hero_image && (
            <Box sx={{ mb: 4 }}>
              <img
                src={blog.hero_image}
                alt={blog.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: Number(theme.shape.borderRadius) * 2,
                }}
              />
            </Box>
          )}

          {/* Title */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            {blog.title}
          </Typography>

          {/* Meta Information */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              {/* Author */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  <Person />
                </Avatar>
                <Typography variant="body2" color="text.secondary">
                  {blog.author.username}
                </Typography>
              </Box>

              {/* Date */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarToday sx={{ fontSize: '1rem' }} />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(blog.published_date)}
                </Typography>
              </Box>

              {/* Reading Time */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTime sx={{ fontSize: '1rem' }} />
                <Typography variant="body2" color="text.secondary">
                  {blog.reading_time} min read
                </Typography>
              </Box>
            </Box>

            {/* Category and Tags */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {blog.category && (
                <Chip
                  label={blog.category.name}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              )}
              {blog.featured && (
                <Chip
                  label="Featured"
                  color="secondary"
                  size="small"
                />
              )}
              {blog.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>

          {/* Share Buttons */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Share this article:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                startIcon={<Facebook />}
                onClick={() => handleShare('facebook')}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                Facebook
              </Button>
              <Button
                size="small"
                startIcon={<Twitter />}
                onClick={() => handleShare('twitter')}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                Twitter
              </Button>
              <Button
                size="small"
                startIcon={<LinkedIn />}
                onClick={() => handleShare('linkedin')}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                LinkedIn
              </Button>
              <Button
                size="small"
                startIcon={<WhatsApp />}
                onClick={() => handleShare('whatsapp')}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                WhatsApp
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Blog Content */}
          <Box
            sx={{
              '& h2': {
                fontSize: '1.8rem',
                fontWeight: 600,
                mt: 4,
                mb: 2,
                color: theme.palette.text.primary,
              },
              '& h3': {
                fontSize: '1.4rem',
                fontWeight: 600,
                mt: 3,
                mb: 1.5,
                color: theme.palette.text.primary,
              },
              '& p': {
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 2,
                color: theme.palette.text.primary,
              },
              '& ul, & ol': {
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 2,
                pl: 3,
              },
              '& li': {
                mb: 0.5,
              },
              '& strong': {
                fontWeight: 600,
                color: theme.palette.text.primary,
              },
            }}
            dangerouslySetInnerHTML={{ __html: blog.content || '' }}
          />

          <Divider sx={{ my: 4 }} />

          {/* Comments Section */}
          <Box>
            <Typography variant="h5" gutterBottom>
              Leave a Comment
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Share your thoughts on this article. Your comment will be reviewed before being published.
            </Typography>

            <Card>
              <CardContent>
                <Box component="form" onSubmit={handleCommentSubmit}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        value={commentForm.author_name}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, author_name: e.target.value }))}
                        required
                        disabled={isSubmittingComment}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Your Email"
                        type="email"
                        value={commentForm.author_email}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, author_email: e.target.value }))}
                        required
                        disabled={isSubmittingComment}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Your Comment"
                        multiline
                        rows={4}
                        value={commentForm.content}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                        required
                        disabled={isSubmittingComment}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmittingComment}
                        sx={{ minWidth: 120 }}
                      >
                        {isSubmittingComment ? 'Submitting...' : 'Submit Comment'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Related Posts
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {relatedBlogs.map((relatedBlog: Blog) => (
                  <Box key={relatedBlog.id} sx={{ maxWidth: '100%' }}>
                    <BlogCard blog={relatedBlog} />
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Author Info */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About the Author
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 48, height: 48 }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {blog.author.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Blog Author
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Passionate about organic farming and sustainable living. Sharing knowledge and experiences
                to help others on their journey towards a healthier, more sustainable lifestyle.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogDetail;
