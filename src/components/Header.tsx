import AccountCircle from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
import { alpha, styled } from '@mui/material/styles';
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
import { useWishlist } from '../hooks/useWishlist';
import { useGetCategoriesQuery } from '../features/products/api';

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
  icon?: React.ComponentType<{ sx?: Record<string, unknown> }>;
}


// Function to map category names to appropriate icons
const getCategoryIcon = (categoryName: string): React.ComponentType<{ sx?: Record<string, unknown> }> => {
  const name = categoryName.toLowerCase();
  
  // Food and grocery items
  if (name.includes('rice') || name.includes('grain') || name.includes('cereal')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('spice') || name.includes('masala') || name.includes('salt')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('oil') || name.includes('ghee')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('nut') || name.includes('seed') || name.includes('dry')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('honey') || name.includes('sweet')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('millet') || name.includes('flour') || name.includes('maavu')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('paruppu') || name.includes('dal') || name.includes('lentil')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('payiru') || name.includes('bean')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('rasapodi') || name.includes('powder')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('malt') || name.includes('extract')) {
    return LocalGroceryStoreIcon;
  }
  if (name.includes('flakes') || name.includes('cereal')) {
    return LocalGroceryStoreIcon;
  }
  
  // Prepared foods
  if (name.includes('noodle') || name.includes('pasta')) {
    return LocalDiningIcon;
  }
  if (name.includes('soup') || name.includes('broth')) {
    return LocalDiningIcon;
  }
  
  // Beverages
  if (name.includes('tea') || name.includes('coffee') || name.includes('beverage')) {
    return LocalCafeIcon;
  }
  
  // Health and wellness
  if (name.includes('soap') || name.includes('shampoo') || name.includes('cleanser')) {
    return LocalPharmacyIcon;
  }
  
  // Religious and spiritual items
  if (name.includes('agarbathi') || name.includes('incense') || name.includes('dhoop')) {
    return LocalActivityIcon;
  }
  
  // Default to grocery store icon for general products
  return LocalGroceryStoreIcon;
};

// Static navigation links (non-dynamic)
const staticNavLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
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
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

//-----------------------------------------------------------------------------------------------------------------------------

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
    padding: theme.spacing(1, 1, 1, 0),
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
  
  // Fetch categories from API
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useGetCategoriesQuery();
  
  // Create dynamic navigation links with categories
  const navLinks: NavLink[] = [
    ...staticNavLinks.slice(0, 2), // Home, About
    {
      label: 'Farm Store',
      to: '/products',
      dropdown: categoriesLoading 
        ? [{ label: 'Loading...', to: '/products', icon: LocalGroceryStoreIcon }]
        : categoriesError 
          ? [{ label: 'Error loading categories', to: '/products', icon: LocalGroceryStoreIcon }]
          : categories.length === 0
            ? [{ label: 'No categories available', to: '/products', icon: LocalGroceryStoreIcon }]
            : [
                { label: 'All', to: '/products', icon: LocalGroceryStoreIcon },
                ...categories.map(cat => ({
                  label: cat.name,
                  to: `/products?category=${cat.id}`,
                  icon: getCategoryIcon(cat.name)
                }))
              ]
    },
    ...staticNavLinks.slice(2) // Rest of the static links
  ];

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
    } catch {
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
        maxWidth: '100vw',
        overflow: 'hidden',
        willChange: 'transform',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        isolation: 'isolate',
      }}
    >

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
            gap: { xs: 1, sm: 2 },
            width: '100%',
            maxWidth: '100vw',
            overflow: 'hidden',
            flexWrap: 'nowrap',
          }}
        >
          {/* Logo - Always visible with no wrapping */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexShrink: 0,
            minWidth: 0,
            maxWidth: { xs: '40%', sm: '45%', md: '50%' },
          }}>
            <Button
              component={NavLink}
              to="/"
              sx={{
                p: 0,
                minWidth: 0,
                fontWeight: 700,
                fontSize: { xs: 16, sm: 18, md: 20, lg: 22 },
                color: theme.palette.primary.main,
                textTransform: 'none',
                letterSpacing: 0.5,
                fontFamily: 'Playfair Display, serif',
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 2, md: 2 },
                whiteSpace: 'nowrap',
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
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
                  height: 'clamp(24px, 3.5vw, 36px)',
                  width: 'clamp(24px, 3.5vw, 36px)',
                  borderRadius: 6,
                  background: theme.palette.background.paper,
                  flexShrink: 0,
                }}
              />
              <Box
                component="span"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                Pragathi Natural Farm
              </Box>
              <Box
                component="span"
                sx={{
                  display: { xs: 'inline', sm: 'none' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                Pragathi
              </Box>
            </Button>
          </Box>

          {/* Navigation Links - Large and Medium screens */}
          {(isLargeScreen || isMediumScreen) && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.5, sm: 1, md: 1 },
                flex: 1,
                justifyContent: 'center',
                mx: { xs: 1, sm: 2 },
                minWidth: 0,
                overflow: 'hidden',
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
                      onClick={link.label === 'Farm Store' ? handleFarmStoreClick : undefined}
                      sx={{
                        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                        fontWeight: 600,
                        fontSize: { md: 12, lg: 13 },
                        textTransform: 'none',
                        px: { md: 1, lg: 1.5 },
                        py: 0.5,
                        borderRadius: 1,
                        whiteSpace: 'nowrap',
                        minWidth: 'auto',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
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
                                  const Icon = item.icon;
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
            <Box sx={{ 
              flex: { md: '0 1 120px', lg: '0 1 150px' }, 
              maxWidth: { md: 120, lg: 150 },
              minWidth: 0,
            }}>
              <Box component="form" onSubmit={handleSearchSubmit} sx={{ width: '100%' }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search..."
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
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, sm: 1 }, 
            flexShrink: 0,
            minWidth: 0,
          }}>
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
            overflowX: 'hidden',
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
                py: 2,
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
                py: 2,
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
                py: 2,
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

            {/* Profile Section */}
            <Button
              onClick={() => {
                setDrawerOpen(false);
                // Navigate to profile or show login
                if (isAuthenticated) {
                  navigate('/profile');
                } else {
                  navigate('/login');
                }
              }}
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 600,
                justifyContent: 'flex-start',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 2,
                px: 2,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <AccountCircle sx={{ color: theme.palette.primary.main }} />
              {isAuthenticated ? 'Profile' : 'Login'}
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
                      py: 2,
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
                          const IconComponent = item.icon;
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