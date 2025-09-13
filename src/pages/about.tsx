import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, useTheme, Stack, Chip } from "@mui/material";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const imageMotion = {
  rest: { scale: 1, filter: "brightness(1)", transition: { duration: 0.2 } },
  hover: { scale: 1.04, filter: "brightness(1.08)", transition: { duration: 0.3 } },
};

const imageStyle = {
  width: "100%",
  maxWidth: 500,
  height: "auto",
  borderRadius: 3,
  boxShadow: "0 4px 16px rgba(60,60,60,0.10)",
  border: "1.5px solid #e0e0e0",
  margin: "0 auto",
  display: "block",
  background: "#fafaf9",
};

export default function AboutPage() {
  const theme = useTheme();
  return (
    <Box sx={{ 
        bgcolor: theme.palette.background.default, 
        pb: 8,
        mt: { xs: '80px', sm: '100px', md: '120px' },
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 300, md: 500 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, rgba(67, 176, 71, 0.9), rgba(46, 125, 50, 0.8)), url('/assets/banner.jpeg') center/cover no-repeat`,
          overflow: 'hidden',
        }}
      >
        {/* Decorative background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
            zIndex: 1,
          }}
        />
        
        <Container maxWidth="lg" sx={{ zIndex: 2, textAlign: "center", py: { xs: 6, md: 10 } }}>
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={sectionVariant}
          >
            <Box sx={{ mb: 4 }}>
              <Chip 
                label="🌱 About Our Farm" 
                sx={{ 
                  mb: 3, 
                  px: 3, 
                  py: 1, 
                  fontSize: '1rem',
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }} 
              />
            </Box>
            
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                mb: 4,
                fontFamily: 'Playfair Display, serif',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #ffffff, #f0f8f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Pragathi Natural Farm
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 500,
                mb: 6,
                maxWidth: 800,
                mx: "auto",
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.4rem' },
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              A living example of regenerative, organic, and natural farming in Tamil Nadu, India. Our farm is a sanctuary for biodiversity, sustainability, and community-driven agriculture.
            </Typography>

            {/* Stats Section */}
            <Grid container spacing={4} sx={{ mt: 6 }}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
                    30+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Acres of Organic Land
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
                    10K+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Trees Planted
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
                    TNOCD
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Certified Organic
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
                    2010
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Established
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Philosophy Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: { xs: 8, md: 12 },
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
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariant}
              >
                <Box sx={{ position: 'relative' }}>
                  <motion.img
                    src="/assets/img25.png"
                    alt="Farm Philosophy"
                    style={{
                      ...imageStyle,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      border: '4px solid white',
                    }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={imageMotion}
                  />
                  {/* Floating decorative elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(67, 176, 71, 0.3)',
                    }}
                  >
                    🌱
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3} justifyContent="center" height="100%">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                  <Chip 
                    label="Our Philosophy" 
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
                    variant="h3" 
                    fontWeight={800} 
                    sx={{ 
                      background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 3,
                      fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                  >
                    Nurturing Nature's Wisdom
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.primary" 
                    mb={3}
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' },
                      lineHeight: 1.7,
                      textAlign: 'justify',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    At Pragathi Natural Farm, we believe that the earth is a living entity to be nurtured, not exploited. Our philosophy is rooted in the principles of natural farming, where every action is guided by respect for the land, water, and all living beings. We strive to create a self-sustaining ecosystem that supports biodiversity, soil health, and the well-being of our community.
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.primary"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' },
                      lineHeight: 1.7,
                      textAlign: 'justify',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    We are inspired by the teachings of Masanobu Fukuoka and Subhash Palekar, blending traditional wisdom with modern organic practices to cultivate food that is pure, nutritious, and grown in harmony with nature.
                  </Typography>
                </motion.div>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Organic Practices Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3} justifyContent="center" height="100%">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                <Chip 
                  label="🌿 Organic Practices" 
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
                  variant="h3" 
                  fontWeight={800} 
                  sx={{ 
                    background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  Regenerative Agriculture
                </Typography>
                
                <Typography variant="body1" color="text.primary" mb={3} sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }, lineHeight: 1.7 }}>
                  Our farm is a living laboratory for organic and regenerative agriculture. We use no synthetic fertilizers or pesticides. Instead, we rely on natural composting, green manures, mulching, and crop rotation to enrich the soil. Cows, goats, and poultry are integrated into our farming system, providing natural manure and helping to close the nutrient loop.
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }, lineHeight: 1.7 }}>
                  We practice intercropping, agroforestry, and water conservation through rainwater harvesting and drip irrigation. Our fields are alive with native trees, medicinal plants, and pollinator-friendly flowers, creating a resilient and productive landscape.
                </Typography>
              </motion.div>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
            >
              <Box sx={{ position: 'relative' }}>
                <motion.img
                  src="/assets/img21.png"
                  alt="Organic Practices"
                  style={{
                    ...imageStyle,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    border: '4px solid white',
                  }}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={imageMotion}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -20,
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff9800, #ffc107)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(255, 152, 0, 0.3)',
                  }}
                >
                  🌾
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Location & Biodiversity Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: { xs: 8, md: 12 },
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
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariant}
              >
                <Box sx={{ position: 'relative' }}>
                  <motion.img
                    src="/assets/img33.png"
                    alt="Farm Location"
                    style={{
                      ...imageStyle,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      border: '4px solid white',
                    }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={imageMotion}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
                    }}
                  >
                    🌍
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3} justifyContent="center" height="100%">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                  <Chip 
                    label="🌍 Location & Biodiversity" 
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
                    variant="h3" 
                    fontWeight={800} 
                    sx={{ 
                      background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 3,
                      fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                  >
                    A Natural Sanctuary
                  </Typography>
                  
                  <Typography variant="body1" color="text.primary" mb={3} sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }, lineHeight: 1.7 }}>
                    Pragathi Nature Farms is located in the lush heart of Tamil Nadu, near the Western Ghats. Our 30-acre farm is a mosaic of paddy fields, orchards, vegetable gardens, and forest patches. We have planted over 10,000 trees, creating a haven for birds, butterflies, and beneficial insects.
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }, lineHeight: 1.7 }}>
                    The farm is a living classroom for students, farmers, and visitors who wish to learn about sustainable agriculture, biodiversity, and rural livelihoods. We regularly host workshops, farm tours, and volunteering opportunities.
                  </Typography>
                </motion.div>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Founders' Vision Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={6} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3} justifyContent="center" height="100%">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                <Chip 
                  label="👨‍👩‍👧‍👦 Founders' Vision" 
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
                  variant="h3" 
                  fontWeight={800} 
                  sx={{ 
                    background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  Our Vision for the Future
                </Typography>
                
                <Typography variant="body1" color="text.primary" mb={3} sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }, lineHeight: 1.7 }}>
                  Pragathi Nature Farms was founded by a passionate family committed to restoring the health of the land and the community. Their vision is to inspire a new generation of farmers and consumers to embrace natural, ethical, and community-driven agriculture.
                </Typography>
                <Typography variant="body1" color="text.primary" sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }, lineHeight: 1.7 }}>
                  The founders believe in transparency, education, and sharing knowledge. They actively mentor young farmers, collaborate with local schools, and support women's self-help groups in the region.
                </Typography>
              </motion.div>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
            >
              <Box sx={{ position: 'relative' }}>
                <motion.img
                  src="/assets/img45.png"
                  alt="Founders Vision"
                  style={{
                    ...imageStyle,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    border: '4px solid white',
                  }}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={imageMotion}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7b1fa2, #ba68c8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(123, 31, 162, 0.3)',
                  }}
                >
                  💡
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Community & Education Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: { xs: 8, md: 12 },
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
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariant}
              >
                <Box sx={{ position: 'relative' }}>
                  <motion.img
                    src="/assets/img51.png"
                    alt="Community and Education"
                    style={{
                      ...imageStyle,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      border: '4px solid white',
                    }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={imageMotion}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #d32f2f, #f44336)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      color: 'white',
                      boxShadow: '0 8px 24px rgba(211, 47, 47, 0.3)',
                    }}
                  >
                    🎓
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3} justifyContent="center" height="100%">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                  <Chip 
                    label="🎓 Community & Education" 
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
                    variant="h3" 
                    fontWeight={800} 
                    sx={{ 
                      background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 3,
                      fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                  >
                    Learning & Growing Together
                  </Typography>
                  
                  <Typography variant="body1" color="text.primary" mb={3} sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }, lineHeight: 1.7 }}>
                    We believe that true change begins with education and community engagement. Our farm regularly hosts school children, college students, and aspiring farmers for hands-on learning experiences. We offer workshops on natural farming, composting, seed saving, and more.
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.125rem' }, lineHeight: 1.7 }}>
                    Our partnerships with local NGOs and government agencies help us reach a wider audience and promote sustainable livelihoods in rural Tamil Nadu.
                  </Typography>
                </motion.div>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Farm Life Gallery Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: { xs: 8, md: 12 },
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
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Chip 
                label="📸 Farm Life Gallery" 
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
                variant="h3" 
                fontWeight={800} 
                sx={{ 
                  background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}
              >
                A Day in Our Farm Life
              </Typography>
            </Box>
            
            <Grid container spacing={4} justifyContent="center">
              {[
                { src: "/assets/img1.png", title: "Early morning at the farm", desc: "The golden hour brings life to our fields" },
                { src: "/assets/img8.png", title: "Diverse crops thriving together", desc: "Companion planting in perfect harmony" },
                { src: "/assets/img17.png", title: "Natural composting in action", desc: "Turning waste into valuable nutrients" },
                { src: "/assets/img23.png", title: "Children learning about nature", desc: "Education through hands-on experience" },
                { src: "/assets/img34.png", title: "Harvest time joy", desc: "Celebrating the fruits of our labor" },
                { src: "/assets/img69.png", title: "A haven for birds and butterflies", desc: "Biodiversity at its finest" },
              ].map((item, idx) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.src}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionVariant}
                    transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Card 
                      sx={{ 
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)', 
                        borderRadius: 3, 
                        bgcolor: 'white',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={item.src}
                        alt={item.title}
                        sx={{ 
                          height: 250, 
                          objectFit: "cover",
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Typography 
                          variant="h6" 
                          fontWeight={700} 
                          color="text.primary" 
                          sx={{ mb: 1, fontSize: '1.1rem' }}
                        >
                          {item.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ lineHeight: 1.6 }}
                        >
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #2e7d32, #43b047)',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            zIndex: 1,
          }}
        />
        
        <Container maxWidth="lg" sx={{ textAlign: "center", position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
            <Chip 
              label="🌱 Visit Our Farm" 
              sx={{ 
                mb: 4, 
                px: 3, 
                py: 1, 
                fontSize: '1rem',
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }} 
            />
            
            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontWeight: 900,
                mb: 4,
                fontFamily: 'Playfair Display, serif',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #ffffff, #f0f8f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Visit Pragathi Natural Farm
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: "rgba(255, 255, 255, 0.95)",
                mb: 6,
                maxWidth: 700,
                mx: "auto",
                fontFamily: 'Inter, sans-serif',
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.4rem' },
                lineHeight: 1.6,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Experience the beauty of organic farming, taste the difference, and join us in our mission to cultivate a healthier, greener future.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Box
                component="a"
                href="/contact"
                sx={{
                  display: "inline-block",
                  bgcolor: "white",
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 5,
                  py: 2.5,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  textTransform: "none",
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: "none",
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: '2px solid transparent',
                  '&:hover': {
                    bgcolor: "rgba(255, 255, 255, 0.9)",
                    color: theme.palette.primary.dark,
                    transform: 'translateY(-4px)',
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
                    border: `2px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                Contact Us
              </Box>
              
              <Box
                component="a"
                href="/journey"
                sx={{
                  display: "inline-block",
                  bgcolor: "transparent",
                  color: "white",
                  fontWeight: 700,
                  borderRadius: 3,
                  px: 5,
                  py: 2.5,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  textTransform: "none",
                  fontFamily: 'Inter, sans-serif',
                  textDecoration: "none",
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    transform: 'translateY(-4px)',
                    border: '2px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                Our Story
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
