import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  IconButton,
  useTheme,
  Chip,
  Card,
} from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function ContactPage() {
  const theme = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validate = () => {
    const newErrors = {
      name: !form.name.trim(),
      email: !form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email),
      subject: !form.subject.trim(),
      message: !form.message.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <Box sx={{ 
        bgcolor: "#F7F9FB", 
        minHeight: "100vh", 
        pb: 8,
        // Add top margin to ensure content is below fixed header
        // mt: { xs: '100px', sm: '100px', md: '180px', lg: '150px' }
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 300, md: 500 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, rgba(67, 176, 71, 0.9), rgba(46, 125, 50, 0.8)), url('/assets/img20.png') center/cover no-repeat`,
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
                label="📞 Get In Touch" 
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
              Contact Us
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
              We'd love to hear from you. Reach out to us anytime and let's start a conversation about sustainable farming.
            </Typography>

            {/* Quick Contact Stats */}
            <Grid container spacing={4} sx={{ mt: 6 }}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
                    &lt;24h
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Response Time
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
                    7/7
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Days Available
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
                    100%
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Organic Focus
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1 }}>
                    14+
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Years Experience
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Main Content */}
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
          <Grid container spacing={6} alignItems="flex-start">
            {/* Contact Form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
                <Card 
                  sx={{ 
                    p: { xs: 3, sm: 5 }, 
                    borderRadius: 4, 
                    bgcolor: 'white',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(67, 176, 71, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Decorative corner element */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
                      opacity: 0.1,
                    }}
                  />
                  
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Chip 
                      label="✉️ Send us a message" 
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
                      variant="h4" 
                      fontWeight={800} 
                      sx={{ 
                        background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 4,
                        fontSize: { xs: '1.8rem', md: '2.2rem' }
                      }}
                    >
                      Let's Start a Conversation
                    </Typography>
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                      <Stack spacing={3}>
                        <TextField
                          label="Full Name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          error={errors.name}
                          helperText={errors.name ? "Full Name is required" : ""}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                          }}
                        />
                        <TextField
                          label="Email Address"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          error={errors.email}
                          helperText={errors.email ? "Valid email is required" : ""}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                          }}
                        />
                        <TextField
                          label="Subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          error={errors.subject}
                          helperText={errors.subject ? "Subject is required" : ""}
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                          }}
                        />
                        <TextField
                          label="Your Message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          error={errors.message}
                          helperText={errors.message ? "Message is required" : ""}
                          fullWidth
                          multiline
                          minRows={5}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                          }}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={submitted ? <CheckCircleIcon /> : <SendIcon />}
                          sx={{
                            background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
                            color: 'white',
                            fontWeight: 700,
                            borderRadius: 3,
                            px: 5,
                            py: 2,
                            boxShadow: '0 8px 32px rgba(67, 176, 71, 0.3)',
                            textTransform: 'none',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1.1rem',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 12px 40px rgba(67, 176, 71, 0.4)',
                            },
                            '&:disabled': {
                              background: 'linear-gradient(135deg, #a5d6a7, #c8e6c9)',
                              color: 'white',
                            }
                          }}
                          disabled={submitted}
                        >
                          {submitted ? "Message Sent Successfully!" : "Send Message"}
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            {/* Contact Info Box */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
                <Card 
                  sx={{ 
                    p: { xs: 3, sm: 4 }, 
                    borderRadius: 4, 
                    bgcolor: 'white',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(67, 176, 71, 0.1)',
                    mb: 3,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Decorative corner element */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ff9800, #ffc107)',
                      opacity: 0.1,
                    }}
                  />
                  
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Chip 
                      label="📞 Contact Information" 
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
                      variant="h5" 
                      fontWeight={800} 
                      sx={{ 
                        background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 4,
                        fontSize: { xs: '1.5rem', md: '1.8rem' }
                      }}
                    >
                      Get In Touch
                    </Typography>
                    
                    <Stack spacing={3}>
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(67, 176, 71, 0.05), rgba(110, 220, 140, 0.05))',
                        border: '1px solid rgba(67, 176, 71, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(67, 176, 71, 0.1), rgba(110, 220, 140, 0.1))',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(67, 176, 71, 0.15)',
                        }
                      }}>
                        <Box sx={{ 
                          p: 1.5, 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <EmailIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                            Email
                          </Typography>
                          <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
                            pragathinaturalfarm@gmail.com
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(67, 176, 71, 0.05), rgba(110, 220, 140, 0.05))',
                        border: '1px solid rgba(67, 176, 71, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(67, 176, 71, 0.1), rgba(110, 220, 140, 0.1))',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(67, 176, 71, 0.15)',
                        }
                      }}>
                        <Box sx={{ 
                          p: 1.5, 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <PhoneIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                            Phone
                          </Typography>
                          <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
                            +91 98765 43210
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "flex-start", 
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(67, 176, 71, 0.05), rgba(110, 220, 140, 0.05))',
                        border: '1px solid rgba(67, 176, 71, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(67, 176, 71, 0.1), rgba(110, 220, 140, 0.1))',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(67, 176, 71, 0.15)',
                        }
                      }}>
                        <Box sx={{ 
                          p: 1.5, 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mt: 0.5
                        }}>
                          <LocationOnIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                            Address
                          </Typography>
                          <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500, lineHeight: 1.5 }}>
                            4/196, West Thottam, Jakkarpalayam, Pollachi, Tamil Nadu - 642202
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 2 }}>
                          Follow Us
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <IconButton 
                            href="https://wa.me/919876543210" 
                            target="_blank" 
                            rel="noopener" 
                            aria-label="WhatsApp" 
                            sx={{ 
                              color: "#25D366",
                              background: 'rgba(37, 211, 102, 0.1)',
                              '&:hover': {
                                background: 'rgba(37, 211, 102, 0.2)',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <WhatsAppIcon />
                          </IconButton>
                          <IconButton 
                            href="https://www.instagram.com/pragathinaturalfarm?igsh=NWdleDA3Zndla3Vk" 
                            target="_blank" 
                            rel="noopener" 
                            aria-label="Instagram" 
                            sx={{ 
                              color: "#E1306C",
                              background: 'rgba(225, 48, 108, 0.1)',
                              '&:hover': {
                                background: 'rgba(225, 48, 108, 0.2)',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <InstagramIcon />
                          </IconButton>
                          <IconButton 
                            href="https://youtube.com/@k.sampathkumar2667?feature=shared" 
                            target="_blank" 
                            rel="noopener" 
                            aria-label="YouTube" 
                            sx={{ 
                              color: "#FF0000",
                              background: 'rgba(255, 0, 0, 0.1)',
                              '&:hover': {
                                background: 'rgba(255, 0, 0, 0.2)',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <YouTubeIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Card>
                
                {/* Google Map Embed */}
                <Card 
                  sx={{ 
                    borderRadius: 4, 
                    overflow: "hidden",
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(67, 176, 71, 0.1)',
                  }}
                >
                  <Box sx={{ width: "100%", height: { xs: 250, md: 300 } }}>
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
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
