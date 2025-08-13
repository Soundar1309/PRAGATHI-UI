import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// Logo-inspired colors
export const brandColors = {
  green: '#43b047', // logo green
  lightGreen: '#6fdc8c', // accent light green
  mint: '#4ecca3', // minty accent
  white: '#fff',
  surface: '#f7faf7', // very light greenish gray
  // Updated dark theme colors - more suitable for nature app
  darkBg: '#1a1a1a', // dark background for dark mode
  darkPaper: '#2d2d2d', // dark paper for dark mode
  // New header and footer colors
  headerGradient: {
    start: '#d4f7d4', // soft green start
    end: '#f0fff0',   // soft green end
  },
  footerBg: '#d4f7d4', // match header start color
  // Enhanced color palette
  primaryLight: '#a8e6a8', // light primary for subtle effects
  secondaryLight: '#c8f5c8', // light secondary
  accentGreen: '#8bc34a', // additional green accent
  warmBeige: '#f5f5dc', // warm beige for backgrounds
  darkGreen: '#2e7d32', // dark green for dark mode
  lightBeige: '#faf8f0', // light beige variant
  // Dark theme alternatives - darker, nature-inspired
  darkThemeBg: '#1a1a1a', // dark background
  darkThemePaper: '#2d2d2d', // dark paper
  darkThemeSurface: '#242424', // dark surface
};

// MUI expects exactly 25 shadow values (tuple type, first is 'none')
const shadows: [
  'none', string, string, string, string,
  string, string, string, string, string,
  string, string, string, string, string,
  string, string, string, string, string,
  string, string, string, string, string
] = [
  'none',
  '0px 2px 8px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)',
  '0px 4px 24px rgba(67, 176, 71, 0.08)'
];

