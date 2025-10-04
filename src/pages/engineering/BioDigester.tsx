import {
  Agriculture,
  ArrowBack,
  Biotech,
  CheckCircle,
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
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BioDigester: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/engineering');
  };

  const systemComponents = [
    {
      component: 'Cow Shed Integration',
      description: 'High-pressure washer cleaning system integrated with waste collection',
      icon: <Agriculture color="primary" />,
      features: [
        'Automated cleaning system',
        'Waste collection automation',
        'Direct feed to mixing chamber',
        'Hygiene maintenance',
        'Labor reduction'
      ]
    },
    {
      component: 'Mixing Chamber',
      description: 'Controlled mixing of cow dung and urine with water',
      icon: <Engineering color="primary" />,
      features: [
        'Precise ratio mixing',
        'Temperature control',
        'pH monitoring',
        'Automated agitation',
        'Quality consistency'
      ]
    },
    {
      component: 'Agitator System',
      description: 'Mechanical mixing system for uniform slurry preparation',
      icon: <Science color="primary" />,
      features: [
        'Variable speed control',
        'Uniform mixing',
        'Prevents settling',
        'Energy efficient',
        'Low maintenance'
      ]
    },
    {
      component: 'Slurry Pump',
      description: 'Automated pumping system for slurry transfer',
      icon: <WaterDrop color="primary" />,
      features: [
        'High-pressure pumping',
        'Automated operation',
        'Reliable performance',
        'Easy maintenance',
        'Energy efficient'
      ]
    },
    {
      component: 'Solid-Liquid Separator',
      description: 'Mechanical separation of solid and liquid components',
      icon: <Biotech color="primary" />,
      features: [
        'High efficiency separation',
        'Automated operation',
        'Clean liquid output',
        'Solid waste collection',
        'Continuous processing'
      ]
    },
    {
      component: 'Bio Digester Tank',
      description: 'Cement tank for anaerobic digestion process',
      icon: <Nature color="primary" />,
      features: [
        'Reinforced cement construction',
        'Anaerobic conditions',
        'Temperature control',
        'Gas collection system',
        'Long-term durability'
      ]
    }
  ];

  const processFlow = [
    {
      step: 1,
      title: 'Waste Collection',
      description: 'Automated collection from cow shed using high-pressure washer',
      details: [
        'High-pressure cleaning system',
        'Automated waste collection',
        'Direct feed to mixing chamber',
        'Hygiene maintenance',
        'Labor-free operation'
      ]
    },
    {
      step: 2,
      title: 'Mixing Process',
      description: 'Controlled mixing of cow dung, urine, and water',
      details: [
        'Precise ratio control',
        'Temperature monitoring',
        'pH level checking',
        'Automated agitation',
        'Quality consistency'
      ]
    },
    {
      step: 3,
      title: 'Separation',
      description: 'Mechanical separation of solid and liquid components',
      details: [
        'High efficiency separation',
        'Clean liquid output',
        'Solid waste collection',
        'Automated operation',
        'Continuous processing'
      ]
    },
    {
      step: 4,
      title: 'Digestion',
      description: 'Anaerobic digestion in cement tank',
      details: [
        'Anaerobic conditions',
        'Microbial activity',
        'Temperature control',
        'Gas production',
        'Liquid manure formation'
      ]
    },
    {
      step: 5,
      title: 'Filtration',
      description: 'Multi-stage filtration for irrigation compatibility',
      details: [
        'Primary filtration',
        'Secondary filtration',
        'Ultra-fine filtration',
        'Quality testing',
        'Irrigation ready'
      ]
    },
    {
      step: 6,
      title: 'Application',
      description: 'Automated application through drip irrigation',
      details: [
        'Drip irrigation system',
        'Precise application',
        'Even distribution',
        'Labor-free operation',
        'Optimal plant nutrition'
      ]
    }
  ];

  const advantages = [
    {
      category: 'Agricultural Advantages',
      items: [
        'Eliminates composting processes',
        'Liquid manure reaches roots easily',
        'Immediate plant absorption',
        'Effective for short duration crops',
        'Continuous feeding without digging',
        'Increases soil health',
        'Best tool for zero tillage',
        'Sustainable farming practices'
      ]
    },
    {
      category: 'Economic Advantages',
      items: [
        'Reduces labor work and dependency',
        'Effective use of manure',
        'Eliminates composting costs',
        'Reduces fertilizer costs',
        'Higher crop yields',
        'Better crop quality',
        'Long-term soil improvement',
        'Cost-effective operation'
      ]
    },
    {
      category: 'Environmental Advantages',
      items: [
        'Reduces chemical pollution',
        'Promotes organic farming',
        'Improves soil biodiversity',
        'Reduces carbon footprint',
        'Sustainable waste management',
        'Water conservation',
        'Ecosystem restoration',
        'Climate-friendly agriculture'
      ]
    }
  ];

  const technicalSpecifications = [
    { parameter: 'Digester Capacity', value: '1000-5000 liters', unit: 'Liters' },
    { parameter: 'Biogas Production', value: '2-5 cubic meters per day', unit: 'm³/day' },
    { parameter: 'Construction Material', value: 'Reinforced cement', unit: 'Material' },
    { parameter: 'Automation Level', value: 'Semi-automated system', unit: 'Automation' },
    { parameter: 'Maintenance', value: 'Monthly cleaning required', unit: 'Frequency' },
    { parameter: 'Power Requirement', value: '3-7 HP', unit: 'HP' },
    { parameter: 'Operating Temperature', value: '25-35°C', unit: 'Celsius' },
    { parameter: 'Retention Time', value: '15-30 days', unit: 'Days' },
    { parameter: 'Installation Area', value: '100-200 sq ft', unit: 'Square feet' },
    { parameter: 'Warranty', value: '3 years', unit: 'Years' }
  ];

  const systemBenefits = [
    {
      benefit: 'Continuous Process',
      description: 'No need to remove undigested manure - continuous feeding system',
      impact: 'Eliminates manual waste removal and creates sustainable operation'
    },
    {
      benefit: 'Waste Water Integration',
      description: 'Can handle household and cattle shed wastewater',
      impact: 'Saves water and enhances decomposition speed'
    },
    {
      benefit: 'Zero Tillage Support',
      description: 'Liquid application without soil disturbance',
      impact: 'Promotes sustainable farming and soil health'
    },
    {
      benefit: 'Immediate Effectiveness',
      description: 'Liquid manure absorbed immediately by plants',
      impact: 'Perfect for short duration crops like vegetables'
    },
    {
      benefit: 'Soil Health Improvement',
      description: 'Continuous feeding improves soil structure and fertility',
      impact: 'Long-term sustainable agriculture benefits'
    },
    {
      benefit: 'Labor Reduction',
      description: 'Automated system reduces manual labor requirements',
      impact: 'Solves labor shortage problems in farming'
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
            Bio Digester System
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Complete biodigester-based slurry filtration system that combines waste management, 
            biogas production, and organic farming in one integrated solution.
          </Typography>
        </Box>

        {/* Overview Section */}
        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
          <Typography variant="h4" gutterBottom color="primary">
            What is a Bio Digester System?
          </Typography>
          
          {/* Complete System Overview */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Complete Bio-Digester System Overview
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <img 
                src="/assets/eng-4.jpg" 
                alt="Bio-Digester System Components and Flow Diagram" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
            <Typography variant="body2" paragraph>
              Our complete bio-digester system includes agitator, solid-liquid separator, biogas unit, and automated 
              filtration, creating a seamless waste-to-energy solution.
            </Typography>
          </Box>

          {/* System Process Flow */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Complete System Process Flow
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <img 
                src="/assets/eng-5.jpg" 
                alt="Complete System Process Flow" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
            <Typography variant="body2" paragraph>
              From cow shed waste collection to final irrigation application, our system creates a complete 
              automated cycle that maximizes efficiency and minimizes labor.
            </Typography>
          </Box>

          {/* Individual System Components */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <img 
                  src="/assets/eng-6.jpg" 
                  alt="Agitator and Solid-Liquid Separator" 
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Agitator & Solid-Liquid Separator
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <img 
                  src="/assets/eng-7.jpg" 
                  alt="Bio Digester and Biogas Unit" 
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Bio Digester & Biogas Unit
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* System Outputs */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              System Outputs
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <img 
                src="/assets/eng-8.jpg" 
                alt="Solid Collection and Fermented Slurry Output" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
            <Typography variant="body2" paragraph>
              Our system produces both solid compost for vermicomposting and filtered liquid slurry ready for 
              drip irrigation application, maximizing resource utilization.
            </Typography>
          </Box>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Our bio-digester system is a revolutionary approach to organic farming that combines 
            traditional wisdom with modern engineering. It processes cow dung and biowaste in a 
            cement tank along with water and required bacteria to create both biogas and liquid manure.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            This system simplifies, mechanizes, and standardizes the composting process while 
            producing clean energy and high-quality organic fertilizer.
          </Typography>
        </Paper>

        {/* System Components */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          System Components
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {systemComponents.map((component, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={component.component}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', p: 2 }}>
                  <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Box sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: 60, 
                        height: 60, 
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        mb: 2
                      }}>
                        {component.icon}
                      </Box>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {component.component}
                      </Typography>
                    </Box>
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

        {/* Process Flow */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Process Flow
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {processFlow.map((step, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={step.step}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', p: 2 }}>
                  <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Box sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: 60, 
                        height: 60, 
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        mb: 2
                      }}>
                        <Typography variant="h6" fontWeight="bold">
                          {step.step}
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {step.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {step.description}
                    </Typography>
                    <List dense>
                      {step.details.map((detail, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle color="primary" sx={{ fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={detail} 
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

        {/* Advantages */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          System Advantages
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {advantages.map((advantage, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={advantage.category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {advantage.category}
                    </Typography>
                    <List dense>
                      {advantage.items.map((item, idx) => (
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

        {/* System Benefits */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Key System Benefits
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {systemBenefits.map((benefit, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {benefit.benefit}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {benefit.description}
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      <strong>Impact:</strong> {benefit.impact}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

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
                Our system integrates waste collection, processing, and application in one 
                continuous flow, eliminating manual intervention and creating a sustainable cycle.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Dual Output System
              </Typography>
              <Typography variant="body1" paragraph>
                The system produces both biogas for energy needs and liquid manure for farming, 
                maximizing resource utilization and creating multiple revenue streams.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

      </Container>
    </motion.div>
  );
};

export default BioDigester;
