import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip } from "@mui/material";
import { motion } from "framer-motion";

const blogs = [
  {
    title: "TNOCD Certification: Our Commitment to Organic Excellence",
    image: "/assets/img1.png",
    excerpt: "Learn about our Tamil Nadu Organic Certification Department (TNOCD) certification with registration number TNO(F) 973 and what it means for our farming practices.",
    category: "Certification",
    date: "2024-01-15",
    readTime: "5 min read"
  },
  {
    title: "Jeevamirtham Preparation: Ancient Wisdom Meets Modern Engineering",
    image: "/assets/img2.png",
    excerpt: "Discover our engineering solutions for Jeevamirtham preparation and how we combine traditional natural farming methods with modern technology.",
    category: "Natural Farming",
    date: "2024-01-10",
    readTime: "7 min read"
  },
  {
    title: "Native Varieties: Preserving Biodiversity in Jakkarpalayam",
    image: "/assets/millets.jpg",
    excerpt: "Explore our cultivation of native varieties of crops, oils, and seeds that help maintain the ecological balance in our region.",
    category: "Biodiversity",
    date: "2024-01-05",
    readTime: "6 min read"
  },
  {
    title: "Farm Internship Program: Training the Next Generation",
    image: "/assets/img3.png",
    excerpt: "Join our Natural Farming Education services and Farm Internship Program to learn sustainable farming practices and become part of the agricultural revolution.",
    category: "Education",
    date: "2023-12-28",
    readTime: "8 min read"
  },
  {
    title: "Bio Digester Design: Sustainable Waste Management",
    image: "/assets/img4.png",
    excerpt: "Learn about our innovative bio digester design solutions that help convert organic waste into valuable resources for farming.",
    category: "Technology",
    date: "2023-12-20",
    readTime: "6 min read"
  },
  {
    title: "A2 Manure: The Secret to Healthy Soil",
    image: "/assets/img5.png",
    excerpt: "Discover the benefits of A2 manure and other value-added farm produce that contribute to soil health and crop productivity.",
    category: "Soil Health",
    date: "2023-12-15",
    readTime: "5 min read"
  },
  {
    title: "Cow Hostel: Caring for Native Breeds",
    image: "/assets/img6.png",
    excerpt: "Meet our native breed cows and learn about our Cow Hostel program that supports traditional animal husbandry practices.",
    category: "Animal Husbandry",
    date: "2023-12-10",
    readTime: "7 min read"
  },
  {
    title: "Micro Irrigation & Farm Automation: The Future of Farming",
    image: "/assets/img7.png",
    excerpt: "Explore how we use micro irrigation and farm automation to address modern farming challenges while maintaining sustainable practices.",
    category: "Innovation",
    date: "2023-12-05",
    readTime: "9 min read"
  }
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function BlogPage() {
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
              label="📝 Latest Blog Posts"
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
              Blog
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
              Insights, stories, and tips from Pragathi Nature Farms.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {blogs.map((b, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={b.title}>
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
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={b.image}
                    alt={b.title}
                    sx={{
                      height: { xs: 200, md: 180 },
                      objectFit: "cover",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                    {/* Category and Date */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip
                        label={b.category}
                        size="small"
                        sx={{
                          background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </Typography>
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="text.primary"
                      mb={2}
                      sx={{ 
                        fontSize: { xs: '1.1rem', md: '1.2rem' },
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {b.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        flexGrow: 1,
                        lineHeight: 1.6,
                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2
                      }}
                    >
                      {b.excerpt}
                    </Typography>

                    {/* Read time and date */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {b.readTime}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {new Date(b.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
