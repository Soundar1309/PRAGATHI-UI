import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
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
} from '@mui/material';
import {
  LocalFlorist,
  BugReport,
  Verified,
  CheckCircle,
  Star,
  WaterDrop,
  WbSunny,
  Spa,
  Agriculture,
  Park,
  Download,
  Visibility,
  Close,
  PictureAsPdf,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

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

// Image hover component with animation
const AnimatedImage = ({ src, alt, sx, ...props }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        boxShadow: isHovered 
          ? '0 8px 32px rgba(67, 176, 71, 0.2)' 
          : '0 4px 16px rgba(67, 176, 71, 0.1)',
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <CardMedia
        component="img"
        image={src}
        alt={alt}
        sx={{
          borderRadius: 2,
          transition: 'all 0.3s ease-in-out',
          ...sx,
        }}
        {...props}
      />
    </motion.div>
  );
};

const NurseryPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    document.title = 'Nursery - Pragathi Natural Farm';
    
    // Handle URL hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      switch (hash) {
        case '#coconut':
          setValue(0);
          break;
        case '#medicinal':
          setValue(1);
          break;
        case '#vermi':
          setValue(2);
          break;
        case '#licence':
          setValue(3);
          break;
        default:
          setValue(0);
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    
    // Update URL hash
    const hashMap = ['#coconut', '#medicinal', '#vermi', '#licence'];
    window.history.replaceState(null, '', `/nursery${hashMap[newValue]}`);
  };

  // Coconut Tree content
  const CoconutTreeContent = () => (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
        <Box sx={{ flex: 1 }}>
          <AnimatedImage
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Coconut Trees at Pragathi Natural Farm"
            sx={{ height: 400, objectFit: 'cover' }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Premium Coconut Trees
          </Typography>
          <Typography variant="body1" paragraph>
            Our coconut trees are grown using traditional organic farming methods, ensuring 
            the highest quality and nutritional value. Each tree is carefully nurtured to 
            produce the finest coconuts for your family.
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary="100% Organic cultivation methods" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary="Premium quality coconut varieties" />
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
              <ListItemText primary="Rich in nutrients and minerals" />
            </ListItem>
          </List>
          <Box sx={{ mt: 2 }}>
            <Chip icon={<WaterDrop />} label="Regular Watering" color="primary" sx={{ mr: 1, mb: 1 }} />
            <Chip icon={<WbSunny />} label="Full Sun Exposure" color="primary" sx={{ mr: 1, mb: 1 }} />
            <Chip icon={<Park />} label="Organic Certified" color="success" sx={{ mr: 1, mb: 1 }} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );

  // Medical Plants content
  const MedicalPlantsContent = () => (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Medicinal Plants Collection
        </Typography>
        <Typography variant="body1" paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
          Discover our extensive collection of medicinal plants, each carefully selected for their 
          therapeutic properties and grown using natural farming techniques.
        </Typography>
      </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box sx={{ flex: 1 }}>
          <Card sx={{ height: '100%', transition: 'all 0.3s ease-in-out' }}>
            <AnimatedImage
              src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Tulsi (Holy Basil)"
              sx={{ height: 200, objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tulsi (Holy Basil)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Known for its immune-boosting properties and stress relief benefits. 
                Perfect for daily wellness routines.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Card sx={{ height: '100%', transition: 'all 0.3s ease-in-out' }}>
            <AnimatedImage
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Aloe Vera"
              sx={{ height: 200, objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Aloe Vera
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Excellent for skin care and digestive health. 
                Easy to grow and maintain in home gardens.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Card sx={{ height: '100%', transition: 'all 0.3s ease-in-out' }}>
            <AnimatedImage
              src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Neem Tree"
              sx={{ height: 200, objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Neem Tree
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Natural pesticide and medicinal properties. 
                Essential for organic pest control and health benefits.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Box>
  );

  // Vermi Composter content
  const VermiComposterContent = () => (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Vermicomposting System
          </Typography>
          <Typography variant="body1" paragraph>
            Our advanced vermicomposting system efficiently converts organic waste into 
            nutrient-rich compost, promoting sustainable agriculture and soil health.
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <BugReport color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Red Wiggler Worms" 
                secondary="Efficient decomposers for organic waste"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Spa color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="Nutrient-Rich Compost" 
                secondary="High-quality organic fertilizer"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Agriculture color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Sustainable Process" 
                secondary="Zero waste, eco-friendly solution"
              />
            </ListItem>
          </List>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Benefits of Vermicomposting:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip icon={<CheckCircle />} label="Improves Soil Structure" color="success" />
              <Chip icon={<CheckCircle />} label="Reduces Waste" color="success" />
              <Chip icon={<CheckCircle />} label="Natural Fertilizer" color="success" />
              <Chip icon={<CheckCircle />} label="Cost Effective" color="success" />
            </Stack>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <AnimatedImage
            src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Vermicomposting Unit"
            sx={{ height: 400, objectFit: 'cover' }}
          />
        </Box>
      </Stack>
    </Box>
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
              label="Vermi Composter" 
              icon={<BugReport />} 
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
          <CoconutTreeContent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MedicalPlantsContent />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <VermiComposterContent />
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