import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";
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
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h3" fontWeight={800} color="text.primary" mb={2} textAlign="center">
            Benefits Of Pragathi Farms
          </Typography>
          <Typography variant="h6" color="text.primary" mb={5} textAlign="center">
            Discover the advantages of choosing organic, sustainable, and healthy living with us.
          </Typography>
        </motion.div>
        <Grid container spacing={5} alignItems="center">
          {benefits.map((b, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={b.title}>
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
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "#fff",
                    minHeight: 160,
                  }}
                >
                  <Box sx={{ mr: 3 }}>{b.icon}</Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h5" fontWeight={700} color="text.primary" mb={1}>
                      {b.title}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
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
