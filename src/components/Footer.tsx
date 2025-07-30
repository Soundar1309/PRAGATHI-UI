import React from 'react';
import { Box, Typography, Link, Stack, IconButton, Button, InputBase, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#f8f0de', // Soft sand beige
                color: '#222',
                mt: 8,
                pt: 6,
                pb: 3,
                px: { xs: 2, md: 8 },
                fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 6,
                    mb: 4,
                }}
            >
                {/* Left: Logo, Address, Email, WhatsApp */}
                <Box sx={{ flex: 1, minWidth: 260 }}>
                    <img src="/logo.jpg" alt="Pragathi Natural Farms" style={{ height: 58, borderRadius: 8, background: theme.palette.background.paper, marginBottom: 12 }} />
                    <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mb: 1 }}>
                        <LocationOnIcon sx={{ color: theme.palette.primary.main, mt: '2px' }} />
                        <Typography variant="body2">
                            123, Organic Street, Chennai, India
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                        <EmailIcon sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2">hello@pragathifarms.com</Typography>
                    </Stack>
                    <Button
                        variant="contained"
                        startIcon={<WhatsAppIcon />}
                        sx={{
                            bgcolor: '#ffc107',
                            color: '#222',
                            fontWeight: 600,
                            borderRadius: 2,
                            textTransform: 'none',
                            boxShadow: 'none',
                            mt: 1,
                            mb: 1,
                            px: 2,
                            py: 1,
                            '&:hover': { bgcolor: '#ffb300' },
                        }}
                        href="https://wa.me/919876543210"
                        target="_blank"
                    >
                        Click here to chat on WhatsApp
                    </Button>
                </Box>


                {/* Center: Quick Links & Policy */}
                <Box
                    sx={{
                        flex: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 6,
                        flexWrap: 'wrap',
                        minWidth: 260,
                    }}
                >
                    {/* Quick Links */}
                    <Box sx={{ minWidth: 180, mr: { xs: 0, md: 4 } }}>
                        <Typography variant="subtitle1" fontWeight={700} mb={1}>Quick Links</Typography>
                        <Stack spacing={2}>
                            <Link href="/about" color="inherit" underline="hover">About Us</Link>
                            <Link href="/benefits" color="inherit" underline="hover">Benefits Of Pragathi Farms</Link>
                            <Link href="/testimonials" color="inherit" underline="hover">Testimonials</Link>
                            <Link href="/blog" color="inherit" underline="hover">Blog</Link>
                            <Link href="/journey" color="inherit" underline="hover">Our Journey</Link>
                            <Link href="/contact" color="inherit" underline="hover">Contact Us</Link>
                            <Link href="/terms" color="inherit" underline="hover">Terms & Conditions</Link>
                            <Link href="/delivery" color="inherit" underline="hover">Delivery Information</Link>
                        </Stack>
                    </Box>
                    {/* Our Policy */}
                    <Box sx={{ minWidth: 180, mr: { xs: 0, md: 4 } }}>
                        <Typography variant="subtitle1" fontWeight={700} mb={1}>Our Policy</Typography>
                        <Stack spacing={2}>
                            <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link>
                            <Link href="/shipping" color="inherit" underline="hover">Shipping Policy</Link>
                            <Link href="/returns" color="inherit" underline="hover">Return Policy</Link>
                            <Link href="/refund" color="inherit" underline="hover">Refund Policy</Link>
                        </Stack>
                        {/* My Account */}
                        <Typography variant="subtitle1" fontWeight={700} mt={3} mb={1}>My Account</Typography>
                        <Stack spacing={2}>
                            <Link href="/profile" color="inherit" underline="hover">My Profile</Link>
                            <Link href="/orders" color="inherit" underline="hover">Order History</Link>
                        </Stack>
                    </Box>
                </Box>

                {/* Right: Social, Newsletter */}
                <Box sx={{ flex: 1, minWidth: 260 }}>
                    <Typography variant="subtitle1" fontWeight={700} mb={1}>Follow us on</Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <IconButton color="inherit" href="https://facebook.com" target="_blank"><FacebookIcon /></IconButton>
                        <IconButton color="inherit" href="https://instagram.com" target="_blank"><InstagramIcon /></IconButton>
                        <IconButton color="inherit" href="https://youtube.com" target="_blank"><YouTubeIcon /></IconButton>
                        <IconButton color="inherit" href="https://linkedin.com" target="_blank"><LinkedInIcon /></IconButton>
                    </Stack>
                    <Typography variant="subtitle1" fontWeight={700} mb={1}>Subscribe for Newsletter</Typography>
                    <Box
                        component="form"
                        onSubmit={e => { e.preventDefault(); /* handle subscribe */ }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: '#fff',
                            borderRadius: 5,
                            border: '1px solid #e0e0e0',
                            p: 0.5,
                            maxWidth: 300,
                        }}
                    >
                        <InputBase
                            placeholder="Your email"
                            sx={{ ml: 1, flex: 1, fontSize: 15 }}
                            inputProps={{ 'aria-label': 'subscribe newsletter' }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                ml: 1,
                                borderRadius: 4,
                                bgcolor: theme.palette.secondary.main,
                                color: theme.palette.getContrastText(theme.palette.secondary.main),
                                fontWeight: 600,
                                px: 2,
                                boxShadow: 'none',
                                textTransform: 'none',
                                '&:hover': { bgcolor: theme.palette.secondary.dark },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Typography variant="body2" align="center" sx={{ opacity: 0.8, mt: 2, fontWeight: 500 }}>
                © {new Date().getFullYear()} Pragathi Natural Farms. Powered by <Box component="span" sx={{ fontWeight: 700, display: 'inline' }}>thinkbyai.in</Box>
            </Typography>
        </Box>
    );
};

export default Footer;
