import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
// Icons for mobile navigation (used in mobile drawer)
// import FactoryIcon from '@mui/icons-material/Factory';
// import SpaIcon from '@mui/icons-material/Spa';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { 
  AppBar, 
  Badge, 
  Box, 
  Button, 
  Drawer, 
  IconButton, 
  Toolbar, 
  Typography, 
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  InputBase,
  Popper,
  Grow,
  Paper,
  Collapse,
  Dialog
} from '@mui/material';
import { alpha, keyframes, styled } from '@mui/material/styles';
// import { motion } from 'framer-motion'; // Not used in current implementation
import React, { useState, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { ColorModeContext } from '../main';
import { useGetCartQuery } from '../features/cart/api';
import { useLogoutMutation } from '../features/auth/api';
import { useUserRole } from '../hooks/useUserRole';
import { useWishlist } from '../contexts/WishlistContext';

//-----------------------------------------------------------------------------------------------------------------------------

// TypeScript interfaces
interface NavLink {
  label: string;
  to?: string;
  dropdown?: DropdownItem[];
}

interface DropdownItem {
  label: string;
  to: string;
  icon?: React.ComponentType<any>;
}

interface ProductCategory {
  id: number;
  name: string;
  icon: React.ComponentType<any>;
}

// Product categories with icons
const productCategories: ProductCategory[] = [
  { id: 28, name: 'Agarbathi', icon: LocalActivityIcon },
  { id: 29, name: 'Annapodi', icon: LocalGroceryStoreIcon },
  { id: 30, name: 'Dhoop sticks', icon: LocalActivityIcon },
  { id: 31, name: 'Dry Graphs', icon: LocalGroceryStoreIcon },
  { id: 32, name: 'Dry Nuts', icon: LocalGroceryStoreIcon },
  { id: 33, name: 'Flakes', icon: LocalGroceryStoreIcon },
  { id: 34, name: 'Honey', icon: LocalGroceryStoreIcon },
  { id: 35, name: 'Maavu', icon: LocalGroceryStoreIcon },
  { id: 36, name: 'Malt', icon: LocalGroceryStoreIcon },
  { id: 37, name: 'Masala', icon: LocalGroceryStoreIcon },
  { id: 38, name: 'Millet', icon: LocalGroceryStoreIcon },
  { id: 39, name: 'Noodles', icon: LocalDiningIcon },
  { id: 40, name: 'Nuts and Seeds', icon: LocalGroceryStoreIcon },
  { id: 41, name: 'Oil', icon: LocalGroceryStoreIcon },
  { id: 42, name: 'Paruppu', icon: LocalGroceryStoreIcon },
  { id: 43, name: 'Payiru', icon: LocalGroceryStoreIcon },
  { id: 44, name: 'Rasapodi', icon: LocalGroceryStoreIcon },
  { id: 45, name: 'Rice', icon: LocalGroceryStoreIcon },
  { id: 46, name: 'Rock Salt', icon: LocalGroceryStoreIcon },
  { id: 47, name: 'Soap', icon: LocalPharmacyIcon },
  { id: 48, name: 'Soup', icon: LocalDiningIcon },
  { id: 49, name: 'Spices', icon: LocalGroceryStoreIcon },
  { id: 50, name: 'Tea', icon: LocalCafeIcon },
];

// Update navLinks to support dropdowns
const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Farm store',
    to: '/products',
    dropdown: productCategories.map(cat => ({
      label: cat.name,
      to: `/products?category=${cat.id}`,
      icon: cat.icon
    }))
  },
  {
    label: 'Engineering Solutions',
    dropdown: [
      { label: 'Jeevamirthom unit', to: '/engineering/jeevamirthom' },
      { label: 'Bio digestric', to: '/engineering/bio-digestric' },
      { label: 'Bio gas', to: '/engineering/bio-gas' },
      { label: 'Cow shed design and automation', to: '/engineering/cow-shed' },
      { label: 'Drip automation', to: '/engineering/drip-automation' },
      { label: 'Bio fertilizer production unit', to: '/engineering/bio-fertilizer' },
    ],
  },
  {
    label: 'Nursery',
    dropdown: [
      { label: 'Coconut tree', to: '/nursery/coconut-tree' },
      { label: 'Medicinal plant', to: '/nursery/medicinal-plant' },
      { label: 'Vermi compost', to: '/nursery/vermi-compost' },
    ],
  },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

