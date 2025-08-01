import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const heroBg =
  "linear-gradient(0deg,rgba(31,41,55,0.32),rgba(31,41,55,0.10)), url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat";

export default function ContactPage() {
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
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 180, md: 260 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: heroBg,
        }}
      >
        <Container maxWidth="sm" sx={{ zIndex: 2, textAlign: "center", py: { xs: 4, md: 7 } }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
            <Typography
              variant="h3"
              sx={{
                color: "#111",
                fontWeight: 800,
                letterSpacing: 1,
                mb: 1,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#222",
                fontWeight: 400,
                mb: 0,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              We’d love to hear from you. Reach out to us anytime.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 } }}>
        <Grid container spacing={6} alignItems="flex-start">
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
              <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: "#fff" }}>
                <Typography variant="h5" fontWeight={700} color="#111" mb={2}>
                  Send us a message
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                  <Stack spacing={2}>
                    <TextField
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      error={errors.name}
                      helperText={errors.name ? "Full Name is required" : ""}
                      fullWidth
                      InputLabelProps={{ style: { color: "#111" } }}
                      InputProps={{ style: { color: "#111" } }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      error={errors.email}
                      helperText={errors.email ? "Valid email is required" : ""}
                      fullWidth
                      InputLabelProps={{ style: { color: "#111" } }}
                      InputProps={{ style: { color: "#111" } }}
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
                      InputLabelProps={{ style: { color: "#111" } }}
                      InputProps={{ style: { color: "#111" } }}
                    />
                    <TextField
                      label="Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      error={errors.message}
                      helperText={errors.message ? "Message is required" : ""}
                      fullWidth
                      multiline
                      minRows={4}
                      InputLabelProps={{ style: { color: "#111" } }}
                      InputProps={{ style: { color: "#111" } }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: "#222",
                        color: "#fff",
                        fontWeight: 700,
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
                        textTransform: "none",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: 18,
                        transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                        '&:hover': {
                          bgcolor: "#444",
                        },
                      }}
                      disabled={submitted}
                    >
                      {submitted ? "Message Sent!" : "Send Message"}
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Contact Info Box */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
              <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, bgcolor: "#fff", mb: 3 }}>
                <Typography variant="h6" fontWeight={700} color="#111" mb={2}>
                  Contact Information
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon sx={{ color: "#222" }} />
                    <Typography variant="body1" color="#111">
                      hello@pragathifarms.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneIcon sx={{ color: "#222" }} />
                    <Typography variant="body1" color="#111">
                      +91 98765 43210
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon sx={{ color: "#222" }} />
                    <Typography variant="body1" color="#111">
                      Pragathi Nature Farms, Hyderabad, India
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
                    <IconButton href="https://wa.me/919876543210" target="_blank" rel="noopener" aria-label="WhatsApp" sx={{ color: "#25D366" }}>
                      <WhatsAppIcon />
                    </IconButton>
                    <IconButton href="https://instagram.com/pragathinaturefarms" target="_blank" rel="noopener" aria-label="Instagram" sx={{ color: "#E1306C" }}>
                      <InstagramIcon />
                    </IconButton>
                    <IconButton href="https://facebook.com/pragathinaturefarms" target="_blank" rel="noopener" aria-label="Facebook" sx={{ color: "#1877F3" }}>
                      <FacebookIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </Paper>
              {/* Google Map Embed (optional) */}
              <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
                <Box sx={{ width: "100%", height: { xs: 220, md: 260 } }}>
                  <iframe
                    title="Pragathi Nature Farms Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.406964295002!2d78.4867!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973b0b0b0b0b%3A0x0!2sHyderabad%2C%20India!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
