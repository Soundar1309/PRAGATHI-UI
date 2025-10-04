import {
  ArrowBack,
  CheckCircle,
  Star
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DripAutomation: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/engineering');
  };

  const systemFeatures = [
    {
      feature: 'Automated Valve Control',
      description: 'Smart valve control system for precise water and nutrient delivery',
      benefits: [
        'Precise flow control',
        'Automated operation',
        'Zone-wise control',
        'Timer-based application',
        'Remote monitoring'
      ]
    },
    {
      feature: 'Pressure Regulation',
      description: 'Automated pressure control for optimal irrigation performance',
      benefits: [
        'Optimal pressure maintenance',
        'Prevents system damage',
        'Consistent flow rates',
        'Energy efficient operation',
        'Automatic adjustment'
      ]
    },
    {
      feature: 'Flow Monitoring',
      description: 'Real-time flow monitoring and control system',
      benefits: [
        'Real-time monitoring',
        'Flow rate control',
        'Leak detection',
        'Performance optimization',
        'Data logging'
      ]
    },
    {
      feature: 'Mobile App Integration',
      description: 'Smartphone app for remote control and monitoring',
      benefits: [
        'Remote control capability',
        'Real-time monitoring',
        'Alert notifications',
        'Easy operation',
        'Data analytics'
      ]
    }
  ];

  const technicalSpecifications = [
    { parameter: 'Coverage Area', value: '1-10 acres', unit: 'Acres' },
    { parameter: 'Operating Pressure', value: '1-3 bar', unit: 'bar' },
    { parameter: 'Automation Level', value: 'Smart controller system', unit: 'Automation' },
    { parameter: 'Monitoring', value: 'Real-time flow monitoring', unit: 'System' },
    { parameter: 'Maintenance', value: 'Monthly system check', unit: 'Frequency' },
    { parameter: 'Power Requirement', value: '1-3 HP', unit: 'HP' },
    { parameter: 'Installation Area', value: '100-200 sq ft', unit: 'Square feet' },
    { parameter: 'Warranty', value: '2 years', unit: 'Years' },
    { parameter: 'Life Expectancy', value: '10-15 years', unit: 'Years' },
    { parameter: 'ROI Period', value: '1-2 years', unit: 'Years' }
  ];

  const benefits = [
    {
      category: 'Agricultural Benefits',
      items: [
        'Precise application control',
        'Even distribution to plants',
        'Reduces water wastage',
        'Consistent nutrient delivery',
        'Optimal plant nutrition',
        'Higher crop yields',
        'Better crop quality',
        'Reduced labor costs'
      ]
    },
    {
      category: 'Economic Benefits',
      items: [
        'Saves labor costs',
        'Reduces water consumption',
        'Efficient resource utilization',
        'Higher productivity',
        'Cost-effective operation',
        'Long-term savings',
        'Reduced fertilizer costs',
        'Better return on investment'
      ]
    },
    {
      category: 'Environmental Benefits',
      items: [
        'Water conservation',
        'Reduces water wastage',
        'Efficient resource utilization',
        'Sustainable farming practices',
        'Reduces environmental impact',
        'Ecosystem-friendly design',
        'Resource conservation',
        'Climate-friendly agriculture'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box mb={4}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBackClick}
            sx={{ mb: 2 }}
            variant="outlined"
          >
            Back to Engineering Solutions
          </Button>
          
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            Drip Automation System
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Smart automated drip irrigation system for precise application of organic 
            slurry and nutrients, ensuring optimal plant nutrition and water conservation.
          </Typography>
        </Box>

        {/* Overview Section */}
        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Smart Drip Irrigation
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Our automated drip irrigation system combines precision agriculture with organic 
            farming practices. The system delivers filtered organic slurry directly to plant 
            roots through a network of drip emitters, ensuring optimal nutrition and water conservation.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            The system is fully integrated with our bio-digester and filtration systems, 
            creating a complete automated organic farming solution.
          </Typography>
        </Paper>

        {/* System Features */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          System Features
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {systemFeatures.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={feature.feature}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {feature.feature}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {feature.description}
                    </Typography>
                    <List dense>
                      {feature.benefits.map((benefit, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle color="primary" sx={{ fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={benefit} 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Benefits */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Benefits
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {benefits.map((benefit, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={benefit.category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {benefit.category}
                    </Typography>
                    <List dense>
                      {benefit.items.map((item, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <Star color="primary" sx={{ fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Technical Specifications */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Technical Specifications
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Parameter</strong></TableCell>
                <TableCell><strong>Value</strong></TableCell>
                <TableCell><strong>Unit</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {technicalSpecifications.map((spec, index) => (
                <TableRow key={index}>
                  <TableCell>{spec.parameter}</TableCell>
                  <TableCell>{spec.value}</TableCell>
                  <TableCell>{spec.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Innovation Highlights */}
        <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Innovation Highlights
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Precision Agriculture
              </Typography>
              <Typography variant="body1" paragraph>
                Our system delivers precise amounts of organic nutrients directly to plant 
                roots, ensuring optimal nutrition while minimizing waste and environmental impact.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Smart Integration
              </Typography>
              <Typography variant="body1" paragraph>
                The system is fully integrated with our bio-digester and filtration systems, 
                creating a complete automated organic farming solution that maximizes efficiency.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

      </Container>
    </motion.div>
  );
};

export default DripAutomation;
