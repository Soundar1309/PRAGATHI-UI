import React from 'react';
import { Box, Typography, Container, Paper, Chip, alpha, Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';

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

const shippingInfo = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 48, color: '#43b047' }} />,
    title: "Free Shipping",
    desc: "We offer free shipping across India on all orders with no minimum purchase required.",
    gradient: "linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)",
    color: "#2e7d32",
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 48, color: '#ff9800' }} />,
    title: "Processing Time",
    desc: "Orders are processed within 1-2 business days and typically delivered within 3-7 business days.",
    gradient: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
    color: "#f57c00",
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 48, color: '#9c27b0' }} />,
    title: "Tracking Updates",
    desc: "You will receive a tracking link via email or SMS once your order is shipped.",
    gradient: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
    color: "#7b1fa2",
  },
];

const ShippingPolicy: React.FC = () => (
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
            label="🚚 Fast & Reliable Shipping" 
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
            Shipping Policy
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
            Fast, free, and reliable delivery across India with complete tracking.
          </Typography>
        </Box>
      </motion.div>

      {/* Shipping Info Cards */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {shippingInfo.map((info, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={info.title}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariant}
              transition={{ delay: i * 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              style={{ height: '100%' }}
            >
              <Paper 
                elevation={0}
                sx={{ 
                  borderRadius: 2, 
                  background: info.gradient,
                  p: 0,
                  textAlign: "center",
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: { xs: '280px', sm: '320px', md: '300px' },
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
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

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
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: '1px solid rgba(67, 176, 71, 0.1)',
            p: { xs: 3, md: 6 }
          }}
        >
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            mb: 4,
            p: 3,
            background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
            color: 'white',
            borderRadius: 2,
            mx: -3,
            mt: -3
          }}>
            <LocalShippingIcon sx={{ fontSize: 32, mr: 2 }} />
            <Box>
              <Typography variant="h5" fontWeight={700} mb={1}>
                Contact & Support
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Need help with your shipment? We're here to help!
              </Typography>
            </Box>
          </Box>

          <Typography 
            variant="body1" 
            paragraph
            sx={{ 
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 4
            }}
          >
            If you have any questions about your shipment, please contact us at <strong>pragathinaturalfarm@gmail.com</strong> or call <strong>+91 98765 43210</strong>. Our customer support team is available Monday to Friday, 9 AM to 6 PM.
          </Typography>

          <Box sx={{ 
            p: 3, 
            background: alpha('#43b047', 0.1),
            borderRadius: 2,
            border: `1px solid ${alpha('#43b047', 0.2)}`
          }}>
            <Typography variant="h6" fontWeight={700} color="primary" mb={2}>
              📞 Contact Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email: pragathinaturalfarm@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Phone: +91 98765 43210
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  </Box>
);

export default ShippingPolicy; 