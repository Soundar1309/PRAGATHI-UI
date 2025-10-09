import { Box, Container, Typography, Paper, Chip, alpha, Grid } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { motion } from "framer-motion";

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

const termsData = [
  {
    number: "1",
    title: "Acceptance of Terms",
    content: "By using Pragathi Nature Farms' website and services, you agree to these terms and conditions.",
    color: "#2e7d32",
    gradient: "linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)",
  },
  {
    number: "2", 
    title: "Orders & Payment",
    content: "All orders are subject to availability. Payment must be completed before dispatch. We reserve the right to refuse or cancel orders.",
    color: "#f57c00",
    gradient: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
  },
  {
    number: "3",
    title: "Delivery & Returns", 
    content: "Delivery timelines are estimates. Please review our Delivery, Return, and Refund policies for details.",
    color: "#7b1fa2",
    gradient: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
  },
  {
    number: "4",
    title: "Privacy",
    content: "We respect your privacy. Please see our Privacy Policy for more information.",
    color: "#1976d2",
    gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
  },
  {
    number: "5",
    title: "Changes to Terms",
    content: "Pragathi Nature Farms may update these terms at any time. Continued use of our services constitutes acceptance of the new terms.",
    color: "#d32f2f",
    gradient: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
  },
];

export default function TermsPage() {
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
              label="📋 Legal Terms & Conditions" 
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
              Terms & Conditions
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
              Please read these terms carefully before using our services at Pragathi Natural Farms.
            </Typography>
          </Box>
        </motion.div>

        {/* Terms Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {termsData.map((term, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={term.number}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariant}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{ height: '100%' }}
              >
                <Paper 
                  elevation={0}
                  sx={{ 
                    borderRadius: 2, 
                    background: term.gradient,
                    p: 0,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
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
                      background: `linear-gradient(135deg, ${alpha(term.color, 0.1)} 0%, transparent 70%)`,
                      borderRadius: '0 0 0 100%',
                    }}
                  />
                  
                  <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          background: term.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          mr: 2,
                          flexShrink: 0
                        }}
                      >
                        {term.number}
                      </Box>
                      <Typography 
                        variant="h5" 
                        fontWeight={800} 
                        sx={{ 
                          color: term.color,
                          fontSize: { xs: '1.3rem', md: '1.4rem' }
                        }}
                      >
                        {term.title}
                      </Typography>
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        flexGrow: 1
                      }}
                    >
                      {term.content}
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
              <DescriptionIcon sx={{ fontSize: 32, mr: 2 }} />
              <Box>
                <Typography variant="h5" fontWeight={700} mb={1}>
                  Important Notice
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  These terms govern your use of our services
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
              By accessing and using Pragathi Natural Farms' website and services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our services.
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                For questions about these terms: pragathinaturalfarm@gmail.com
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
}
