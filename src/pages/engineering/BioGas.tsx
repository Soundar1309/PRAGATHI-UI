import {
  ArrowBack,
  CheckCircle,
  Download,
  Nature,
  Star,
  Visibility
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

const BioGas: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/engineering');
  };

  const systemComponents = [
    {
      component: 'Gas Production Unit',
      description: 'Anaerobic digestion chamber for methane production',
      features: [
        'Methane gas production',
        'Anaerobic conditions',
        'Temperature control',
        'Gas quality monitoring',
        'Continuous operation'
      ]
    },
    {
      component: 'Gas Storage System',
      description: 'Flexible gas holder for safe storage',
      features: [
        'Flexible gas holder',
        'Pressure regulation',
        'Safety valves',
        'Gas quality control',
        'Storage capacity optimization'
      ]
    },
    {
      component: 'Pressure Control',
      description: 'Automated pressure regulation system',
      features: [
        'Pressure monitoring',
        'Automatic regulation',
        'Safety systems',
        'Flow control',
        'Emergency shut-off'
      ]
    },
    {
      component: 'Distribution Network',
      description: 'Gas distribution system for domestic and farm use',
      features: [
        'Domestic cooking application',
        'Farm equipment power',
        'Flexible distribution',
        'Multiple outlets',
        'Easy maintenance'
      ]
    }
  ];

  const applications = [
    {
      application: 'Domestic Cooking',
      description: 'Clean cooking fuel for household use',
      benefits: [
        'Clean burning fuel',
        'No smoke or soot',
        'Reduces LPG dependency',
        'Cost-effective cooking',
        'Environmentally friendly'
      ]
    },
    {
      application: 'Farm Equipment',
      description: 'Power generation for farm machinery',
      benefits: [
        'Renewable energy source',
        'Reduces electricity costs',
        'Reliable power supply',
        'Environmentally sustainable',
        'Cost-effective operation'
      ]
    },
    {
      application: 'Water Heating',
      description: 'Hot water generation for various uses',
      benefits: [
        'Efficient water heating',
        'Reduces energy costs',
        'Clean energy source',
        'Reliable operation',
        'Multiple applications'
      ]
    }
  ];

  const technicalSpecifications = [
    { parameter: 'Gas Production', value: '2-5 m³/day', unit: 'm³/day' },
    { parameter: 'Operating Pressure', value: '0.5-1.0 bar', unit: 'bar' },
    { parameter: 'Storage Capacity', value: 'Flexible gas holder', unit: 'Type' },
    { parameter: 'Safety Systems', value: 'Multiple safety systems', unit: 'Systems' },
    { parameter: 'Maintenance', value: 'Weekly inspection', unit: 'Frequency' },
    { parameter: 'Gas Composition', value: '60-70% Methane', unit: '%' },
    { parameter: 'Operating Temperature', value: '25-35°C', unit: 'Celsius' },
    { parameter: 'Installation Area', value: '50-100 sq ft', unit: 'Square feet' },
    { parameter: 'Warranty', value: '2 years', unit: 'Years' },
    { parameter: 'Life Expectancy', value: '15-20 years', unit: 'Years' }
  ];

  const benefits = [
    {
      category: 'Economic Benefits',
      items: [
        'Reduces LPG dependency',
        'Lower energy costs',
        'Renewable energy source',
        'Cost-effective operation',
        'Long-term savings',
        'Reduces electricity bills',
        'Multiple applications',
        'High return on investment'
      ]
    },
    {
      category: 'Environmental Benefits',
      items: [
        'Clean burning fuel',
        'Reduces carbon footprint',
        'Renewable energy source',
        'No harmful emissions',
        'Environmentally sustainable',
        'Reduces fossil fuel dependency',
        'Climate-friendly solution',
        'Sustainable energy production'
      ]
    },
    {
      category: 'Operational Benefits',
      items: [
        'Reliable energy source',
        'Continuous operation',
        'Easy maintenance',
        'Safe operation',
        'User-friendly system',
        'Long service life',
        'Minimal supervision required',
        'Integrated with digester system'
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
            Bio Gas Unit
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Integrated biogas production system that converts organic waste into clean, 
            renewable energy for domestic and farm applications.
          </Typography>
        </Box>

        {/* Overview Section */}
        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' }}>
          <Typography variant="h4" gutterBottom color="primary">
            What is Bio Gas?
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Biogas is a renewable energy source produced through anaerobic digestion of organic 
            matter. Our system produces clean methane gas that can be used for cooking, heating, 
            and power generation, providing a sustainable alternative to fossil fuels.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            The biogas unit is integrated with our bio-digester system, creating a complete 
            waste-to-energy solution that benefits both the environment and your household.
          </Typography>
        </Paper>

        {/* System Components */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          System Components
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {systemComponents.map((component, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={component.component}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {component.component}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {component.description}
                    </Typography>
                    <List dense>
                      {component.features.map((feature, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle color="primary" sx={{ fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature} 
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

        {/* Applications */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Applications
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {applications.map((app, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={app.application}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {app.application}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {app.description}
                    </Typography>
                    <List dense>
                      {app.benefits.map((benefit, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <Star color="primary" sx={{ fontSize: 16 }} />
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
                            <Nature color="primary" sx={{ fontSize: 16 }} />
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
                Integrated Energy Solution
              </Typography>
              <Typography variant="body1" paragraph>
                Our biogas system is fully integrated with the bio-digester, creating a 
                complete waste-to-energy solution that maximizes resource utilization.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Clean Energy Production
              </Typography>
              <Typography variant="body1" paragraph>
                The system produces clean, renewable energy that reduces dependency on 
                fossil fuels and provides a sustainable energy source for rural communities.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Download />}
            sx={{ mr: 2 }}
          >
            Download Technical Specifications
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Visibility />}
          >
            View System Gallery
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
};

export default BioGas;
