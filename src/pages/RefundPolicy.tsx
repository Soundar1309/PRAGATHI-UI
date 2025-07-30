import React from 'react';
import { Box, Typography } from '@mui/material';

const RefundPolicy: React.FC = () => (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 6, px: 2 }}>
        <Typography variant="h4" fontWeight={700} mb={3} color="primary">Refund Policy</Typography>
        <Typography variant="body1" paragraph>
            Refunds are processed once the returned product is received and inspected. If approved, your refund will be credited to your original payment method within 5-7 business days. For prepaid orders, the refund will be made to your bank account or card. For COD orders, we will contact you for your bank details. If you have not received your refund within the expected time, please contact us at hello@pragathifarms.com.
        </Typography>
    </Box>
);

export default RefundPolicy; 