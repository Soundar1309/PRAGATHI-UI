import { Box, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { motion } from "framer-motion";

const deliveryInfo = [
  {
    icon: <MapIcon color="primary" sx={{ fontSize: 40 }} />,
    title: "Delivery Areas",
    desc: "We deliver across Hyderabad and select locations in Telangana and Andhra Pradesh.",
  },
  {
    icon: <AccessTimeIcon color="success" sx={{ fontSize: 40 }} />,
    title: "Timelines",
    desc: "Orders are processed within 1-2 business days and delivered within 3-7 days.",
  },
  {
    icon: <LocalShippingIcon color="warning" sx={{ fontSize: 40 }} />,
    title: "Packing Standards",
    desc: "All produce is carefully packed to ensure freshness and safety during transit.",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function DeliveryPage() {
  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h3" fontWeight={800} color="text.primary" mb={2} textAlign="center">
            Delivery Information
          </Typography>
          <Typography variant="h6" color="text.primary" mb={5} textAlign="center">
            Everything you need to know about our delivery process.
          </Typography>
        </motion.div>
        <Grid container spacing={4}>
          {deliveryInfo.map((info, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={info.title}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariant}
                transition={{ delay: i * 0.1 }}
              >
                <Card elevation={3} sx={{ borderRadius: 3, bgcolor: "#fff", p: 3, textAlign: "center" }}>
                  <Box sx={{ mb: 2 }}>{info.icon}</Box>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" fontWeight={700} color="text.primary" mb={1}>
                      {info.title}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {info.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <iframe
            title="Delivery Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.406964295002!2d78.4867!3d17.385044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973b0b0b0b0b%3A0x0!2sHyderabad%2C%20India!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="220"
            style={{ border: 0, borderRadius: 12 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Container>
    </Box>
  );
}
