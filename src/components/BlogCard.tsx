import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  useTheme,
  type SxProps,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import type { Blog } from '../api/blogs';

interface BlogCardProps {
  blog: Blog;
  sx?: SxProps;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, sx }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${blog.slug}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
        ...sx,
      }}
    >
      {/* Thumbnail Image */}
      {blog.thumbnail && (
        <CardMedia
          component="img"
          height="200"
          image={blog.thumbnail}
          alt={blog.title}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category and Featured Badge */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {blog.category && (
            <Chip
              label={blog.category.name}
              size="small"
              color="primary"
              variant="outlined"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            />
          )}
          {blog.featured && (
            <Chip
              label="Featured"
              size="small"
              color="secondary"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            />
          )}
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            lineHeight: 1.3,
            mb: 1.5,
            color: theme.palette.text.primary,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '2.6em', // Ensure consistent height for 2 lines
          }}
        >
          {blog.title}
        </Typography>

        {/* Summary */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '0.9rem',
            lineHeight: 1.5,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flexGrow: 1,
          }}
        >
          {blog.summary}
        </Typography>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
            {blog.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.7rem',
                  height: 20,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            ))}
            {blog.tags.length > 3 && (
              <Chip
                label={`+${blog.tags.length - 3}`}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.7rem',
                  height: 20,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
            )}
          </Box>
        )}

        {/* Meta Information */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            fontSize: '0.8rem',
            color: theme.palette.text.secondary,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PersonIcon sx={{ fontSize: '0.9rem' }} />
            <Typography variant="caption">
              {blog.author.username}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: '0.9rem' }} />
            <Typography variant="caption">
              {formatDate(blog.published_date)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
            <Typography variant="caption">
              {blog.reading_time} min read
            </Typography>
          </Box>
        </Box>

        {/* Read More Button */}
        <Button
          variant="contained"
          onClick={handleReadMore}
          sx={{
            mt: 'auto',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            py: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
