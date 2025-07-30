import React from 'react';
import { Box, Typography } from '@mui/material';

const ReturnPolicy: React.FC = () => (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 6, px: 2 }}>
        <Typography variant="h4" fontWeight={700} mb={3} color="primary">Return Policy</Typography>
        <Typography variant="body1" paragraph>
            We want you to be completely satisfied with your purchase. If you receive a damaged, defective, or incorrect product, please contact us within 48 hours of delivery at hello@pragathifarms.com with your order details and a photo of the issue. We will arrange for a replacement or refund as appropriate. Returns are not accepted for perishable goods unless there is a quality issue.
        </Typography>
    </Box>
);

export default ReturnPolicy; 