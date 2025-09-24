import { Box, Container, Typography, Card, CardMedia, useTheme } from "@mui/material";
import { motion } from "framer-motion";


const imageVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3
    }
  }
};

// Helper function to get correct image path
const getImagePath = (imgNum: number): string => {
  // Handle special cases for misnamed images
  if (imgNum === 60) {
    return '/assets/imag60.webp'; // Fix typo: imag60 instead of img60
  }
  return `/assets/img${imgNum}.webp`;
};

export default function GalleryPage() {
  const theme = useTheme();

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      py: { xs: 2, md: 4 },
      px: { xs: 1, sm: 2, md: 3 },
      // Ensure visibility on mobile
      position: 'relative',
      zIndex: 1,
      backgroundColor: theme.palette.background.default,
      // Debug: add border to see if container is visible
      // border: '2px solid red', // Uncomment for debugging
    }}>
      <Container maxWidth="xl" sx={{
        width: '100%',
        // Ensure container is visible
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Gallery content - always visible */}
        <Box sx={{
          width: '100%',
          minHeight: '200px',
        }}>
          {/* Main gallery content without motion dependency */}
          <Box sx={{
            width: '100%',
            opacity: 1, // Always visible
          }}>
            <Typography
              variant="h3"
              fontWeight={800}
              color={theme.palette.text.primary}
              mb={{ xs: 3, md: 4 }}
              textAlign="center"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                // Ensure text is visible
                position: 'relative',
                zIndex: 3,
                // Debug: add background to see if text is visible
                backgroundColor: 'rgba(0,255,0,0.1)', // Green background for debugging
                padding: 1,
                borderRadius: 1,
              }}
            >
              Gallery
            </Typography>
            {/* Categories with available images only */}
            {[
              { label: 'Landscapes', range: [1, 12] },
              { label: 'Crops & Fields', range: [13, 24] },
              { label: 'Farm Animals', range: [25, 36] },
              { label: 'People & Activities', range: [37, 48] },
              { label: 'Nature & Biodiversity', range: [49, 60] },
              { label: 'Events & Workshops', range: [61, 69] },
            ].map((cat) => (
              <Box key={cat.label} sx={{ mb: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  color={theme.palette.text.primary}
                  mb={{ xs: 2, md: 3 }}
                  textAlign="center"
                  sx={{
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                    backgroundColor: 'rgba(0,0,255,0.1)', // Blue background for debugging
                    padding: 1,
                    borderRadius: 1,
                  }}
                >
                  {cat.label} ({cat.range[1] - cat.range[0] + 1} images)
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                      xl: 'repeat(5, 1fr)',
                    },
                    gap: { xs: 1, sm: 2, md: 3 },
                    justifyContent: 'center',
                  }}
                >
                  {Array.from({ length: cat.range[1] - cat.range[0] + 1 }, (_, i) => cat.range[0] + i).map((imgNum) => (
                    <Box
                      key={imgNum}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        mb: 1,
                      }}
                    >
                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        whileHover="hover"
                        variants={imageVariant}
                        style={{
                          width: '100%',
                          height: '100%',
                          // Ensure visibility on mobile
                          opacity: 1,
                          transform: 'scale(1)',
                        }}
                      >
                        <Card
                          sx={{
                            boxShadow: { xs: 1, sm: 2, md: 3 },
                            borderRadius: { xs: 2, sm: 3, md: 3 },
                            bgcolor: theme.palette.background.paper,
                            width: '100%',
                            height: '100%',
                            maxWidth: { xs: '100%', sm: 320, md: 300 },
                            transition: 'all 0.3s ease-in-out',
                            overflow: 'hidden',
                            '&:hover': {
                              transform: { xs: 'scale(1.02)', sm: 'scale(1.05)' },
                              boxShadow: { xs: 3, sm: 6, md: 8 },
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={getImagePath(imgNum)}
                            alt={`${cat.label} image ${imgNum}`}
                            onError={(e) => {
                              console.log(`Failed to load image: ${getImagePath(imgNum)}`);
                              const target = e.target as HTMLImageElement;
                              // Set fallback background
                              target.style.backgroundColor = theme.palette.grey[200];
                              target.style.display = 'flex';
                              target.style.alignItems = 'center';
                              target.style.justifyContent = 'center';
                              target.style.color = theme.palette.text.secondary;
                              target.style.fontSize = '14px';
                              target.style.textAlign = 'center';
                              target.alt = 'Image not available';
                            }}
                            sx={{
                              height: { xs: 200, sm: 180, md: 160, lg: 150 },
                              width: '100%',
                              maxWidth: '100%',
                              objectFit: "cover",
                              objectPosition: "center",
                              display: 'block',
                              backgroundColor: theme.palette.grey[100],
                              transition: 'transform 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              }
                            }}
                          />
                        </Card>
                      </motion.div>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
