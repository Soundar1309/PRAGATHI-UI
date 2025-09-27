import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  CircularProgress,
  Alert,
  Fade,
} from '@mui/material';
import {
  LocalFlorist,
  BugReport,
  Verified,
  CheckCircle,
  Star,
  Park,
  Download,
  Visibility,
  Close,
  PictureAsPdf,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetProductsQuery } from '../features/products/api';
import { useAddToCart } from '../hooks/useAddToCart';
import ProductCard, { type Product } from '../components/ProductCard';

// Tab panel component for smooth transitions
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nursery-tabpanel-${index}`}
      aria-labelledby={`nursery-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>
      )}
    </div>
  );
}


const NurseryPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { handleAddToCart } = useAddToCart();

  // Fetch all products and categories
  const { data: allProducts, isLoading: isLoadingAll, isError: isErrorAll } = useGetProductsQuery();

  // Filter products for nursery categories
  const nurseryCategories = ['coconut tree', 'vermi composter', 'medicinal plants'];
  const nurseryProducts = (allProducts || []).filter((product: any) => {
    const categoryName = product.category?.name || product.category || '';
    const categoryString = typeof categoryName === 'string' ? categoryName : String(categoryName);
    return nurseryCategories.some(category => 
      categoryString.toLowerCase().includes(category.toLowerCase())
    );
  });

  // Group products by category
  const vermiProducts = nurseryProducts.filter((product: any) => {
    const categoryName = product.category?.name || product.category || '';
    const categoryString = typeof categoryName === 'string' ? categoryName : String(categoryName);
    return categoryString.toLowerCase().includes('vermi');
  });
  
  const coconutProducts = nurseryProducts.filter((product: any) => {
    const categoryName = product.category?.name || product.category || '';
    const categoryString = typeof categoryName === 'string' ? categoryName : String(categoryName);
    return categoryString.toLowerCase().includes('coconut');
  });
  
  const medicinalProducts = nurseryProducts.filter((product: any) => {
    const categoryName = product.category?.name || product.category || '';
    const categoryString = typeof categoryName === 'string' ? categoryName : String(categoryName);
    return categoryString.toLowerCase().includes('medicinal');
  });

  // Map backend data to ProductCard props
  const mapProduct = (p: any): Product => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    price: p.price,
    original_price: p.original_price,
    offer_price: p.offer_price,
    category: p.category?.name || p.category || '',
    rating: p.rating,
    reviewCount: p.review_count,
    freeDelivery: p.free_delivery,
    has_offer: p.has_offer,
    discount_percentage: p.discount_percentage,
  });

  // Function to handle hash navigation
  const handleHashNavigation = (hash: string) => {
    console.log('Hash detected:', hash); // Debug log
    
    switch (hash) {
      case '#vermi':
        setValue(0);
        console.log('Switching to Vermi Composter tab');
        break;
      case '#coconut':
        setValue(1);
        console.log('Switching to Coconut Tree tab');
        break;
      case '#medicinal':
        setValue(2);
        console.log('Switching to Medical Plants tab');
        break;
      case '#licence':
        setValue(3);
        console.log('Switching to Licence tab');
        break;
      default:
        // Only set to 0 if no hash is present
        if (!hash) {
          setValue(0);
          console.log('No hash, defaulting to first tab');
        }
    }
  };

  // Handle initial hash and location changes
  useEffect(() => {
    document.title = 'Nursery - Pragathi Natural Farm';
    
    // Check initial hash
    const hash = location.hash;
    handleHashNavigation(hash);
  }, [location.hash]);

  // Handle hash changes via window events (for external navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      handleHashNavigation(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setShowAllProducts(false); // Reset show all when switching tabs
    
    // Update URL hash
    const hashMap = ['#vermi', '#coconut', '#medicinal', '#licence'];
    window.history.replaceState(null, '', `/nursery${hashMap[newValue]}`);
  };

  const handleAddToCartClick = async (product: Product) => {
    await handleAddToCart({
      productId: product.id,
      quantity: 1,
      productTitle: product.title,
    });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleToggleProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

  // Product display component
  const ProductDisplay = ({ products, title, description, icon }: { 
    products: any[], 
    title: string, 
    description: string, 
    icon: React.ReactNode 
  }) => {
    const mappedProducts = products.map(mapProduct);
    const displayedProducts = showAllProducts ? mappedProducts : mappedProducts.slice(0, 8);
    const hasMoreProducts = mappedProducts.length > 8;

    if (isLoadingAll) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      );
    }

    if (isErrorAll) {
      return (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load products. Please try again later.
        </Alert>
      );
    }

    return (
      <Box>
        <Box textAlign="center" mb={4}>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            {icon}
            <Typography variant="h4" component="h2" color="primary" sx={{ ml: 2 }}>
              {title}
            </Typography>
          </Box>
          <Typography variant="body1" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
            {description}
          </Typography>
        </Box>

        {mappedProducts.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            No products available in this category yet.
          </Alert>
        ) : (
          <>
            <Grid 
              container 
              spacing={4} 
              sx={{ 
                mt: 4,
                px: { xs: 2, sm: 0 },
                justifyContent: { xs: 'center', sm: 'flex-start' },
                alignItems: 'stretch',
                width: '100%',
                maxWidth: '100%',
                margin: 0,
              }}
            >
              {displayedProducts.map((product, index) => (
                <Grid 
                  key={product.id}
                  size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    width: '100%',
                    maxWidth: '100%',
                    minWidth: 0,
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <Fade in timeout={300 + (index * 100)}>
                    <Box 
                      onClick={() => handleProductClick(product.id)} 
                      sx={{ 
                        cursor: 'pointer', 
                        height: '100%',
                        width: '100%',
                        maxWidth: '100%',
                        minWidth: 0,
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: { xs: 'none', sm: 'scale(1.02)' },
                        },
                      }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={() => handleAddToCartClick(product)}
                      />
                    </Box>
                  </Fade>
                </Grid>
              ))}
            </Grid>

            {hasMoreProducts && (
              <Box textAlign="center" mt={4}>
                <Button
                  variant="outlined"
                  onClick={handleToggleProducts}
                  size="large"
                  sx={{ minWidth: 200 }}
                >
                  {showAllProducts ? 'Show Less' : `Show All ${mappedProducts.length} Products`}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    );
  };

  // Vermi Composter content
  const VermiComposterContent = () => (
    <ProductDisplay
      products={vermiProducts}
      title="Vermi Composter Products"
      description="Discover our range of vermicomposting products and systems for sustainable organic waste management."
      icon={<BugReport sx={{ fontSize: 40, color: 'primary.main' }} />}
    />
  );

  // Coconut Tree content
  const CoconutTreeContent = () => (
    <ProductDisplay
      products={coconutProducts}
      title="Coconut Tree Products"
      description="Explore our premium coconut tree varieties and related products, grown using traditional organic farming methods."
      icon={<Park sx={{ fontSize: 40, color: 'primary.main' }} />}
    />
  );

  // Medical Plants content
  const MedicalPlantsContent = () => (
    <ProductDisplay
      products={medicinalProducts}
      title="Medicinal Plants Collection"
      description="Discover our extensive collection of medicinal plants, each carefully selected for their therapeutic properties and grown using natural farming techniques."
      icon={<LocalFlorist sx={{ fontSize: 40, color: 'primary.main' }} />}
    />
  );


  // Licence content
  const LicenceContent = () => (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Certifications & Licences
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
          Pragathi Natural Farm is fully licensed and certified, ensuring the highest 
          standards of quality and compliance with all regulatory requirements.
        </Typography>
      </Box>

      {/* PDF License Section */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
            <PictureAsPdf color="error" sx={{ mr: 2, fontSize: 40 }} />
            <Typography variant="h5">
              Official Nursery License
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            View or download our official nursery license document to verify our 
            legal authorization and compliance with agricultural regulations.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              startIcon={<Visibility />}
              onClick={() => setPdfDialogOpen(true)}
              sx={{ minWidth: 150 }}
            >
              View License
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              component="a"
              href="/assets/Nursery License.pdf"
              download="Nursery License.pdf"
              sx={{ minWidth: 150 }}
            >
              Download PDF
            </Button>
          </Stack>
        </Paper>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Verified color="success" sx={{ mr: 2, fontSize: 40 }} />
              <Typography variant="h5">
                Organic Certification
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Certified by the Organic Certification Board, ensuring all our products 
              meet strict organic farming standards.
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="No synthetic pesticides or fertilizers" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Sustainable farming practices" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Regular compliance audits" />
              </ListItem>
            </List>
          </Paper>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Star color="warning" sx={{ mr: 2, fontSize: 40 }} />
              <Typography variant="h5">
                Quality Assurance
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Our quality management system ensures consistent product quality and 
              customer satisfaction.
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="ISO 9001:2015 certified" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Regular quality testing" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Traceability system" />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Stack>
      <Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom textAlign="center">
          License Details
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
          <Chip 
            label="Farm License: FL-2024-001" 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            label="Organic Cert: OC-2024-456" 
            color="success" 
            variant="outlined" 
          />
          <Chip 
            label="Export License: EL-2024-789" 
            color="info" 
            variant="outlined" 
          />
          <Chip 
            label="Valid Until: Dec 2025" 
            color="warning" 
            variant="outlined" 
          />
        </Stack>
      </Box>
    </Box>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            Pragathi Natural Farm Nursery
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our diverse collection of plants, sustainable farming practices, 
            and commitment to organic agriculture excellence.
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
                height: 3,
                borderRadius: '2px',
              },
            }}
          >
            <Tab 
              label="Vermi Composter" 
              icon={<BugReport />} 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
            <Tab 
              label="Coconut Tree" 
              icon={<Park />} 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
            <Tab 
              label="Medical Plants" 
              icon={<LocalFlorist />} 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
            <Tab 
              label="Licence" 
              icon={<Verified />} 
              iconPosition="start"
              sx={{ minHeight: 64 }}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <VermiComposterContent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CoconutTreeContent />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MedicalPlantsContent />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <LicenceContent />
        </TabPanel>
      </Container>

      {/* PDF Viewer Dialog */}
      <Dialog
        open={pdfDialogOpen}
        onClose={() => setPdfDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: isMobile ? 0 : 2,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <PictureAsPdf color="error" sx={{ mr: 1 }} />
            <Typography variant="h6">Nursery License Document</Typography>
          </Box>
          <IconButton
            onClick={() => setPdfDialogOpen(false)}
            sx={{ color: 'text.secondary' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: isMobile ? '100%' : '70vh' }}>
          <Box
            component="iframe"
            src="/assets/Nursery License.pdf"
            sx={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 1,
            }}
            title="Nursery License PDF"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            startIcon={<Download />}
            component="a"
            href="/assets/Nursery License.pdf"
            download="Nursery License.pdf"
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            onClick={() => setPdfDialogOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default NurseryPage;