import React from 'react';
import { Box, Typography } from '@mui/material';

const PrivacyPolicy: React.FC = () => (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 6, px: 2 }}>
        <Typography variant="h4" fontWeight={700} mb={3} color="primary">Privacy Policy</Typography>
        <Typography variant="body1" paragraph>
            At Pragathi Natural Farms, we value your privacy and are committed to protecting your personal information. We collect only the information necessary to process your orders, improve your shopping experience, and communicate with you about our products and offers. We do not sell or share your data with third parties except as required to fulfill your order or by law. All payment transactions are encrypted and secure. You may contact us at hello@pragathifarms.com for any privacy-related concerns.
        </Typography>
    </Box>
);

export default PrivacyPolicy; 