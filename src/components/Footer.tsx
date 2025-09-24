import React from 'react';
import { Box, Typography, Link, Stack, IconButton, Button, useTheme, Container, Grid } from '@mui/material';
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
                background: theme.palette.mode === 'light'
                    ? `linear-gradient(135deg, #d4f7d4 0%, #f0fff0 100%)`
                    : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
                color: theme.palette.text.primary,
                mt: { xs: 4, sm: 6, md: 8 },
                pt: { xs: 4, sm: 5, md: 6 },
                pb: { xs: 2, sm: 3 },
                fontFamily: 'Inter, sans-serif',
                // Prevent horizontal scroll
                width: '100%',
                maxWidth: '100vw',
                overflowX: 'hidden',
                // Ensure footer is visible
                position: 'relative',
                zIndex: 1,
                // Debug: add border to see if footer is visible
                // border: '2px solid green', // Uncomment for debugging
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    px: { xs: 2, sm: 3, md: 4, lg: 6 },
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 3, sm: 4, md: 6 }}
                    sx={{ mb: { xs: 3, sm: 4 } }}
                >
                    {/* Left Column: Logo, Address, Contact */}
                    <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', md: 'flex-start' },
                            textAlign: { xs: 'center', md: 'left' },
                        }}>
                            <img
                                src="/logo.webp"
                                alt="Pragathi Natural Farms"
                                style={{
                                    height: 'clamp(48px, 6vw, 58px)',
                                    borderRadius: 8,
                                    background: theme.palette.background.paper,
                                    marginBottom: 16,
                                    maxWidth: '100%',
                                }}
                            />

                            <Stack
                                direction="row"
                                alignItems="flex-start"
                                spacing={2}
                                sx={{
                                    mb: 2,
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    maxWidth: '100%',
                                }}
                            >
                                <LocationOnIcon
                                    sx={{
                                        color: theme.palette.primary.main,
                                        mt: '2px',
                                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                        lineHeight: 1.6,    
                                        wordBreak: 'break-word',
                                        color: theme.palette.text.primary,
                                        fontWeight: 400,
                                        letterSpacing: '0.01em',
                                        textAlign: { xs: 'center', md: 'left' },
                                        maxWidth: '100%',
                                        transition: 'color 0.3s ease-in-out',
                                    }}
                                >
                                    4/196, West Thottam, Jakkarpalayam, Pollachi, Tamil Nadu - 642202
                                </Typography>
                            </Stack>

                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                sx={{
                                    mb: { xs: 2, sm: 3 },
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                }}
                            >
                                <EmailIcon
                                    sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                        lineHeight: 1.6,
                                        wordBreak: 'break-word',
                                        color: theme.palette.text.primary,
                                        fontWeight: 400,
                                        letterSpacing: '0.01em',
                                        textAlign: { xs: 'center', md: 'left' },
                                        maxWidth: '100%',
                                        transition: 'color 0.3s ease-in-out',
                                    }}
                                >
                                    pragathinaturalfarm@gmail.com
                                </Typography>
                            </Stack>

                            <Button
                                variant="contained"
                                startIcon={<WhatsAppIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />}
                                sx={{
                                    bgcolor: '#ffc107',
                                    color: '#222',
                                    fontWeight: 600,
                                    borderRadius: { xs: 2, sm: 3 },
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    px: { xs: 2, sm: 3 },
                                    py: { xs: 1, sm: 1 },
                                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                    minHeight: { xs: 40, sm: 44 }, // Touch-friendly
                                    maxWidth: { xs: '100%', sm: 280 },
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        bgcolor: '#ffb300',
                                        transform: { xs: 'none', sm: 'translateY(-2px)' },
                                        boxShadow: { xs: 1, sm: 3 },
                                    },
                                    '&:active': {
                                        transform: 'scale(0.98)',
                                    },
                                }}
                                href="https://wa.me/919876543210"
                                target="_blank"
                            >
                                Click here to chat on WhatsApp
                            </Button>
                        </Box>
                    </Grid>

                    {/* Center Columns: Quick Links & Policy */}
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                        <Grid container spacing={{ xs: 2, sm: 3 }}>
                            {/* Quick Links */}
                            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                                <Box sx={{
                                    textAlign: { xs: 'center', md: 'left' },
                                    mb: { xs: 3, md: 0 },
                                }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        mb={2}
                                        sx={{
                                            fontSize: { xs: '1rem', sm: '1.1rem' },
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        Quick Links
                                    </Typography>
                                    <Stack spacing={{ xs: 2, sm: 2 }}>
                                        <Link
                                            href="/about"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            About Us
                                        </Link>
                                        <Link
                                            href="/benefits"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Benefits Of Pragathi Farms
                                        </Link>
                                        <Link
                                            href="/blog"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Blog
                                        </Link>
                                        <Link
                                            href="/journey"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Our Journey
                                        </Link>
                                        <Link
                                            href="/contact"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Contact Us
                                        </Link>
                                        <Link
                                            href="/terms"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Terms & Conditions
                                        </Link>
                                        <Link
                                            href="/delivery"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Delivery Information
                                        </Link>
                                    </Stack>
                                </Box>
                            </Grid>

                            {/* Our Policy & My Account */}
                            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                                <Box sx={{
                                    textAlign: { xs: 'center', md: 'left' },
                                }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        mb={2}
                                        sx={{
                                            fontSize: { xs: '1rem', sm: '1.1rem' },
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        Our Policy
                                    </Typography>
                                    <Stack spacing={{ xs: 2, sm: 2 }} sx={{ mb: { xs: 3, sm: 4 } }}>
                                        <Link
                                            href="/privacy"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Privacy Policy
                                        </Link>
                                        <Link
                                            href="/shipping"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Shipping Policy
                                        </Link>
                                        <Link
                                            href="/returns"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Return Policy
                                        </Link>
                                        <Link
                                            href="/refund"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Refund Policy
                                        </Link>
                                    </Stack>

                                    {/* My Account */}
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        mb={2}
                                        sx={{
                                            fontSize: { xs: '1rem', sm: '1.1rem' },
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        My Account
                                    </Typography>
                                    <Stack spacing={{ xs: 2, sm: 2 }}>
                                        <Link
                                            href="/profile"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            href="/orders"
                                            color="inherit"
                                            underline="hover"
                                            sx={{
                                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                transition: 'color 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: theme.palette.primary.main,
                                                },
                                            }}
                                        >
                                            Order History
                                        </Link>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Right Column: Social, Newsletter */}
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                        <Box sx={{
                            textAlign: { xs: 'center', md: 'left' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', md: 'flex-start' },
                        }}>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                mb={2}
                                sx={{
                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                    color: theme.palette.primary.main,
                                }}
                            >
                                Follow us on
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={{ xs: 1, sm: 2 }}
                                sx={{
                                    mb: { xs: 3, sm: 4 },
                                    justifyContent: { xs: 'center', md: 'flex-start' },
                                    flexWrap: 'wrap',
                                }}
                            >
                                <IconButton
                                    color="inherit"
                                    href="https://facebook.com"
                                    target="_blank"
                                    sx={{
                                        minWidth: { xs: 40, sm: 48 },
                                        minHeight: { xs: 40, sm: 48 },
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            bgcolor: theme.palette.primary.main,
                                            color: 'white',
                                            transform: { xs: 'none', sm: 'translateY(-2px)' },
                                        },
                                    }}
                                >
                                    <FacebookIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    href="https://www.instagram.com/pragathinaturalfarm?igsh=NWdleDA3Zndla3Vk"
                                    target="_blank"
                                    sx={{
                                        minWidth: { xs: 40, sm: 48 },
                                        minHeight: { xs: 40, sm: 48 },
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            bgcolor: theme.palette.primary.main,
                                            color: 'white',
                                            transform: { xs: 'none', sm: 'translateY(-2px)' },
                                        },
                                    }}
                                >
                                    <InstagramIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    href="https://youtube.com/@k.sampathkumar2667?feature=shared"
                                    target="_blank"
                                    sx={{
                                        minWidth: { xs: 40, sm: 48 },
                                        minHeight: { xs: 40, sm: 48 },
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            bgcolor: theme.palette.primary.main,
                                            color: 'white',
                                            transform: { xs: 'none', sm: 'translateY(-2px)' },
                                        },
                                    }}
                                >
                                    <YouTubeIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    href="https://linkedin.com"
                                    target="_blank"
                                    sx={{
                                        minWidth: { xs: 40, sm: 48 },
                                        minHeight: { xs: 40, sm: 48 },
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            bgcolor: theme.palette.primary.main,
                                            color: 'white',
                                            transform: { xs: 'none', sm: 'translateY(-2px)' },
                                        },
                                    }}
                                >
                                    <LinkedInIcon fontSize="small" />
                                </IconButton>
                            </Stack>

                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Box
                    sx={{
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                        pt: { xs: 2, sm: 3 },
                        mt: { xs: 2, sm: 3 },
                    }}
                >
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            opacity: 0.8,
                            fontWeight: 500,
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            lineHeight: 1.5,
                            px: 2,
                            color: theme.palette.text.secondary,
                        }}
                    >
                        © {new Date().getFullYear()} Pragathi Natural Farms. Powered by{' '}
                        <Link
                            href="https://thinkbyai.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.primary.main,
                                textDecoration: 'none',
                                transition: 'color 0.2s ease-in-out',
                                '&:hover': {
                                    color: theme.palette.secondary.main,
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            thinkbyai.in
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
