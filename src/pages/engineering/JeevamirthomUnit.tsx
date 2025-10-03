import {
  Agriculture,
  ArrowBack,
  CheckCircle,
  Download,
  Engineering,
  Nature,
  Science,
  Star,
  Visibility,
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

const JeevamirthomUnit: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/engineering');
  };

  const processSteps = [
    {
      step: 1,
      title: 'Raw Material Collection',
      description: 'Collection of cow dung, cow urine (gomutra), gram flour, jaggery, and soil from banyan tree roots',
      icon: <Agriculture color="primary" />,
      details: [
        'Fresh cow dung (10-15 kg)',
        'Cow urine (5-10 liters)',
        'Gram flour (1-2 kg)',
        'Jaggery (500g-1kg)',
        'Banyan tree soil (handful)'
      ]
    },
    {
      step: 2,
      title: 'Mixing & Agitation',
      description: 'Automated mixing system ensures proper blending of all ingredients',
      icon: <Engineering color="primary" />,
      details: [
        'Controlled mixing speed',
        'Uniform distribution',
        'Temperature monitoring',
        'pH level checking',
        'Consistent consistency'
      ]
    },
    {
      step: 3,
      title: 'Fermentation Process',
      description: '5-8 day controlled fermentation in specialized chambers',
      icon: <Science color="primary" />,
      details: [
        'Temperature: 25-30°C',
        'Duration: 5-8 days',
        'Anaerobic conditions',
        'Microbial activity monitoring',
        'Quality control checks'
      ]
    },
    {
      step: 4,
      title: 'Filtration System',
      description: 'Multi-stage filtration removes sediments and particles',
      icon: <WaterDrop color="primary" />,
      details: [
        'Primary filtration (coarse)',
        'Secondary filtration (fine)',
        'Tertiary filtration (ultra-fine)',
        'Sediment collection system',
        'Quality assurance testing'
      ]
    },
    {
      step: 5,
      title: 'Storage & Distribution',
      description: 'Filtered liquid stored in clean tanks for irrigation application',
      icon: <Nature color="primary" />,
      details: [
        'Clean storage tanks',
        'Distribution system',
        'Drip irrigation compatibility',
        'Quality monitoring',
        'Ready for application'
      ]
    }
  ];

  const benefits = [
    {
      category: 'Agricultural Benefits',
      items: [
        'Enriches soil with friendly bacteria',
        'Speeds up mineralization process',
        'Releases nutrients from soil',
        'Acts as culture for humus formation',
        'Retains moisture and absorbs air moisture',
        'Reduces water requirement',
        'Creates ecosystem for earthworm growth',
        'Increases soil porosity'
      ]
    },
    {
      category: 'Economic Benefits',
      items: [
        'Reduces chemical fertilizer dependency',
        'Saves on chemical pesticide costs',
        'Reduces labor costs by 80%',
        'Eliminates manual filtration challenges',
        'Consistent application quality',
        'Higher crop yields',
        'Better crop quality',
        'Long-term soil health improvement'
      ]
    },
    {
      category: 'Environmental Benefits',
      items: [
        'Reduces chemical pollution',
        'Promotes organic farming',
        'Improves soil biodiversity',
        'Reduces carbon footprint',
        'Sustainable farming practices',
        'Water conservation',
        'Ecosystem restoration',
        'Climate-friendly agriculture'
      ]
    }
  ];

  const technicalSpecifications = [
    { parameter: 'Capacity', value: '500-2000 liters per cycle', unit: 'Liters' },
    { parameter: 'Fermentation Time', value: '5-8 days', unit: 'Days' },
    { parameter: 'Filtration Stages', value: '3-stage filtration', unit: 'Stages' },
    { parameter: 'Operating Temperature', value: '25-30°C', unit: 'Celsius' },
    { parameter: 'Power Requirement', value: '2-5 HP', unit: 'HP' },
    { parameter: 'Material', value: 'Food-grade stainless steel', unit: 'Material' },
    { parameter: 'Automation Level', value: 'PLC controlled', unit: 'Automation' },
    { parameter: 'Maintenance', value: 'Minimal maintenance', unit: 'Frequency' },
    { parameter: 'Installation Area', value: '50-100 sq ft', unit: 'Square feet' },
    { parameter: 'Warranty', value: '2 years', unit: 'Years' }
  ];

  const challengesSolved = [
    {
      challenge: 'Manual Filtration Problems',
      solution: 'Automated multi-stage filtration system',
      impact: 'Eliminates manual labor and ensures consistent quality'
    },
    {
      challenge: 'Labor Shortage',
      solution: 'Fully automated system with minimal human intervention',
      impact: 'Reduces labor dependency by 80%'
    },
    {
      challenge: 'Inconsistent Application',
      solution: 'Precise dosing system for uniform application',
      impact: 'Ensures every plant receives optimal nutrition'
    },
    {
      challenge: 'Irrigation System Clogging',
      solution: 'Ultra-fine filtration removes all sediments',
      impact: 'Compatible with drip irrigation systems'
    },
    {
      challenge: 'Time Consumption',
      solution: 'Automated process reduces preparation time',
      impact: 'From hours to minutes for filtration process'
    },
    {
      challenge: 'Quality Control',
      solution: 'Built-in quality monitoring and testing',
      impact: 'Consistent high-quality output every time'
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
            Jeevamirthom Unit
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Automated preparation and filtration system for organic liquid manure (Amurthakaraisal) 
            that combines traditional wisdom with modern engineering for sustainable farming.
          </Typography>
        </Box>

        {/* Overview Section */}
        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)' }}>
          <Typography variant="h4" gutterBottom color="primary">
            What is Jeevamirthom?
          </Typography>
          
          {/* Amurthakaraisal Preparation Process */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Amurthakaraisal Preparation Process
            </Typography>
            <Typography variant="body2" paragraph>
              Main ingredients of Amurthakaraisal are cow dung, cow urine (gomutra), gram flour and jaggery. 
              Soil from the roots of a banyan tree is also used to enrich the liquid.
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <img 
                src="/assets/eng-1.png" 
                alt="Amurthakaraisal Preparation Ingredients" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
          </Box>

          {/* Traditional Methods vs Challenges */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Traditional Methods vs Modern Solutions
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <img 
                src="/assets/eng-2.1.jpg" 
                alt="Traditional Methods of Amurthakaraisal Preparation and Application" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
            <Typography variant="body2" paragraph>
              Traditional methods are laborious and time-consuming, with challenges including difficulty finding labor 
              due to foul smell and high costs. Our automated solutions eliminate these problems.
            </Typography>
          </Box>

          {/* Manual Filtration Challenges */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Manual Filtration Challenges
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <img 
                src="/assets/eng-3.jpg" 
                alt="Manual Filtration System Challenges" 
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
            <Typography variant="body2" paragraph>
              Manual filtration systems are inefficient, time-consuming, and often result in clogged irrigation systems. 
              Our automated multi-stage filtration solves these issues completely.
            </Typography>
          </Box>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Jeevamirthom (Amurthakaraisal) is a traditional organic liquid manure prepared by fermenting 
            cow dung, cow urine, gram flour, and jaggery for 5-8 days. This preparation enriches the soil, 
            improves yield quality, reduces chemical dependency, and creates a healthy ecosystem for plant growth.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Our engineering solution automates the entire process, from preparation to filtration, 
            making it practical for modern farming while preserving the traditional benefits.
          </Typography>
        </Paper>

        {/* Process Flow */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Process Flow
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {processSteps.map((step, index) => (
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
                        {step.icon}
                      </Box>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Step {step.step}: {step.title}
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

        {/* Benefits Section */}
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

        {/* Challenges Solved */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Challenges Solved
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {challengesSolved.map((challenge, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="error" gutterBottom>
                      Challenge: {challenge.challenge}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Solution:</strong> {challenge.solution}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      <strong>Impact:</strong> {challenge.impact}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Innovation Highlights */}
        <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Innovation Highlights
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Traditional Wisdom + Modern Technology
              </Typography>
              <Typography variant="body1" paragraph>
                Our system preserves the traditional benefits of Jeevamirthom while making it 
                practical for modern farming through automation and engineering solutions.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Sustainable Agriculture
              </Typography>
              <Typography variant="body1" paragraph>
                The system promotes sustainable farming practices by reducing chemical dependency, 
                improving soil health, and creating a closed-loop ecosystem.
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
            Download Brochure
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Visibility />}
          >
            View Gallery
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
};

export default JeevamirthomUnit;
