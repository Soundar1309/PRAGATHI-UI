import { Box, Container, Typography, Grid, Card, Chip, Paper, alpha } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";

const deliveryInfo = [
  {
    icon: <MapIcon sx={{ fontSize: 48, color: '#43b047' }} />,
    title: "Delivery Areas",
    desc: "We deliver across Tamil Nadu and all over India with our extensive network of trusted partners.",
    gradient: "linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)",
    color: "#2e7d32",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 48, color: '#ff9800' }} />,
    title: "Timelines",
    desc: "Orders are processed within 1-2 business days and delivered within 3-7 days depending on your location.",
    gradient: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
    color: "#f57c00",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 48, color: '#9c27b0' }} />,
    title: "Packing Standards",
    desc: "All produce is carefully packed to ensure freshness and safety during transit. All products are packed with biodegradable materials.",
    gradient: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
    color: "#7b1fa2",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1
  },
};

const heroVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0
  },
};

export default function DeliveryPage() {
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
        {/* Hero Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={heroVariant}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="🚚 Fast & Reliable Delivery" 
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
              Delivery Information
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
              Everything you need to know about our delivery process and how we bring fresh produce to your doorstep.
            </Typography>
          </Box>
        </motion.div>

        {/* Delivery Info Cards */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {deliveryInfo.map((info, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={info.title}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariant}
                transition={{ delay: i * 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ height: '100%' }}
              >
                <Card 
                  elevation={0}
                  sx={{ 
                    borderRadius: 2, 
                    background: info.gradient,
                    p: 0,
                    textAlign: "center",
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: { xs: '320px', sm: '360px', md: '340px' },
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      '& .icon-container': {
                        transform: 'scale(1.1) rotate(5deg)',
                      }
                    }
                  }}
                >
                  {/* Decorative corner */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 100,
                      height: 100,
                      background: `linear-gradient(135deg, ${alpha(info.color, 0.1)} 0%, transparent 70%)`,
                      borderRadius: '0 0 0 100%',
                    }}
                  />
                  
                  <Box sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box 
                      className="icon-container"
                      sx={{ 
                        mb: 3, 
                        flexShrink: 0,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${alpha(info.color, 0.1)} 0%, ${alpha(info.color, 0.05)} 100%)`,
                        border: `2px solid ${alpha(info.color, 0.2)}`
                      }}
                    >
                      {info.icon}
                    </Box>
                    
                    <Typography 
                      variant="h5" 
                      fontWeight={800} 
                      sx={{ 
                        color: info.color,
                        mb: 2,
                        fontSize: { xs: '1.3rem', md: '1.4rem' }
                      }}
                    >
                      {info.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1.6,
                        fontSize: { xs: '0.95rem', md: '1rem' }
                      }}
                    >
                      {info.desc}
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Map Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariant}
        >
          <Paper 
            elevation={8}
            sx={{ 
              borderRadius: 2, 
              mt: 5,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              border: '1px solid rgba(67, 176, 71, 0.1)'
            }}
          >
            <Box sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
              color: 'white',
              textAlign: 'center',
            }}>
              <LocationOnIcon sx={{ fontSize: 32, mb: 1 }} />
              <Typography variant="h5" fontWeight={700} mb={1}>
                Our Location
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Visit us at Pollachi, Tamil Nadu - The heart of organic farming
              </Typography>
            </Box>
            <Box sx={{ height: { xs: '300px', md: '400px' } }}>
              <iframe
                title="Pragathi Natural Farm Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.123456789!2d77.123456!3d10.654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04c123456789ab%3A0x1234567890abcdef!2sPollachi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