//-----------------------------------------------------------------------------------------------------------------------------

// Add this before the Header component
const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

// Enhanced responsive search bar for desktop
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.10),
  },
  marginLeft: 0,
  width: '100%',
  transition: 'all 0.2s ease-in-out',
  [theme.breakpoints.up('md')]: {
    minWidth: '150px',
    maxWidth: '180px',
  },
  [theme.breakpoints.up('lg')]: {
    minWidth: '180px',
    maxWidth: '220px',
  },
  [theme.breakpoints.up('xl')]: {
    minWidth: '200px',
    maxWidth: '250px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.75, 1, 0.75, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.8rem',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      fontSize: '0.85rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '0.9rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '0.95rem',
    },
  },
}));

//-----------------------------------------------------------------------------------------------------------------------------

const Header: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Media queries for responsive design
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [dropdownAnchor, setDropdownAnchor] = useState<null | HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
  const [moreMenuAnchor, setMoreMenuAnchor] = useState<null | HTMLElement>(null);
  
  // Context and hooks
  const colorMode = useContext(ColorModeContext);
  const { role } = useUserRole();
  const isAuthenticated = !!localStorage.getItem('jwt');
  const isAdmin = isAuthenticated && role === 'admin';
  const { data: cartData } = useGetCartQuery();
  const cartCount = cartData?.item_count || 0;
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;
  const [logout] = useLogoutMutation();

  const handleFarmStoreClick = () => {
    navigate('/products');
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch(searchQuery);
    }
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setAccountMenuAnchor(event.currentTarget);
    } else {
      navigate('/login');
    }
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleProfileClick = () => {
    handleAccountMenuClose();
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem('jwt');
      handleAccountMenuClose();
      navigate('/');
    } catch (err) {
      // Handle logout error
    }
  };

  const handleCreateProduct = () => {
    handleAccountMenuClose();
    navigate('/admin/products/new');
  };

  const handleCreateCategory = () => {
    handleAccountMenuClose();
    navigate('/admin/categories/new');
  };

  const handleManageCategories = () => {
    handleAccountMenuClose();
    navigate('/admin/categories');
  };

  const handleManageProducts = () => {
    handleAccountMenuClose();
    navigate('/admin/products');
  };

  // More menu handlers for medium screens
  const handleMoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMoreMenuAnchor(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchor(null);
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
    handleMoreMenuClose();
  };

  const handleThemeToggle = () => {
    colorMode.toggleColorMode();
    handleMoreMenuClose();
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: theme.palette.background.default,
        width: '100%',
        overflow: 'hidden',
        willChange: 'transform',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        isolation: 'isolate',
      }}
    >
      {/* Flash News Banner */}
      <Box
        sx={{
          width: '100%',
          background: theme.palette.secondary.main,
          color: '#ffffff',
          overflow: 'hidden',
          height: { xs: 32, sm: 36, md: 40 },
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(140,198,63,0.06)',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
            display: 'inline-block',
            animation: `${marquee} 18s linear infinite`,
            px: 2,
            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          🔥 Free Shipping Alert! No delivery charges across India – shop your favorite items today!
        </Typography>
      </Box>

      {/* Main AppBar */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          background: theme.palette.mode === 'light'
            ? `linear-gradient(135deg, #d4f7d4 0%, #f0fff0 100%)`
            : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
          boxShadow: 'none',
          borderBottom: `1.5px solid ${theme.palette.divider}`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 56, sm: 64, md: 72 },
            px: { xs: 1, sm: 2, md: 3, lg: 4 },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Logo - Always visible with no wrapping */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Button
              component={NavLink}
              to="/"
              sx={{
                p: 0,
                minWidth: 0,
                fontWeight: 700,
                fontSize: { xs: 14, sm: 16, md: 18, lg: 20 },
                color: theme.palette.primary.main,
                textTransform: 'none',
                letterSpacing: 0.5,
                fontFamily: 'Playfair Display, serif',
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.5, sm: 1, md: 1.5 },
                whiteSpace: 'nowrap',
                '&:hover': {
                  background: 'transparent',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <img
                src="/logo.jpg"
                alt="Pragathi Natural Farms"
                style={{
                  height: 'clamp(28px, 4vw, 40px)',
                  width: 'clamp(28px, 4vw, 40px)',
                  borderRadius: 6,
                  background: theme.palette.background.paper,
                }}
              />
              <Box
                component="span"
                sx={{
                  display: 'inline',
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                }}
              >
                Pragathi Natural Farms
              </Box>
            </Button>
          </Box>

          {/* Navigation Links - Large and Medium screens */}
          {(isLargeScreen || isMediumScreen) && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flex: 1,
                justifyContent: 'center',
                mx: 2,
              }}
            >
              {navLinks.map((link) => {
                const isActive = link.to && location.pathname === link.to;
                const hasDropdown = !!link.dropdown;
                return (
                  <Box
                    key={link.label}
                    sx={{ position: 'relative' }}
                    onMouseEnter={hasDropdown ? (e: React.MouseEvent<HTMLElement>) => {
                      setDropdownAnchor(e.currentTarget);
                      setOpenDropdown(link.label);
                    } : undefined}
                    onMouseLeave={hasDropdown ? (e: React.MouseEvent<HTMLElement>) => {
                      const relatedTarget = e.relatedTarget as HTMLElement;
                      if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
                        setOpenDropdown(null);
                      }
                    } : undefined}
                  >
                    <Button
                      component={link.to ? NavLink : 'button'}
                      to={link.to}
                      onClick={link.label === 'Farm store' ? handleFarmStoreClick : undefined}
                      sx={{
                        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                        fontWeight: 600,
                        fontSize: { md: 13, lg: 14 },
                        textTransform: 'none',
                        px: { md: 1.5, lg: 2 },
                        py: 1,
                        borderRadius: 1,
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          color: theme.palette.primary.main,
                        },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      {link.label}
                    </Button>

                    {/* Dropdown Menu for Large and Medium Screens */}
                    {hasDropdown && openDropdown === link.label && (
                      <Popper
                        open={openDropdown === link.label}
                        anchorEl={dropdownAnchor}
                        placement="bottom-start"
                        transition
                        style={{ zIndex: 9999 }}
                      >
                        {({ TransitionProps }) => (
                          <Grow {...TransitionProps}>
                            <Paper
                              elevation={8}
                              sx={{
                                mt: 1,
                                minWidth: 220,
                                maxHeight: 400,
                                background: theme.palette.background.paper,
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                borderRadius: 2,
                                overflow: 'hidden',
                                zIndex: 9999,
                              }}
                            >
                              <Box sx={{ py: 2, px: 3, background: alpha(theme.palette.primary.main, 0.05) }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                  {link.label}
                                </Typography>
                              </Box>
                              <Box sx={{ maxHeight: 320, overflow: 'auto' }}>
                                {link.dropdown?.map((item, index) => {
                                  const Icon = (item as any).icon;
                                  return (
                                    <MenuItem
                                      key={index}
                                      component={NavLink}
                                      to={item.to}
                                      onClick={() => setOpenDropdown(null)}
                                      sx={{
                                        py: 2,
                                        px: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        '&:hover': {
                                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                        },
                                      }}
                                    >
                                      {Icon && <Icon sx={{ fontSize: 22, color: theme.palette.primary.main }} />}
                                      <ListItemText primary={item.label} />
                                    </MenuItem>
                                  );
                                })}
                              </Box>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    )}
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Search Bar - Large and Medium screens */}
          {(isLargeScreen || isMediumScreen) && (
            <Box sx={{ flex: { md: '0 1 150px', lg: '0 1 200px' }, maxWidth: { md: 150, lg: 200 } }}>
              <Box component="form" onSubmit={handleSearchSubmit} sx={{ width: '100%' }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search products..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                  />
                </Search>
              </Box>
            </Box>
          )}

          {/* Right Side Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            {/* Large Screen Icons - All visible */}
            {isLargeScreen && (
              <>
                <IconButton
                  onClick={() => navigate('/wishlist')}
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.15),
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Badge badgeContent={wishlistCount} color="error">
                    <FavoriteIcon fontSize="small" />
                  </Badge>
                </IconButton>

                <IconButton
                  onClick={() => navigate('/cart')}
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.15),
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Badge badgeContent={cartCount} color="secondary">
                    <ShoppingCartIcon fontSize="small" />
                  </Badge>
                </IconButton>

                <IconButton
                  onClick={colorMode.toggleColorMode}
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.15),
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {theme.palette.mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                </IconButton>

                <IconButton
                  onClick={handleAccountMenuOpen}
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.15),
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <AccountCircle fontSize="small" />
                </IconButton>
              </>
            )}

            {/* Medium Screen Icons - Cart and Account only */}
            {isMediumScreen && (
              <>
                <IconButton
                  onClick={() => navigate('/cart')}
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.15),
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Badge badgeContent={cartCount} color="secondary">
                    <ShoppingCartIcon fontSize="small" />
                  </Badge>
                </IconButton>

                <IconButton
                  onClick={handleAccountMenuOpen}
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.15),
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <AccountCircle fontSize="small" />
                </IconButton>

                {/* More Menu for Medium Screens */}
                <IconButton
                  onClick={handleMoreMenuOpen}
                  sx={{
                    color: theme.palette.primary.main,
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.15),
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <MenuIcon fontSize="small" />
                </IconButton>
              </>
            )}

            {/* Small Screen - Only Hamburger Menu */}
            {isSmallScreen && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: theme.palette.primary.main,
                  minWidth: 40,
                  minHeight: 40,
                  borderRadius: '50%',
                  background: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.15),
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* More Menu for Medium Screens */}
      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={handleMoreMenuClose}
        sx={{ zIndex: 9999 }}
      >
        <MenuItem onClick={handleWishlistClick}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Wishlist ({wishlistCount})</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleThemeToggle}>
          <ListItemIcon>
            {theme.palette.mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</ListItemText>
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          zIndex: 9999,
          '& .MuiDrawer-paper': {
            width: { xs: '100vw', sm: 320 },
            maxWidth: '100vw',
            background: theme.palette.mode === 'light'
              ? `linear-gradient(135deg, #f0fff0 0%, #e8f5e8 100%)`
              : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
            borderRight: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          },
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" color="primary" fontWeight={700}>
              Menu
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Search */}
          <Box sx={{ mb: 3 }}>
            <Box component="form" onSubmit={handleSearchSubmit}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search products..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                />
              </Search>
            </Box>
          </Box>

          {/* Mobile Navigation Links */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
            {/* Wishlist */}
            <Button
              component={NavLink}
              to="/wishlist"
              onClick={() => setDrawerOpen(false)}
              sx={{
                color: location.pathname === '/wishlist' ? theme.palette.primary.main : theme.palette.text.secondary,
                fontWeight: 600,
                justifyContent: 'flex-start',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1.5,
                px: 2,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <FavoriteIcon sx={{ color: theme.palette.primary.main }} />
              Wishlist ({wishlistCount})
            </Button>

            {/* Cart */}
            <Button
              component={NavLink}
              to="/cart"
              onClick={() => setDrawerOpen(false)}
              sx={{
                color: location.pathname === '/cart' ? theme.palette.primary.main : theme.palette.text.secondary,
                fontWeight: 600,
                justifyContent: 'flex-start',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1.5,
                px: 2,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <ShoppingCartIcon sx={{ color: theme.palette.primary.main }} />
              Cart ({cartCount})
            </Button>

            {/* Theme Toggle */}
            <Button
              onClick={() => {
                colorMode.toggleColorMode();
                setDrawerOpen(false);
              }}
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 600,
                justifyContent: 'flex-start',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1.5,
                px: 2,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              {theme.palette.mode === 'dark' ? (
                <Brightness7Icon sx={{ color: theme.palette.primary.main }} />
              ) : (
                <Brightness4Icon sx={{ color: theme.palette.primary.main }} />
              )}
              {theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>

            <Divider sx={{ my: 2 }} />

            {/* Navigation Links */}
            {navLinks.map((link) => {
              const hasDropdown = !!link.dropdown;
              const isDropdownOpen = mobileDropdownOpen[link.label];
              return (
                <Box key={link.label}>
                  <Button
                    component={link.to && !hasDropdown ? NavLink : 'button'}
                    to={link.to && !hasDropdown ? link.to : undefined}
                    onClick={() => {
                      if (hasDropdown) {
                        setMobileDropdownOpen(prev => ({
                          ...prev,
                          [link.label]: !prev[link.label]
                        }));
                      } else if (link.to) {
                        setDrawerOpen(false);
                      }
                    }}
                    sx={{
                      color: (link.to && location.pathname === link.to) ? theme.palette.primary.main : theme.palette.text.secondary,
                      fontWeight: 600,
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 1.5,
                      px: 2,
                      borderRadius: 1,
                      width: '100%',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    {link.label}
                    {hasDropdown && (
                      <Box sx={{ ml: 'auto' }}>
                        {isDropdownOpen ? '▲' : '▼'}
                      </Box>
                    )}
                  </Button>

                  {/* Mobile Dropdown */}
                  {hasDropdown && (
                    <Collapse in={isDropdownOpen}>
                      <Box sx={{ pl: 3, pt: 1 }}>
                        {link.dropdown?.map((item) => {
                          const IconComponent = (item as any).icon;
                          return (
                            <Button
                              key={item.to}
                              component={NavLink}
                              to={item.to}
                              onClick={() => setDrawerOpen(false)}
                              sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 500,
                                justifyContent: 'flex-start',
                                textTransform: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                py: 1,
                                px: 2,
                                borderRadius: 1,
                                width: '100%',
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                },
                              }}
                            >
                              {IconComponent && (
                                <IconComponent sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                              )}
                              {item.label}
                            </Button>
                          );
                        })}
                      </Box>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Drawer>

      {/* Mobile Search Dialog */}
      <Dialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        fullScreen
        sx={{ zIndex: 9999 }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => setSearchOpen(false)}>
            <CloseIcon />
          </IconButton>
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ flex: 1 }}>
            <InputBase
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              sx={{
                width: '100%',
                fontSize: '1.1rem',
                p: 1,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 1,
                minHeight: 48,
              }}
            />
          </Box>
        </Box>
      </Dialog>

      {/* Account Menu */}
      <Menu
        anchorEl={accountMenuAnchor}
        open={Boolean(accountMenuAnchor)}
        onClose={handleAccountMenuClose}
        sx={{ zIndex: 9999 }}
      >
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        {isAdmin && (
          <>
            <Divider />
            <MenuItem onClick={handleCreateProduct}>
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Create Product</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleCreateCategory}>
              <ListItemIcon>
                <CategoryIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Create Category</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleManageProducts}>
              <ListItemIcon>
                <ListAltIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Manage Products</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleManageCategories}>
              <ListItemIcon>
                <ListAltIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Manage Categories</ListItemText>
            </MenuItem>
            <Divider />
          </>
        )}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;