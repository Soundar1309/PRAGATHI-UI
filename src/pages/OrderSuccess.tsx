/**
 * Order Success Page - Shown after successful payment
 */

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentId = location.state?.paymentId;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ textAlign: 'center', p: 4 }}>
          <CardContent>
            <Box sx={{ mb: 4 }}>
              <CheckCircleIcon 
                sx={{ 
                  fontSize: 80, 
                  color: 'success.main',
                  mb: 2 
                }} 
              />
            </Box>
            
            <Typography variant="h4" component="h1" gutterBottom color="success.main">
              Payment Successful!
            </Typography>
            
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Thank you for your order
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4 }}>
              Your payment has been processed successfully. You will receive an email confirmation shortly.
            </Typography>

            {paymentId && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Payment ID: {paymentId}
              </Typography>
            )}

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                onClick={() => navigate('/orders')}
                size="large"
              >
                View Orders
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => navigate('/products')}
                size="large"
              >
                Continue Shopping
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default OrderSuccess;
