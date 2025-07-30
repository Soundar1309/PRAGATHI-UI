import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Rating } from "@mui/material";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Amit Sharma",
    avatar: "/assets/avatar1.png",
    rating: 5,
    text: "The freshest, healthiest produce I’ve ever tasted. Pragathi Farms has changed the way my family eats!",
  },
  {
    name: "Priya Menon",
    avatar: "/assets/avatar2.png",
    rating: 4,
    text: "I love knowing my food is grown sustainably. The team is so friendly and helpful.",
  },
  {
    name: "Rahul Verma",
    avatar: "/assets/avatar3.png",
    rating: 5,
    text: "Fast delivery, great quality, and I feel good supporting local farmers.",
  },
  {
    name: "Sahana Rao",
    avatar: "/assets/avatar4.png",
    rating: 5,
    text: "The farm tours are amazing! My kids learned so much about nature and healthy eating.",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function TestimonialsPage() {
  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h3" fontWeight={800} color="text.primary" mb={2} textAlign="center">
            Testimonials
          </Typography>
          <Typography variant="h6" color="text.primary" mb={5} textAlign="center">
            Hear from our happy customers and community members.
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {testimonials.map((t, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={t.name}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariant}
                transition={{ delay: i * 0.1 }}
              >
                <Card elevation={3} sx={{ borderRadius: 3, bgcolor: "#fff", p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar src={t.avatar} alt={t.name} sx={{ width: 56, height: 56, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="text.primary">
                        {t.name}
                      </Typography>
                      <Rating value={t.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="body1" color="text.primary">
                      “{t.text}”
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
