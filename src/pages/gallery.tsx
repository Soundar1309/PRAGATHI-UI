import { Box, Container, Typography, Grid, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function GalleryPage() {
  return (
    <Container maxWidth="xl" sx={{ 
        py: { xs: 4, md: 8 },
        mt: { xs: '80px', sm: '100px', md: '120px' },
        px: { xs: 2, sm: 3, md: 4 }
    }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Typography variant="h3" fontWeight={800} color="#111" mb={6} textAlign="center">
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
          <Box key={cat.label} sx={{ mb: { xs: 4, md: 6 } }}>
            <Typography 
              variant="h5" 
              fontWeight={600} 
              color="#222" 
              mb={{ xs: 2, md: 3 }} 
              textAlign="center"
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' } }}
            >
              {cat.label}
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
              {Array.from({ length: cat.range[1] - cat.range[0] + 1 }, (_, i) => cat.range[0] + i).map((imgNum) => (
                <Grid 
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                  key={imgNum}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    mb: 2,
                  }}
                >
                  <Card 
                    sx={{ 
                      boxShadow: { xs: 1, sm: 2, md: 2 }, 
                      borderRadius: { xs: 2, sm: 3, md: 3 }, 
                      bgcolor: "#fff",
                      width: '100%',
                      maxWidth: { xs: '100%', sm: 300, md: 280 },
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: { xs: 'none', sm: 'translateY(-4px)' },
                        boxShadow: { xs: 2, sm: 4, md: 4 },
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`/assets/img${imgNum}.png`}
                      alt={`${cat.label} ${imgNum}`}
                      onError={(e) => {
                        console.log(`Failed to load image: /assets/img${imgNum}.png`);
                        // You could set a fallback image here if needed
                      }}
                      sx={{ 
                        height: { xs: 280, sm: 220, md: 200, lg: 180 }, 
                        objectFit: "cover", 
                        borderTopLeftRadius: { xs: 8, sm: 12, md: 12 }, 
                        borderTopRightRadius: { xs: 8, sm: 12, md: 12 },
                        width: '100%',
                        minHeight: { xs: 200, sm: 180, md: 160 },
                        backgroundColor: '#f5f5f5', // Fallback background color
                        display: 'block'
                      }}
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
