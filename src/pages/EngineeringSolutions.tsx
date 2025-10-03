import {
  Agriculture,
  ArrowForward,
  Biotech,
  CheckCircle,
  Close,
  Engineering,
  Nature,
  Science,
  Star,
  WaterDrop
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      id={`engineering-tabpanel-${index}`}
      aria-labelledby={`engineering-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>
      )}
    </div>
  );
}

const EngineeringSolutions: React.FC = () => {
  const [value] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSolution(null);
  };

  const handleNavigateToDetail = (path: string) => {
    navigate(path);
  };

  // Engineering Solutions Data
  const solutions = [
    {
      id: 'jeevamirthom',
      title: 'Jeevamirthom Unit',
      description: 'Automated preparation and filtration system for organic liquid manure',
      icon: <Nature sx={{ fontSize: 40, color: '#2e7d32' }} />,
      image: '/assets/jeevamirthom-unit.webp',
      features: [
        'Automated filtration system',
        '5-8 day fermentation process',
        'Sediment-free output',
        'Micro irrigation compatible',
        'Labor cost reduction',
        'Consistent application'
      ],
      benefits: [
        'Reduces labor dependency by 80%',
        'Eliminates manual filtration challenges',
        'Enables drip irrigation application',
        'Improves soil health and yield quality',
        'Reduces chemical fertilizer dependency',
        'Creates ecosystem for earthworm growth'
      ],
      technicalSpecs: {
        capacity: '500-2000 liters per cycle',
        filtration: 'Multi-stage filtration system',
        materials: 'Food-grade stainless steel',
        automation: 'PLC controlled system',
        maintenance: 'Minimal maintenance required'
      },
      path: '/engineering/jeevamirthom'
    },
    {
      id: 'bio-digester',
      title: 'Bio Digester System',
      description: 'Complete biodigester-based slurry filtration system with biogas production',
      icon: <Biotech sx={{ fontSize: 40, color: '#1976d2' }} />,
      image: '/assets/bio-digester.webp',
      features: [
        'Cement tank digester design',
        'Agitator system for mixing',
        'Solid-liquid separator',
        'Biogas production unit',
        'Automated slurry pump',
        'Continuous process system'
      ],
      benefits: [
        'Eliminates composting processes',
        'Produces biogas for domestic use',
        'Liquid manure reaches roots easily',
        'Best tool for zero tillage',
        'Continuous feeding without digging',
        'Handles household wastewater'
      ],
      technicalSpecs: {
        capacity: '1000-5000 liters',
        biogas: '2-5 cubic meters per day',
        materials: 'Reinforced cement construction',
        automation: 'Semi-automated system',
        maintenance: 'Monthly cleaning required'
      },
      path: '/engineering/bio-digestric'
    },
    {
      id: 'bio-gas',
      title: 'Bio Gas Unit',
      description: 'Integrated biogas production system for domestic and farm use',
      icon: <Science sx={{ fontSize: 40, color: '#f57c00' }} />,
      image: '/assets/bio-gas-unit.webp',
      features: [
        'Methane gas production',
        'Pressure regulation system',
        'Gas storage facility',
        'Safety valves and controls',
        'Domestic cooking application',
        'Farm equipment power'
      ],
      benefits: [
        'Clean cooking fuel',
        'Reduces LPG dependency',
        'Environmentally friendly',
        'Cost-effective energy source',
        'Waste-to-energy conversion',
        'Reduces carbon footprint'
      ],
      technicalSpecs: {
        gasProduction: '2-5 m³/day',
        pressure: '0.5-1.0 bar',
        storage: 'Flexible gas holder',
        safety: 'Multiple safety systems',
        maintenance: 'Weekly inspection'
      },
      path: '/engineering/bio-gas'
    },
    {
      id: 'cow-shed',
      title: 'Cow Shed Design & Automation',
      description: 'Modern automated cow shed with integrated waste management',
      icon: <Agriculture sx={{ fontSize: 40, color: '#8bc34a' }} />,
      image: '/assets/cow-shed.webp',
      features: [
        'Automated cleaning system',
        'High-pressure washer integration',
        'Waste collection automation',
        'Ventilation control',
        'Feed management system',
        'Health monitoring setup'
      ],
      benefits: [
        'Reduces manual labor',
        'Improves animal hygiene',
        'Efficient waste collection',
        'Better animal health',
        'Integrated with digester system',
        'Cost-effective maintenance'
      ],
      technicalSpecs: {
        capacity: '10-50 cattle',
        automation: 'Fully automated cleaning',
        materials: 'Stainless steel fixtures',
        maintenance: 'Daily automated cleaning',
        integration: 'Direct digester connection'
      },
      path: '/engineering/cow-shed'
    },
    {
      id: 'drip-automation',
      title: 'Drip Automation System',
      description: 'Automated drip irrigation system for organic slurry application',
      icon: <WaterDrop sx={{ fontSize: 40, color: '#2196f3' }} />,
      image: '/assets/drip-automation.webp',
      features: [
        'Automated valve control',
        'Pressure regulation',
        'Flow monitoring system',
        'Timer-based application',
        'Zone-wise control',
        'Mobile app integration'
      ],
      benefits: [
        'Precise application control',
        'Even distribution to plants',
        'Reduces water wastage',
        'Saves labor costs',
        'Consistent nutrient delivery',
        'Remote monitoring capability'
      ],
      technicalSpecs: {
        coverage: '1-10 acres',
        pressure: '1-3 bar operating pressure',
        automation: 'Smart controller system',
        monitoring: 'Real-time flow monitoring',
        maintenance: 'Monthly system check'
      },
      path: '/engineering/drip-automation'
    },
    {
      id: 'bio-fertilizer',
      title: 'Bio Fertilizer Production Unit',
      description: 'Complete bio-fertilizer production facility with quality control',
      icon: <Engineering sx={{ fontSize: 40, color: '#9c27b0' }} />,
      image: '/assets/bio-fertilizer.webp',
      features: [
        'Fermentation chambers',
        'Quality testing lab',
        'Packaging automation',
        'Storage facilities',
        'Quality control systems',
        'Batch processing capability'
      ],
      benefits: [
        'Standardized production',
        'Quality assurance',
        'Bulk production capacity',
        'Commercial viability',
        'Certification compliance',
        'Market-ready products'
      ],
      technicalSpecs: {
        capacity: '500-2000 kg/day',
        quality: 'Lab-tested products',
        packaging: 'Automated packaging',
        storage: 'Climate-controlled storage',
        maintenance: 'Weekly quality checks'
      },
      path: '/engineering/bio-fertilizer'
    }
  ];

  const OverviewContent = () => (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Engineering Solutions Overview
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
          Our engineering solutions combine traditional organic farming wisdom with modern technology 
          to create sustainable, efficient, and cost-effective systems for natural farming practices.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {solutions.map((solution, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={solution.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                  onClick={() => handleNavigateToDetail(solution.path)}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      {solution.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                      {solution.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {solution.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<ArrowForward />}
                      sx={{ mt: 'auto' }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)' }}>
          <Typography variant="h5" gutterBottom color="primary">
            Why Our Engineering Solutions?
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Reduces labor dependency by 80%" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Eliminates manual filtration challenges" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Enables drip irrigation application" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Improves soil health and yield quality" />
                </ListItem>
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Reduces chemical fertilizer dependency" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Creates ecosystem for earthworm growth" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Best tool for zero tillage farming" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Continuous feeding without digging" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
          <Typography variant="h5" gutterBottom color="primary">
            Innovation Highlights
          </Typography>
          <Typography variant="body1" paragraph>
            Our bio-digester based slurry filtration system represents a breakthrough in organic farming technology. 
            This innovative approach simplifies the process of Amurthakaraisal preparation and application, making 
            it accessible to farmers who previously found it too labor-intensive.
          </Typography>
          <Typography variant="body1" paragraph>
            The system combines traditional organic farming wisdom with modern engineering principles to create 
            sustainable solutions that benefit both farmers and the environment.
          </Typography>
        </Paper>
      </motion.div>
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
            Engineering Solutions
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Modern technology meets traditional organic farming wisdom to create 
            sustainable and efficient agricultural solutions.
          </Typography>
        </Box>

        <TabPanel value={value} index={0}>
          <OverviewContent />
        </TabPanel>
      </Container>

      {/* Solution Detail Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" color="primary">
              {selectedSolution?.title}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedSolution && (
            <Box>
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                {selectedSolution.description}
              </Typography>
              
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Key Features
                  </Typography>
                  <List dense>
                    {selectedSolution.features.map((feature: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="primary" sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    Benefits
                  </Typography>
                  <List dense>
                    {selectedSolution.benefits.map((benefit: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Star color="primary" sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom color="primary">
                Technical Specifications
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(selectedSolution.technicalSpecs).map(([key, value]) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={key}>
                    <Paper sx={{ p: 2, background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)' }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </Typography>
                      <Typography variant="body2">
                        {value as string}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Close
          </Button>
          <Button 
            onClick={() => {
              handleCloseDialog();
              handleNavigateToDetail(selectedSolution?.path);
            }}
            variant="contained"
            endIcon={<ArrowForward />}
          >
            View Details
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default EngineeringSolutions;
