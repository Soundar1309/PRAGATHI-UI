import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const blogs = [
  {
    title: "Why Organic Farming Matters",
    image: "/assets/blog1.jpg",
    excerpt: "Explore the impact of organic farming on health, environment, and local communities.",
  },
  {
    title: "Sustainable Living Tips",
    image: "/assets/blog2.jpg",
    excerpt: "Simple ways to make your home and lifestyle more eco-friendly.",
  },
  {
    title: "Meet Our Farmers",
    image: "/assets/blog3.jpg",
    excerpt: "Stories from the people who make Pragathi Farms possible.",
  },
  {
    title: "Seasonal Recipes",
    image: "/assets/blog4.jpg",
    excerpt: "Delicious, healthy recipes using our freshest produce.",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function BlogPage() {
  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h3" fontWeight={800} color="text.primary" mb={2} textAlign="center">
            Blog
          </Typography>
          <Typography variant="h6" color="text.primary" mb={5} textAlign="center">
            Insights, stories, and tips from Pragathi Nature Farms.
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {blogs.map((b, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={b.title}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariant}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "#fff",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 8px 32px rgba(60,60,60,0.13)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={b.image}
                    alt={b.title}
                    sx={{ height: 180, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} color="text.primary" mb={1}>
                      {b.title}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {b.excerpt}
                    </Typography>
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
