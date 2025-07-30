import { createTheme } from '@mui/material/styles';

// Logo-inspired colors
export const brandColors = {
  green: '#43b047', // logo green
  lightGreen: '#6fdc8c', // accent light green
  mint: '#4ecca3', // minty accent
  white: '#fff',
  surface: '#f7faf7', // very light greenish gray
  darkBg: '#1a2e22', // deep green/charcoal for dark mode
  darkPaper: '#223427', // dark card surface
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
    palette: {
      mode,
      primary: { main: brandColors.green },
      secondary: { main: brandColors.lightGreen },
      background: {
        default: mode === 'light' ? brandColors.white : brandColors.darkBg,
        paper: mode === 'light' ? brandColors.surface : brandColors.darkPaper,
      },
      text: {
        primary: mode === 'light' ? '#222' : brandColors.surface,
        secondary: mode === 'light' ? brandColors.green : brandColors.lightGreen,
      },
      success: { main: brandColors.lightGreen },
      warning: { main: '#fbc02d' },
      error: { main: '#e57373' },
      info: { main: brandColors.mint },
    },
    typography: {
      fontFamily: 'Inter, Lato, Manrope, sans-serif',
      h1: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 700,
        fontSize: '2.8rem',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 600,
        fontSize: '2.2rem',
        letterSpacing: '-0.01em',
      },
      h3: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 600,
        fontSize: '1.7rem',
      },
      h4: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 500,
        fontSize: '1.3rem',
      },
      h5: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 500,
        fontSize: '1.1rem',
      },
      h6: {
        fontFamily: 'Playfair Display, Merriweather, serif',
        fontWeight: 500,
        fontSize: '1rem',
      },
      body1: {
        fontFamily: 'Inter, Lato, Manrope, sans-serif',
        fontSize: '1rem',
      },
      body2: {
        fontFamily: 'Inter, Lato, Manrope, sans-serif',
        fontSize: '0.95rem',
      },
    },
    shape: { borderRadius: 16 },
    shadows,
    transitions: {
      duration: { shortest: 120, shorter: 180, short: 250, standard: 300, complex: 375, enteringScreen: 225, leavingScreen: 195 },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0px 2px 8px rgba(67, 176, 71, 0.08)',
            transition: 'background 0.2s, box-shadow 0.2s',
            '&:hover': {
              backgroundColor: mode === 'light' ? brandColors.lightGreen : brandColors.green,
              color: '#fff',
              boxShadow: '0px 4px 16px rgba(67, 176, 71, 0.12)',
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
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            background: mode === 'light' ? brandColors.surface : brandColors.darkPaper,
            transition: 'background 0.2s',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: '0px 4px 24px rgba(67, 176, 71, 0.08)',
            transition: 'box-shadow 0.2s',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'transparent',
            boxShadow: 'none',
            borderBottom: `1.5px solid ${mode === 'light' ? brandColors.green : brandColors.lightGreen}`,
            transition: 'border-color 0.2s',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            transition: 'background 0.2s',
            '&:hover': {
              background: mode === 'light' ? brandColors.lightGreen : brandColors.green,
              color: '#fff',
            },
          },
        },
      },
      // Add more component overrides as needed
    },
    direction: 'ltr',
  });

export default getTheme;