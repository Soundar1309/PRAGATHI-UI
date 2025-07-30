import { Box, Container, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function TermsPage() {
  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h3" fontWeight={800} color="text.primary" mb={2} textAlign="center">
            Terms & Conditions
          </Typography>
        </motion.div>
        <Divider sx={{ my: 3 }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={2}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" color="text.primary" mb={3}>
            By using Pragathi Nature Farms’ website and services, you agree to these terms and conditions.
          </Typography>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={2}>
            2. Orders & Payment
          </Typography>
          <Typography variant="body1" color="text.primary" mb={3}>
            All orders are subject to availability. Payment must be completed before dispatch. We reserve the right to refuse or cancel orders.
          </Typography>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={2}>
            3. Delivery & Returns
          </Typography>
          <Typography variant="body1" color="text.primary" mb={3}>
            Delivery timelines are estimates. Please review our Delivery, Return, and Refund policies for details.
          </Typography>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={2}>
            4. Privacy
          </Typography>
          <Typography variant="body1" color="text.primary" mb={3}>
            We respect your privacy. Please see our Privacy Policy for more information.
          </Typography>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={2}>
            5. Changes to Terms
          </Typography>
          <Typography variant="body1" color="text.primary" mb={3}>
            Pragathi Nature Farms may update these terms at any time. Continued use of our services constitutes acceptance of the new terms.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}
