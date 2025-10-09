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

const BioFertilizerProduction: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/engineering');
  };

  const productionStages = [
    {
      stage: 'Raw Material Processing',
      description: 'Processing and preparation of organic raw materials',
      features: [
        'Organic waste collection',
        'Material preparation',
        'Quality control',
        'Batch processing',
        'Standardized inputs'
      ]
    },
    {
      stage: 'Fermentation Chambers',
      description: 'Controlled fermentation process for bio-fertilizer production',
      features: [
        'Temperature control',
        'pH monitoring',
        'Microbial activity',
        'Quality assurance',
        'Batch tracking'
      ]
    },
    {
      stage: 'Quality Testing Lab',
      description: 'Comprehensive quality testing and analysis',
      features: [
        'Nutrient analysis',
        'Microbial testing',
        'Quality standards',
        'Certification compliance',
        'Batch documentation'
      ]
    },
    {
      stage: 'Packaging Automation',
      description: 'Automated packaging and labeling system',
      features: [
        'Automated packaging',
        'Quality labeling',
        'Batch tracking',
        'Storage optimization',
        'Distribution ready'
      ]
    }
  ];

  const technicalSpecifications = [
    { parameter: 'Production Capacity', value: '500-2000 kg/day', unit: 'kg/day' },
    { parameter: 'Quality Control', value: 'Lab-tested products', unit: 'Standard' },
    { parameter: 'Packaging', value: 'Automated packaging', unit: 'System' },
    { parameter: 'Storage', value: 'Climate-controlled storage', unit: 'Facility' },
    { parameter: 'Maintenance', value: 'Weekly quality checks', unit: 'Frequency' },
    { parameter: 'Power Requirement', value: '5-10 HP', unit: 'HP' },
    { parameter: 'Installation Area', value: '500-1000 sq ft', unit: 'Square feet' },
    { parameter: 'Warranty', value: '3 years', unit: 'Years' },
    { parameter: 'Life Expectancy', value: '15-20 years', unit: 'Years' },
    { parameter: 'ROI Period', value: '2-3 years', unit: 'Years' }
  ];

  const benefits = [
    {
      category: 'Production Benefits',
      items: [
        'Standardized production',
        'Quality assurance',
        'Bulk production capacity',
        'Consistent quality',
        'Efficient processing',
        'Automated operation',
        'Batch tracking',
        'Quality documentation'
      ]
    },
    {
      category: 'Commercial Benefits',
      items: [
        'Commercial viability',
        'Market-ready products',
        'Certification compliance',
        'Brand development',
        'Revenue generation',
        'Market expansion',
        'Customer satisfaction',
        'Competitive advantage'
      ]
    },
    {
      category: 'Environmental Benefits',
      items: [
        'Organic waste utilization',
        'Sustainable production',
        'Reduces chemical dependency',
        'Ecosystem-friendly',
        'Carbon footprint reduction',
        'Resource conservation',
        'Environmental compliance',
        'Sustainable agriculture'
      ]
    }
  ];

  const qualityStandards = [
    {
      standard: 'Nutrient Content',
      requirement: 'NPK ratio optimization',
      testing: 'Laboratory analysis',
      compliance: 'Fertilizer Control Order'
    },
    {
      standard: 'Microbial Content',
      requirement: 'Beneficial microorganism count',
      testing: 'Microbial analysis',
      compliance: 'Bio-fertilizer standards'
    },
    {
      standard: 'pH Level',
      requirement: 'Optimal pH range',
      testing: 'pH measurement',
      compliance: 'Soil compatibility'
    },
    {
      standard: 'Moisture Content',
      requirement: 'Optimal moisture level',
      testing: 'Moisture analysis',
      compliance: 'Storage stability'
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
            Bio Fertilizer Production Unit
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Complete bio-fertilizer production facility with quality control, 
            automated packaging, and certification compliance for commercial production.
          </Typography>
        </Box>

        {/* Overview Section */}
        <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Commercial Bio-Fertilizer Production
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            Our bio-fertilizer production unit is designed for commercial-scale production of 
            high-quality organic fertilizers. The facility includes fermentation chambers, 
            quality testing laboratory, and automated packaging systems.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            The unit ensures consistent quality, certification compliance, and market-ready 
            products that meet international standards for organic farming.
          </Typography>
        </Paper>

        {/* Production Stages */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Production Stages
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {productionStages.map((stage, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={stage.stage}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%', p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {stage.stage}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {stage.description}
                    </Typography>
                    <List dense>
                      {stage.features.map((feature, idx) => (
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

        {/* Quality Standards */}
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
          Quality Standards
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Standard</strong></TableCell>
                <TableCell><strong>Requirement</strong></TableCell>
                <TableCell><strong>Testing</strong></TableCell>
                <TableCell><strong>Compliance</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qualityStandards.map((standard, index) => (
                <TableRow key={index}>
                  <TableCell>{standard.standard}</TableCell>
                  <TableCell>{standard.requirement}</TableCell>
                  <TableCell>{standard.testing}</TableCell>
                  <TableCell>{standard.compliance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
                Quality Assurance
              </Typography>
              <Typography variant="body1" paragraph>
                Our production unit includes comprehensive quality testing and certification 
                compliance, ensuring that every batch meets international standards for organic farming.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Commercial Viability
              </Typography>
              <Typography variant="body1" paragraph>
                The unit is designed for commercial-scale production with automated systems 
                that ensure consistent quality and market-ready products for sustainable agriculture.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

      </Container>
    </motion.div>
  );
};

export default BioFertilizerProduction;
