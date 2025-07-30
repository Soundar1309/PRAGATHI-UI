import React from 'react';
import { Box, Typography } from '@mui/material';

const ShippingPolicy: React.FC = () => (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 6, px: 2 }}>
        <Typography variant="h4" fontWeight={700} mb={3} color="primary">Shipping Policy</Typography>
        <Typography variant="body1" paragraph>
            We offer free shipping across India on all orders. Orders are processed within 1-2 business days and typically delivered within 3-7 business days, depending on your location. You will receive a tracking link via email or SMS once your order is shipped. If you have any questions about your shipment, please contact us at hello@pragathifarms.com or call +91 98765 43210.
        </Typography>
    </Box>
);

export default ShippingPolicy; 