import React from 'react';
import { Box, Typography, Container, Paper, Chip, alpha } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import { motion } from 'framer-motion';

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const PrivacyPolicy: React.FC = () => (
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
            label="🔒 Privacy & Security" 
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
            Privacy Policy
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
            Your privacy and data security are our top priorities at Pragathi Natural Farms.
          </Typography>
        </Box>
      </motion.div>

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
            <SecurityIcon sx={{ fontSize: 32, mr: 2 }} />
            <Box>
              <Typography variant="h5" fontWeight={700} mb={1}>
                Data Protection & Privacy
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                How we protect and use your personal information
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
              mb: 3
            }}
          >
            At Pragathi Natural Farms, we value your privacy and are committed to protecting your personal information. We collect only the information necessary to process your orders, improve your shopping experience, and communicate with you about our products and offers.
          </Typography>

          <Typography 
            variant="body1" 
            paragraph
            sx={{ 
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 3
            }}
          >
            We do not sell or share your data with third parties except as required to fulfill your order or by law. All payment transactions are encrypted and secure using industry-standard security measures.
          </Typography>

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
            You may contact us at <strong>pragathinaturalfarm@gmail.com</strong> for any privacy-related concerns or to request information about your personal data.
          </Typography>

          <Box sx={{ 
            p: 3, 
            background: alpha('#43b047', 0.1),
            borderRadius: 2,
            border: `1px solid ${alpha('#43b047', 0.2)}`
          }}>
            <Typography variant="h6" fontWeight={700} color="primary" mb={2}>
              📧 Contact Information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              For privacy concerns: pragathinaturalfarm@gmail.com<br/>
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  </Box>
);

export default PrivacyPolicy; 