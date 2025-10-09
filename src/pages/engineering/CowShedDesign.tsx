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

const CowShedDesign: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/engineering');
  };

  const designFeatures = [
    {
      feature: 'Automated Cleaning System',
      description: 'High-pressure washer integration for efficient cleaning',
      benefits: [
        'Reduces manual labor',
        'Improves animal hygiene',
        'Efficient waste collection',
        'Integrated with digester system',
        'Cost-effective maintenance'
      ]
    },
    {
      feature: 'Waste Collection Automation',
      description: 'Automated waste collection and transfer system',
      benefits: [
        'Direct feed to mixing chamber',
        'Eliminates manual handling',
        'Hygiene maintenance',
        'Continuous operation',
        'Labor-free waste management'
      ]
    },
    {
      feature: 'Ventilation Control',
      description: 'Automated ventilation system for optimal air quality',
      benefits: [
        'Optimal air circulation',
        'Temperature control',
        'Humidity management',
        'Animal comfort',
        'Health improvement'
      ]
    },
    {
      feature: 'Feed Management System',
      description: 'Automated feeding system with precise control',
      benefits: [
        'Precise feeding control',
        'Reduces feed wastage',
        'Automated operation',
        'Health monitoring',
        'Efficient resource utilization'
      ]
    }
  ];

  const technicalSpecifications = [
    { parameter: 'Capacity', value: '10-50 cattle', unit: 'Animals' },
    { parameter: 'Automation Level', value: 'Fully automated cleaning', unit: 'Automation' },
    { parameter: 'Construction Material', value: 'Stainless steel fixtures', unit: 'Material' },
    { parameter: 'Maintenance', value: 'Daily automated cleaning', unit: 'Frequency' },
    { parameter: 'Integration', value: 'Direct digester connection', unit: 'System' },
    { parameter: 'Power Requirement', value: '2-5 HP', unit: 'HP' },
    { parameter: 'Installation Area', value: '200-500 sq ft', unit: 'Square feet' },
    { parameter: 'Warranty', value: '3 years', unit: 'Years' },
    { parameter: 'Life Expectancy', value: '20-25 years', unit: 'Years' },
    { parameter: 'ROI Period', value: '2-3 years', unit: 'Years' }
  ];

  const benefits = [
    {
      category: 'Animal Health Benefits',
      items: [
        'Improved animal hygiene',
        'Better health conditions',
        'Reduced disease incidence',
        'Optimal living conditions',
        'Stress reduction',
        'Better milk production',
        'Improved animal welfare',
        'Health monitoring systems'
      ]
    },
    {
      category: 'Economic Benefits',
      items: [
        'Reduces manual labor',
        'Lower maintenance costs',
        'Efficient resource utilization',
        'Higher productivity',
        'Cost-effective operation',
        'Long-term savings',
        'Reduced veterinary costs',
        'Better milk quality'
      ]
    },
    {
      category: 'Environmental Benefits',
      items: [
        'Efficient waste management',
        'Reduces environmental pollution',
        'Integrated with digester system',
        'Sustainable operation',
        'Waste-to-energy conversion',
        'Reduces carbon footprint',
        'Ecosystem-friendly design',
        'Resource conservation'
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
            Cow Shed Design & Automation
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Modern automated cow shed design with integrated waste management system 
            that combines animal welfare with efficient resource utilization.
          </Typography>
        </Box>

        {/* Overview Section */}
        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Modern Cow Shed Design
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Our automated cow shed design integrates modern engineering with animal welfare principles 
            to create an efficient, hygienic, and sustainable environment for cattle. The system 
            includes automated cleaning, waste collection, and feeding systems.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            The design is fully integrated with our bio-digester system, creating a complete 
            waste management solution that benefits both animals and the environment.
          </Typography>
        </Paper>

        {/* Design Features */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Design Features
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {designFeatures.map((feature, index) => (
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
                Integrated Waste Management
              </Typography>
              <Typography variant="body1" paragraph>
                The cow shed design is fully integrated with our bio-digester system, 
                creating a seamless waste-to-energy solution that maximizes resource utilization.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Animal Welfare Focus
              </Typography>
              <Typography variant="body1" paragraph>
                Our design prioritizes animal welfare with automated systems that ensure 
                optimal living conditions, hygiene, and health for the cattle.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

      </Container>
    </motion.div>
  );
};

export default CowShedDesign;
