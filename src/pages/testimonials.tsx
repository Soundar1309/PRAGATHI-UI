import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Rating, Chip, CircularProgress, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

interface GooglePlaceDetails {
  result: {
    reviews: GoogleReview[];
    rating: number;
    user_ratings_total: number;
  };
}

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallRating, setOverallRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  // You'll need to replace this with your actual Google Place ID
  // You can find this in Google Places API documentation
  const PLACE_ID = "YOUR_GOOGLE_PLACE_ID_HERE";
  const API_KEY = "YOUR_GOOGLE_API_KEY_HERE";

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        
        // For development, we'll use a mock API call
        // In production, you would call the Google Places API
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data: GooglePlaceDetails = await response.json();
        
        if (data.result && data.result.reviews) {
          setReviews(data.result.reviews.slice(0, 8)); // Limit to 8 reviews
          setOverallRating(data.result.rating);
          setTotalReviews(data.result.user_ratings_total);
        } else {
          // Fallback to mock data if API fails
          setReviews([
            {
              author_name: "Amit Sharma",
              profile_photo_url: "/assets/avatar1.png",
              rating: 5,
              relative_time_description: "2 weeks ago",
              text: "The freshest, healthiest produce I've ever tasted. Pragathi Farms has changed the way my family eats!"
            },
            {
              author_name: "Priya Menon",
              profile_photo_url: "/assets/avatar2.png",
              rating: 4,
              relative_time_description: "1 month ago",
              text: "I love knowing my food is grown sustainably. The team is so friendly and helpful."
            },
            {
              author_name: "Rahul Verma",
              profile_photo_url: "/assets/avatar3.png",
              rating: 5,
              relative_time_description: "3 weeks ago",
              text: "Fast delivery, great quality, and I feel good supporting local farmers."
            },
            {
              author_name: "Sahana Rao",
              profile_photo_url: "/assets/avatar4.png",
              rating: 5,
              relative_time_description: "1 week ago",
              text: "The farm tours are amazing! My kids learned so much about nature and healthy eating."
            }
          ]);
          setOverallRating(4.8);
          setTotalReviews(127);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
        
        // Fallback to mock data
        setReviews([
          {
            author_name: "Amit Sharma",
            profile_photo_url: "/assets/avatar1.png",
            rating: 5,
            relative_time_description: "2 weeks ago",
            text: "The freshest, healthiest produce I've ever tasted. Pragathi Farms has changed the way my family eats!"
          },
          {
            author_name: "Priya Menon",
            profile_photo_url: "/assets/avatar2.png",
            rating: 4,
            relative_time_description: "1 month ago",
            text: "I love knowing my food is grown sustainably. The team is so friendly and helpful."
          },
          {
            author_name: "Rahul Verma",
            profile_photo_url: "/assets/avatar3.png",
            rating: 5,
            relative_time_description: "3 weeks ago",
            text: "Fast delivery, great quality, and I feel good supporting local farmers."
          },
          {
            author_name: "Sahana Rao",
            profile_photo_url: "/assets/avatar4.png",
            rating: 5,
            relative_time_description: "1 week ago",
            text: "The farm tours are amazing! My kids learned so much about nature and healthy eating."
          }
        ]);
        setOverallRating(4.8);
        setTotalReviews(127);
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: "100vh", 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff9800, #ffc107)',
          opacity: 0.08,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={sectionVariant}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="⭐ Customer Reviews" 
              sx={{ 
                mb: 3, 
                px: 3, 
                py: 1, 
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(67, 176, 71, 0.3)'
              }} 
            />
            <Typography 
              variant="h2" 
              fontWeight={900} 
              sx={{ 
                background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Testimonials
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.3rem' }
              }}
            >
              Hear from our happy customers and community members.
            </Typography>
            
            {/* Overall Rating Display */}
            {overallRating > 0 && (
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Rating value={overallRating} readOnly size="large" />
                <Typography variant="h6" fontWeight={600} color="text.primary">
                  {overallRating.toFixed(1)} out of 5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({totalReviews} reviews)
                </Typography>
              </Box>
            )}
          </Box>
        </motion.div>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : (
          <Grid container spacing={4}>
            {reviews.map((review, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={`${review.author_name}-${i}`}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariant}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Card 
                    elevation={0} 
                    sx={{ 
                      borderRadius: 2, 
                      bgcolor: "#fff", 
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Avatar 
                        src={review.profile_photo_url || "/assets/default-avatar.png"} 
                        alt={review.author_name} 
                        sx={{ 
                          width: { xs: 60, md: 70 }, 
                          height: { xs: 60, md: 70 }, 
                          mr: 3,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }} 
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h6" 
                          fontWeight={700} 
                          color="text.primary"
                          sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' } }}
                        >
                          {review.author_name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Rating 
                            value={review.rating} 
                            readOnly 
                            size="small" 
                          />
                          <Typography variant="body2" color="text.secondary">
                            {review.relative_time_description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 0, flexGrow: 1 }}>
                      <Typography 
                        variant="body1" 
                        color="text.primary"
                        sx={{ 
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          lineHeight: 1.6,
                          fontStyle: 'italic'
                        }}
                      >
                        "{review.text}"
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
