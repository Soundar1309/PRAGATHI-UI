import { Box, Container, Typography, Grid, Card, CardContent, Chip } from "@mui/material";
import EcoIcon from "@mui/icons-material/FamilyRestroom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PublicIcon from "@mui/icons-material/Public";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <EcoIcon color="success" sx={{ fontSize: 48 }} />,
    title: "Organic Farming",
    desc: "No chemicals, no pesticides—just pure, natural produce grown with care for the earth.",
  },
  {
    icon: <FavoriteIcon color="error" sx={{ fontSize: 48 }} />,
    title: "Health Benefits",
    desc: "Nutrient-rich, chemical-free food that supports your family’s well-being and vitality.",
  },
  {
    icon: <PublicIcon color="primary" sx={{ fontSize: 48 }} />,
    title: "Eco-Living",
    desc: "Sustainable practices that protect biodiversity and conserve water and soil.",
  },
  {
    icon: <LocalDiningIcon color="warning" sx={{ fontSize: 48 }} />,
    title: "Farm-to-Table Freshness",
    desc: "Enjoy the taste of just-harvested produce, delivered directly from our fields.",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function BenefitsPage() {
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
              label="🌱 Why Choose Us" 
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
              Benefits Of Pragathi Farms
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
              Discover the advantages of choosing organic, sustainable, and healthy living with us.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4} alignItems="center">
          {benefits.map((b, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={b.title}>
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
                    display: "flex",
                    alignItems: "center",
                    p: 4,
                    borderRadius: 2,
                    bgcolor: "#fff",
                    minHeight: { xs: 180, md: 200 },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Box sx={{ mr: 4, flexShrink: 0 }}>
                    {b.icon}
                  </Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography 
                      variant="h5" 
                      fontWeight={700} 
                      color="text.primary" 
                      mb={2}
                      sx={{ fontSize: { xs: '1.3rem', md: '1.4rem' } }}
                    >
                      {b.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.6
                      }}
                    >
                      {b.desc}
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