export const getTheme = (mode: 'light' | 'dark' = 'light') =>
  createTheme({
    // Enhanced responsive breakpoints
    breakpoints: {
      values: {
        xs: 0,     // small mobile
        sm: 480,   // large mobile & small tablet
        md: 768,   // tablet & small laptop  
        lg: 1024,  // desktop
        xl: 1280,  // large desktop
      },
    },
    palette: {
      mode,
      primary: { 
        main: brandColors.green,
        light: brandColors.primaryLight,
        dark: brandColors.darkGreen,
      },
      secondary: { 
        main: brandColors.lightGreen,
        light: brandColors.secondaryLight,
        dark: brandColors.accentGreen,
      },
      background: {
        default: mode === 'light' ? brandColors.lightBeige : brandColors.darkThemeBg,
        paper: mode === 'light' ? brandColors.warmBeige : brandColors.darkThemePaper,
      },
      text: {
        primary: mode === 'light' ? '#222' : '#ffffff', // White text for dark mode
        secondary: mode === 'light' ? brandColors.green : brandColors.lightGreen, // Lighter green for dark mode
      },
      success: { 
        main: brandColors.lightGreen,
        light: brandColors.primaryLight,
        dark: brandColors.darkGreen,
      },
      warning: { 
        main: '#fbc02d',
        light: '#fff59d',
        dark: '#f57f17',
      },
      error: { 
        main: '#e57373',
        light: '#ffcdd2',
        dark: '#c62828',
      },
      info: { 
        main: brandColors.mint,
        light: '#b2dfdb',
        dark: '#00695c',
      },
    },
    // Enhanced responsive typography
    typography: {
      fontFamily: 'Inter, Lato, Manrope, sans-serif',
      h1: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 700,
        fontSize: '1.75rem', // 28px base
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        '@media (min-width:480px)': {
          fontSize: '2.25rem', // 36px
        },
        '@media (min-width:768px)': {
          fontSize: '2.5rem', // 40px
        },
        '@media (min-width:1024px)': {
          fontSize: '2.8rem', // 45px
        },
      },
      h2: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 600,
        fontSize: '1.5rem', // 24px base
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        '@media (min-width:480px)': {
          fontSize: '1.75rem', // 28px
        },
        '@media (min-width:768px)': {
          fontSize: '2rem', // 32px
        },
        '@media (min-width:1024px)': {
          fontSize: '2.2rem', // 35px
        },
      },
      h3: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 600,
        fontSize: '1.25rem', // 20px base
        lineHeight: 1.4,
        '@media (min-width:480px)': {
          fontSize: '1.375rem', // 22px
        },
        '@media (min-width:768px)': {
          fontSize: '1.5rem', // 24px
        },
        '@media (min-width:1024px)': {
          fontSize: '1.7rem', // 27px
        },
      },
      h4: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 500,
        fontSize: '1.125rem', // 18px base
        lineHeight: 1.4,
        '@media (min-width:480px)': {
          fontSize: '1.25rem', // 20px
        },
        '@media (min-width:1024px)': {
          fontSize: '1.3rem', // 21px
        },
      },
      h5: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 500,
        fontSize: '1rem', // 16px base
        lineHeight: 1.5,
        '@media (min-width:480px)': {
          fontSize: '1.0625rem', // 17px
        },
        '@media (min-width:1024px)': {
          fontSize: '1.1rem', // 18px
        },
      },
      h6: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 500,
        fontSize: '0.875rem', // 14px base
        lineHeight: 1.5,
        '@media (min-width:480px)': {
          fontSize: '0.9375rem', // 15px
        },
        '@media (min-width:1024px)': {
          fontSize: '1rem', // 16px
        },
      },
      body1: {
        fontFamily: 'Inter, Lato, Manrope, sans-serif',
        fontSize: '0.875rem', // 14px base
        lineHeight: 1.6,
        '@media (min-width:480px)': {
          fontSize: '0.9375rem', // 15px
        },
        '@media (min-width:1024px)': {
          fontSize: '1rem', // 16px
        },
      },
      body2: {
        fontFamily: 'Inter, Lato, Manrope, sans-serif',
        fontSize: '0.8125rem', // 13px base
        lineHeight: 1.5,
        '@media (min-width:480px)': {
          fontSize: '0.875rem', // 14px
        },
        '@media (min-width:1024px)': {
          fontSize: '0.95rem', // 15px
        },
      },
      button: {
        fontSize: '0.875rem', // 14px base
        fontWeight: 600,
        textTransform: 'none',
        '@media (min-width:480px)': {
          fontSize: '0.9375rem', // 15px
        },
      },
    },
    // Responsive spacing
    spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64],
    shape: { borderRadius: 16 },
    shadows,
    transitions: {
      duration: { 
        shortest: 120, 
        shorter: 180, 
        short: 250, 
        standard: 300, 
        complex: 375, 
        enteringScreen: 225, 
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
    components: {
      // Enhanced responsive button styles
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            minHeight: 44, // Touch-friendly height
            padding: '8px 16px',
            boxShadow: '0px 2px 8px rgba(67, 176, 71, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '@media (min-width:480px)': {
              padding: '10px 20px',
              minHeight: 48,
            },
            '@media (min-width:768px)': {
              padding: '12px 24px',
            },
            '&:hover': {
              backgroundColor: mode === 'light' ? brandColors.lightGreen : brandColors.primaryLight,
              color: '#fff', // Keep white text for good contrast
              boxShadow: '0px 4px 16px rgba(67, 176, 71, 0.12)',
              transform: 'translateY(-2px)',
            },
          },
          containedPrimary: {
            backgroundColor: brandColors.green,
            color: '#fff',
            '&:hover': {
              backgroundColor: brandColors.lightGreen,
            },
          },
        },
      },
      // Enhanced responsive Paper component
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            background: mode === 'light' ? brandColors.warmBeige : brandColors.darkPaper,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '@media (max-width:480px)': {
              borderRadius: 12,
            },
          },
        },
      },
      // Enhanced responsive Card component
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: '0px 4px 24px rgba(67, 176, 71, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '@media (max-width:480px)': {
              borderRadius: 16,
            },
            '&:hover': {
              boxShadow: '0px 8px 32px rgba(67, 176, 71, 0.12)',
              transform: 'translateY(-4px)',
            },
          },
        },
      },
      // Responsive AppBar with new header colors
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === 'light' 
              ? `linear-gradient(135deg, ${brandColors.headerGradient.start} 0%, ${brandColors.headerGradient.end} 100%)`
              : `linear-gradient(135deg, ${brandColors.darkThemeBg} 0%, ${brandColors.darkThemePaper} 100%)`,
            boxShadow: 'none',
            borderBottom: `1.5px solid ${mode === 'light' ? alpha(brandColors.green, 0.15) : alpha(brandColors.green, 0.3)}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            padding: '0 8px',
            '@media (min-width:480px)': {
              padding: '0 16px',
            },
            '@media (min-width:768px)': {
              padding: '0 24px',
            },
          },
        },
      },
      // Responsive Toolbar
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: '56px !important',
            padding: '0 !important',
            '@media (min-width:480px)': {
              minHeight: '64px !important',
            },
            '@media (min-width:768px)': {
              minHeight: '72px !important',
            },
          },
        },
      },
      // Enhanced responsive ListItem
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            minHeight: 48, // Touch-friendly
            '@media (min-width:480px)': {
              minHeight: 52,
            },
            '&:hover': {
              background: mode === 'light' ? brandColors.lightGreen : brandColors.green,
              color: '#fff',
              transform: 'translateX(4px)',
            },
          },
        },
      },
      // Responsive IconButton for touch-friendly interaction
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 8,
            minWidth: 44,
            minHeight: 44,
            '@media (min-width:480px)': {
              padding: 10,
              minWidth: 48,
              minHeight: 48,
            },
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          },
        },
      },
      // Responsive TextField
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              minHeight: 44,
              '@media (min-width:480px)': {
                minHeight: 48,
              },
            },
          },
        },
      },
      // Responsive Container
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: 16,
            paddingRight: 16,
            '@media (min-width:480px)': {
              paddingLeft: 24,
              paddingRight: 24,
            },
            '@media (min-width:768px)': {
              paddingLeft: 32,
              paddingRight: 32,
            },
          },
        },
      },
      // Responsive Grid system
      MuiGrid: {
        styleOverrides: {
          root: {
            // Ensure proper responsive spacing
            '&.MuiGrid-container': {
              margin: 0,
              width: '100%',
            },
          },
        },
      },
      // Responsive Drawer
      MuiDrawer: {
        styleOverrides: {
          paper: {
            width: '280px',
            '@media (max-width:480px)': {
              width: '100vw',
            },
            '@media (min-width:480px) and (max-width:768px)': {
              width: '320px',
            },
          },
        },
      },
      // Enhanced Typography for better contrast
      MuiTypography: {
        styleOverrides: {
          root: {
            transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          h1: {
            color: mode === 'light' ? '#222' : '#ffffff',
          },
          h2: {
            color: mode === 'light' ? '#222' : '#ffffff',
          },
          h3: {
            color: mode === 'light' ? '#222' : '#ffffff',
          },
          h4: {
            color: mode === 'light' ? '#222' : '#ffffff',
          },
          h5: {
            color: mode === 'light' ? '#222' : '#ffffff',
          },
          h6: {
            color: mode === 'light' ? '#222' : '#ffffff',
          },
          body1: {
            color: mode === 'light' ? '#333' : '#e0e0e0',
          },
          body2: {
            color: mode === 'light' ? '#666' : '#b0b0b0',
          },
        },
      },
    },
    direction: 'ltr',
  });

export default getTheme;