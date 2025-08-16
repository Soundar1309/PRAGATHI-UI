import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FactoryIcon from '@mui/icons-material/Factory';
import SpaIcon from '@mui/icons-material/Spa';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { AppBar, Badge, Box, Button, Drawer, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import InputBase from '@mui/material/InputBase';
import { alpha, keyframes, styled } from '@mui/material/styles';
import {  motion } from 'framer-motion';
import React, { useState, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/Category';
import Divider from '@mui/material/Divider';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { ColorModeContext } from '../main';
import { useGetCartQuery } from '../features/cart/api';
import { useLogoutMutation } from '../features/auth/api';
import { useUserRole } from '../hooks/useUserRole';
import { useWishlist } from '../contexts/WishlistContext';

//-----------------------------------------------------------------------------------------------------------------------------

// Product categories with icons
const productCategories = [
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
const navLinks = [
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
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
    minWidth: '200px',
  },
  [theme.breakpoints.up('md')]: {
    minWidth: '250px',
  },
  [theme.breakpoints.up('lg')]: {
    minWidth: '300px',
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
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.875rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.9rem',
    },
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      fontSize: '1rem',
    },
  },
}));

//-----------------------------------------------------------------------------------------------------------------------------

const Header: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState<null | HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
  const colorMode = useContext(ColorModeContext);
  const { role } = useUserRole();
  const isAuthenticated = !!localStorage.getItem('jwt');
  const isAdmin = isAuthenticated && role === 'admin';
  const { data: cartData } = useGetCartQuery(undefined, { skip: !isAuthenticated });
  const cartCount = cartData?.item_count || 0;
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;
  const [logout] = useLogoutMutation();

  const handleFarmStoreClick = () => {
    // If clicking the main "Farm Store" button, navigate to all products
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
      // Redirect to login page if not authenticated
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
      // setAuthError('Failed to logout.'); // This line is removed
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

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar + 1,
        background: theme.palette.background.default,
        // Prevent horizontal scroll
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Running Banner */}
      <Box
        sx={{
          width: '100%',
          background: theme.palette.secondary.main,
          color: theme.palette.getContrastText(theme.palette.secondary.main),
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
          }}
        >
          🔥 Free Shipping Alert! No delivery charges across India – shop your favorite items today!
        </Typography>
      </Box>
      
      {/* AppBar and rest of header */}
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
        }}
      >
        {/* First Row - Logo & Icons (Desktop Only) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { md: 3, lg: 4 },
            py: 2,
            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a8e6a8' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              opacity: 0.6,
              pointerEvents: 'none',
            },
          }}
        >
          {/* Logo Container */}
          <Box>
            <Button
              component={NavLink}
              to="/"
              sx={{
                p: 0,
                minWidth: 0,
                fontWeight: 700,
                fontSize: { md: 20, lg: 22, xl: 24 },
                color: theme.palette.primary.main,
                textTransform: 'none',
                letterSpacing: 1,
                fontFamily: `'Playfair Display', 'Merriweather', serif`,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2.5,
                '&:hover': {
                  background: 'transparent',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <img
                src="/logo.jpg"
                alt="Pragathi Natural Farms"
                style={{
                  height: 'clamp(40px, 5vw, 50px)',
                  width: 'clamp(50px, 5vw, 50px)',
                  borderRadius: 8,
                  background: theme.palette.background.paper,
                  maxWidth: '100%',
                }}
              />
              <Box
                component="span"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  ml: 5,
                }}
              >
                Pragathi Natural Farms
              </Box>
            </Button>
          </Box>

          {/* Navigation Links - Moved to top row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { md: 1, lg: 1.5 },
              mx: { md: 2, lg: 3 },
            }}
          >
            {navLinks.map((link) => {
              const isActive = link.to && location.pathname === link.to;
              const hasDropdown = !!link.dropdown;
              return (
                <Box
                  key={link.label}
                  sx={{ 
                    position: 'relative',
                  }}
                  onMouseEnter={hasDropdown ? (e: React.MouseEvent<HTMLElement>) => { 
                    setDropdownAnchor(e.currentTarget); 
                    setOpenDropdown(link.label); 
                  } : undefined}
                  onMouseLeave={hasDropdown ? (e: React.MouseEvent<HTMLElement>) => {
                    // Only close if we're not moving to the dropdown menu
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
                    aria-haspopup={hasDropdown ? 'true' : undefined}
                    aria-expanded={openDropdown === link.label ? 'true' : undefined}
                    onFocus={hasDropdown ? (e: React.FocusEvent<HTMLElement>) => { setDropdownAnchor(e.currentTarget); setOpenDropdown(link.label); } : undefined}
                    onBlur={hasDropdown ? (e: React.FocusEvent<HTMLElement>) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenDropdown(null); } : undefined}
                    sx={{
                      color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                      fontWeight: 600,
                      fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                      fontSize: { md: 14, lg: 15, xl: 16 },
                      background: isActive 
                        ? alpha(theme.palette.primary.main, 0.1)
                        : 'transparent',
                      position: 'relative',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minHeight: 40,
                      px: { md: 1.5, lg: 2, xl: 2.5 },
                      py: 1,
                      borderRadius: 1,
                      border: isActive 
                        ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                        : '1px solid transparent',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.12),
                        color: theme.palette.primary.main,
                        borderColor: alpha(theme.palette.primary.main, 0.4),
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                  
                  {/* Dropdown Menu */}
                  {hasDropdown && openDropdown === link.label && (
                    <Popper
                      open={openDropdown === link.label}
                      anchorEl={dropdownAnchor}
                      placement="bottom-start"
                      transition
                      disablePortal
                      style={{ zIndex: 1300 }}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}
                        >
                          <Paper
                            elevation={8}
                            sx={{
                              mt: 1,
                              minWidth: 220,
                              background: theme.palette.background.paper,
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                              borderRadius: 2,
                              overflow: 'hidden',
                            }}
                          >
                            {link.dropdown?.map((item, index) => {
                              const Icon = (item as any).icon;
                              return (
                                <MenuItem
                                  key={index}
                                  component={NavLink}
                                  to={item.to}
                                  onClick={() => setOpenDropdown(null)}
                                  sx={{
                                    py: 1.5,
                                    px: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    '&:hover': {
                                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    },
                                  }}
                                >
                                  {Icon && <Icon sx={{ fontSize: 20, color: theme.palette.primary.main }} />}
                                  <ListItemText 
                                    primary={item.label}
                                    primaryTypographyProps={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                    }}
                                  />
                                </MenuItem>
                              );
                            })}
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  )}
                </Box>
              );
            })}
          </Box>

          {/* Right Side Icons & Search */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { md: 1.5, lg: 2 },
            }}
          >
            {/* Desktop Search Bar */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flex: { md: '0 1 280px', lg: '0 1 320px' },
                maxWidth: 320,
              }}
            >
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

            {/* Wishlist Button */}
            <IconButton 
              size="large" 
              aria-label="wishlist" 
              onClick={() => navigate('/wishlist')} 
              sx={{ 
                color: theme.palette.primary.main,
                minWidth: 48,
                minHeight: 48,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Badge badgeContent={wishlistCount} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            {/* Cart & Profile & Dark Mode Toggle */}
            <IconButton 
              size="large" 
              aria-label="cart" 
              onClick={() => navigate('/cart')} 
              sx={{ 
                color: theme.palette.primary.main,
                minWidth: 48,
                minHeight: 48,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton 
              size="large" 
              sx={{ 
                color: theme.palette.primary.main,
                minWidth: 48,
                minHeight: 48,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }} 
              onClick={handleAccountMenuOpen}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            {/* Dark mode toggle */}
            <IconButton 
              sx={{ 
                minWidth: 48,
                minHeight: 48,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }} 
              onClick={colorMode.toggleColorMode} 
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Box>

        {/* Mobile Toolbar - Keep existing mobile layout */}
        <Toolbar 
          sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            justifyContent: 'space-between', 
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 1, sm: 2 },
            background: theme.palette.mode === 'light' 
              ? `linear-gradient(135deg, #d4f7d4 0%, #f0fff0 100%)`
              : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          }}
        >
          {/* Logo for Mobile */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: { xs: 1, sm: 'none' } }}>
            <Button
              component={NavLink}
              to="/"
              sx={{
                p: 0,
                minWidth: 0,
                mr: { xs: 1, sm: 2 },
                fontWeight: 700,
                fontSize: { xs: 16, sm: 18 },
                color: theme.palette.primary.main,
                textTransform: 'none',
                letterSpacing: 1,
                fontFamily: `'Playfair Display', 'Merriweather', serif`,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: { xs: 0, sm: 1 },
                '&:hover': {
                  background: 'transparent',
                },
              }}
            >
              <img
                src="/logo.jpg"
                alt="Pragathi Natural Farms"
                style={{
                  height: 'clamp(28px, 5vw, 36px)',
                  marginRight: theme.breakpoints.up('sm') ? 8 : 0,
                  borderRadius: 8,
                  background: theme.palette.background.paper,
                  maxWidth: '100%',
                }}
              />
              <Box
                component="span"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Pragathi Natural Farms
              </Box>
              <Box
                component="span"
                sx={{
                  display: { xs: 'inline', sm: 'none' },
                  fontSize: '0.7rem',
                  textAlign: 'center',
                }}
              >
                Pragathi
              </Box>
            </Button>
          </Box>

          {/* Mobile Icons */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, sm: 1 },
              ml: 'auto',
            }}
          >
            <IconButton 
              onClick={() => setSearchOpen(true)} 
              sx={{ 
                color: theme.palette.primary.main,
                minWidth: 44,
                minHeight: 44,
                p: 1,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
            
            {/* Mobile Wishlist Button */}
            <IconButton 
              onClick={() => navigate('/wishlist')} 
              sx={{ 
                color: theme.palette.primary.main,
                minWidth: 44,
                minHeight: 44,
                p: 1,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Badge badgeContent={wishlistCount} color="error">
                <FavoriteIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton 
              size="large" 
              aria-label="cart" 
              onClick={() => navigate('/cart')} 
              sx={{ 
                color: theme.palette.primary.main,
                minWidth: 44,
                minHeight: 44,
                p: 1,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton 
              sx={{ 
                color: theme.palette.primary.main,
                minWidth: 44,
                minHeight: 44,
                p: 1,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }} 
              onClick={handleAccountMenuOpen}
            >
              <AccountCircle fontSize="small" />
            </IconButton>
            {/* Dark mode toggle */}
            <IconButton 
              sx={{ 
                minWidth: 44,
                minHeight: 44,
                p: 1,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }} 
              onClick={colorMode.toggleColorMode} 
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
            </IconButton>
            <IconButton 
              onClick={() => setDrawerOpen(true)} 
              sx={{ 
                color: theme.palette.primary.main,
                minWidth: 44,
                minHeight: 44,
                p: 1,
                borderRadius: '50%',
                background: alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.15),
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Enhanced Mobile Drawer */}
        <Drawer 
          anchor="left" 
          open={drawerOpen} 
          onClose={() => setDrawerOpen(false)}
          sx={{
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
          <Box 
            sx={{ 
              width: '100%', 
              p: { xs: 2, sm: 3 }, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="primary" fontWeight={700}>
                Menu
              </Typography>
              <IconButton 
                onClick={() => setDrawerOpen(false)}
                sx={{
                  minWidth: 44,
                  minHeight: 44,
                  borderRadius: '50%',
                  background: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.15),
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* Wishlist Link */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * 0, type: 'spring', stiffness: 300, damping: 24 }}
              >
                <Button
                  component={NavLink}
                  to="/wishlist"
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    color: location.pathname === '/wishlist' ? theme.palette.primary.main : theme.palette.text.secondary,
                    fontWeight: 600,
                    fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                    fontSize: { xs: 16, sm: 18 },
                    justifyContent: 'flex-start',
                    width: '100%',
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    minHeight: 48,
                    px: 2,
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <FavoriteIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                  Wishlist ({wishlistCount})
                </Button>
              </motion.div>
              
              {/* Cart Link */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * 1, type: 'spring', stiffness: 300, damping: 24 }}
              >
                <Button
                  component={NavLink}
                  to="/cart"
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    color: location.pathname === '/cart' ? theme.palette.primary.main : theme.palette.text.secondary,
                    fontWeight: 600,
                    fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                    fontSize: { xs: 16, sm: 18 },
                    justifyContent: 'flex-start',
                    width: '100%',
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    minHeight: 48,
                    px: 2,
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                  Cart ({cartCount})
                </Button>
              </motion.div>
              
              {navLinks.map((link, idx) => {
                const hasDropdown = !!link.dropdown;
                const isDropdownOpen = mobileDropdownOpen[link.label];
                return (
                  <motion.div
                    key={link.label}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * (idx + 1), type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <Box>
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
                          fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                          fontSize: { xs: 16, sm: 18 },
                          justifyContent: 'flex-start',
                          width: '100%',
                          textTransform: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          minHeight: 48,
                          px: 2,
                          py: 1.5,
                          borderRadius: 1,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          },
                        }}
                      >
                        {/* Icons for main nav items */}
                        {link.label === 'Engineering Solutions' && (
                          <FactoryIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                        )}
                        {link.label === 'Nursery' && (
                          <SpaIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                        )}
                        {link.label === 'Farm store' && (
                          <LocalGroceryStoreIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                        )}
                        
                        <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                          {link.label}
                        </Typography>
                        
                        {hasDropdown && (
                          <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Typography sx={{ color: theme.palette.primary.main }}>▼</Typography>
                          </motion.div>
                        )}
                      </Button>
                      
                      {/* Mobile Dropdown */}
                      {hasDropdown && (
                        <Collapse in={isDropdownOpen}>
                          <Box sx={{ pl: 3, pt: 1 }}>
                            {link.dropdown.map((item, itemIdx) => {
                              const IconComponent = (item as any).icon;
                              return (
                                <motion.div
                                  key={item.to}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: itemIdx * 0.05 }}
                                >
                                  <Button
                                    component={NavLink}
                                    to={item.to}
                                    onClick={() => setDrawerOpen(false)}
                                    sx={{
                                      color: theme.palette.text.secondary,
                                      fontWeight: 500,
                                      fontSize: { xs: 14, sm: 16 },
                                      justifyContent: 'flex-start',
                                      width: '100%',
                                      textTransform: 'none',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 1.5,
                                      minHeight: 44,
                                      px: 2,
                                      py: 1,
                                      borderRadius: 1,
                                      '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                        transform: 'translateX(4px)',
                                      },
                                      transition: 'all 0.2s ease-in-out',
                                    }}
                                  >
                                    {IconComponent && (
                                      <IconComponent
                                        sx={{
                                          color: theme.palette.primary.main,
                                          fontSize: 18,
                                          flexShrink: 0
                                        }}
                                      />
                                    )}
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'left',
                                      }}
                                    >
                                      {item.label}
                                    </Typography>
                                  </Button>
                                </motion.div>
                              );
                            })}
                          </Box>
                        </Collapse>
                      )}
                    </Box>
                  </motion.div>
                );
              })}
            </Box>
            
            {/* Admin-specific mobile menu items */}
            {isAdmin && (
              <>
                <Divider sx={{ my: 2, mx: 2 }} />
                <Typography
                  variant="subtitle2"
                  sx={{
                    px: 2,
                    py: 1,
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Admin Actions
                </Typography>
                
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * (navLinks.length + 1), type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <Button
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/admin/products/new');
                    }}
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                      fontSize: { xs: 16, sm: 18 },
                      justifyContent: 'flex-start',
                      width: '100%',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      minHeight: 48,
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <AddIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                    <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                      Create Product
                    </Typography>
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * (navLinks.length + 2), type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <Button
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/admin/categories/new');
                    }}
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                      fontSize: { xs: 16, sm: 18 },
                      justifyContent: 'flex-start',
                      width: '100%',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      minHeight: 48,
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <CategoryIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                    <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                      Create Category
                    </Typography>
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * (navLinks.length + 3), type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <Button
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/admin/products');
                    }}
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                      fontSize: { xs: 16, sm: 18 },
                      justifyContent: 'flex-start',
                      width: '100%',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      minHeight: 48,
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <ListAltIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                    <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                      Manage Products
                    </Typography>
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * (navLinks.length + 4), type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <Button
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/admin/categories');
                    }}
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                      fontSize: { xs: 16, sm: 18 },
                      justifyContent: 'flex-start',
                      width: '100%',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      minHeight: 48,
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <ListAltIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                    <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                      Manage Categories
                    </Typography>
                  </Button>
                </motion.div>
              </>
            )}
            
            {/* User Profile and Logout Options */}
            {isAuthenticated && (
              <>
                <Divider sx={{ my: 2, mx: 2 }} />
                <Typography
                  variant="subtitle2"
                  sx={{
                    px: 2,
                    py: 1,
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Account
                </Typography>
                
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * (navLinks.length + (isAdmin ? 5 : 1)), type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <Button
                    onClick={() => {
                      setDrawerOpen(false);
                      navigate('/profile');
                    }}
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                      fontSize: { xs: 16, sm: 18 },
                      justifyContent: 'flex-start',
                      width: '100%',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      minHeight: 48,
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                    <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                      Profile
                    </Typography>
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * (navLinks.length + (isAdmin ? 6 : 2)), type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <Button
                    onClick={async () => {
                      setDrawerOpen(false);
                      await handleLogout();
                    }}
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      fontFamily: `'Inter', 'Lato', 'Manrope', sans-serif`,
                      fontSize: { xs: 16, sm: 18 },
                      justifyContent: 'flex-start',
                      width: '100%',
                      textTransform: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      minHeight: 48,
                      px: 2,
                      py: 1.5,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <LogoutIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                    <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                      Logout
                    </Typography>
                  </Button>
                </motion.div>
              </>
            )}
          </Box>
        </Drawer>

        {/* Mobile Search Dialog */}
        <Dialog
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          fullScreen
          sx={{
            '& .MuiDialog-paper': {
              background: theme.palette.background.default,
            },
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={() => setSearchOpen(false)}
              sx={{
                minWidth: 44,
                minHeight: 44,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box 
              component="form" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchQuery);
              }}
              sx={{ flex: 1 }}
            >
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
          sx={{
            '& .MuiPaper-root': {
              minWidth: 200,
              borderRadius: 2,
              mt: 1,
            },
          }}
        >
          {/* Regular user menu items */}
          <MenuItem 
            onClick={handleProfileClick}
            sx={{ 
              minHeight: 48,
              gap: 1.5,
            }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          
          {/* Admin-specific menu items */}
          {isAdmin && (
            <>
              <Divider sx={{ my: 1 }} />
              <MenuItem 
                onClick={handleCreateProduct}
                sx={{ 
                  minHeight: 48,
                  gap: 1.5,
                }}
              >
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Create Product</ListItemText>
              </MenuItem>
              <MenuItem 
                onClick={handleCreateCategory}
                sx={{ 
                  minHeight: 48,
                  gap: 1.5,
                }}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Create Category</ListItemText>
              </MenuItem>
              <MenuItem 
                onClick={handleManageProducts}
                sx={{ 
                  minHeight: 48,
                  gap: 1.5,
                }}
              >
                <ListItemIcon>
                  <ListAltIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Manage Products</ListItemText>
              </MenuItem>
              <MenuItem 
                onClick={handleManageCategories}
                sx={{ 
                  minHeight: 48,
                  gap: 1.5,
                }}
              >
                <ListItemIcon>
                  <ListAltIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Manage Categories</ListItemText>
              </MenuItem>
              <Divider sx={{ my: 1 }} />
            </>
          )}
          
          <MenuItem 
            onClick={handleLogout}
            sx={{ 
              minHeight: 48,
              gap: 1.5,
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Error Snackbar */}
        {/* This block is removed as per the edit hint */}
      </AppBar>
    </Box>
  );
};

export default Header; 