import { Box, Container, Typography, Grid, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function GalleryPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Typography variant="h3" fontWeight={800} color="#111" mb={4} textAlign="center">
          Gallery
        </Typography>
        {/* Categories for demonstration; adjust as needed for your real categories */}
        {[
          { label: 'Landscapes', range: [1, 12] },
          { label: 'Crops & Fields', range: [13, 24] },
          { label: 'Farm Animals', range: [25, 36] },
          { label: 'People & Activities', range: [37, 48] },
          { label: 'Nature & Biodiversity', range: [49, 60] },
          { label: 'Events & Workshops', range: [61, 69] },
        ].map((cat) => (
          <Box key={cat.label} sx={{ mb: 5 }}>
            <Typography variant="h5" fontWeight={600} color="#222" mb={2}>
              {cat.label}
            </Typography>
            <Grid container spacing={2}>
              {Array.from({ length: cat.range[1] - cat.range[0] + 1 }, (_, i) => cat.range[0] + i).map((imgNum) => (
                <Grid size={{ xs: 12, sm: 6, md: 3, lg: 2 }} key={imgNum}>
                  <Card sx={{ boxShadow: 1, borderRadius: 2, bgcolor: "#fff" }}>
                    <CardMedia
                      component="img"
                      image={`/assets/img${imgNum}.png`}
                      alt={`${cat.label} ${imgNum}`}
                      sx={{ height: 160, objectFit: "cover", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </motion.div>
    </Container>
  );
}
