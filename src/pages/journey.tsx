import { Box, Container, Typography, Card, CardContent, Grid, Chip, alpha } from "@mui/material";
import { motion } from "framer-motion";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineContent from "@mui/lab/TimelineContent";
import Timeline from "@mui/lab/Timeline";

const milestones = [
  {
    year: "2010",
    title: "The Vision Takes Root",
    desc: "Pragathi Natural Farm was established in Jakkarpalayam, Pollachi, Coimbatore District, Tamil Nadu, with a vision to create a fully integrated, self-sustainable, and bio-diverse organic ecosystem.",
    image: "/assets/journey1.webp",
    quote: "We wanted to create a place where ancient wisdom meets modern sustainability.",
    icon: "🌱",
    color: "#2e7d32",
    gradient: "linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)",
  },
  {
    year: "2015",
    title: "Organic Certification",
    desc: "Achieved certification from Tamil Nadu Organic Certification Department (TNOCD) with registration number TNO(F) 973, marking our commitment to poison-free, quality organic farming.",
    image: "/assets/journey2.webp",
    quote: "Certification was just the beginning of our journey towards true organic excellence.",
    icon: "🏆",
    color: "#f57c00",
    gradient: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
  },
  {
    year: "2018",
    title: "Cuckoo Brand Launch",
    desc: "Launched our registered brand 'Cuckoo' - the sound of nature - to sell farm produce and value-added products directly to consumers, promoting the noble business of farming.",
    image: "/assets/journey3.webp",
    quote: "Every purchase helps pull carbon from the atmosphere into the soil and empowers rural livelihoods.",
    icon: "🦅",
    color: "#7b1fa2",
    gradient: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
  },
  {
    year: "2020",
    title: "Educational Services",
    desc: "Expanded into Natural Farming Education services, Farm Internship Programs, and Farming consultation services, sharing our knowledge with the next generation of farmers.",
    image: "/assets/journey4.webp",
    quote: "Sharing our knowledge is as important as growing food - it ensures the future of sustainable agriculture.",
    icon: "🎓",
    color: "#1976d2",
    gradient: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
  },
  {
    year: "2022",
    title: "Engineering Solutions",
    desc: "Developed engineering solutions for Jeevamirtham preparation, Bio digester design, and farm automation, combining traditional wisdom with modern technology.",
    image: "/assets/journey5.webp",
    quote: "We research, document, and publish our natural farming best practices to create awareness about sustainable farming.",
    icon: "⚙️",
    color: "#d32f2f",
    gradient: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
  },
  {
    year: "2024",
    title: "Thriving Ecosystem",
    desc: "Today, Pragathi Natural Farm stands as a model for biodiversity, sustainability, and community empowerment, inspiring new generations to embrace farming as a noble profession.",
    image: "/assets/journey6.webp",
    quote: "Our journey continues, rooted in nature and hope, creating a better tomorrow for all.",
    icon: "🌿",
    color: "#388e3c",
    gradient: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function JourneyPage() {
  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: "100vh", 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff9800, #ffc107)',
          opacity: 0.08,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={sectionVariant}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="📅 Our Story Timeline" 
              sx={{ 
                mb: 3, 
                px: 3, 
                py: 1, 
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #43b047, #6fdc8c)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(67, 176, 71, 0.3)'
              }} 
            />
            <Typography 
              variant="h2" 
              fontWeight={900} 
              sx={{ 
                background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Our Journey
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.3rem' }
              }}
            >
              From a vision in Jakkarpalayam, Pollachi to a certified organic ecosystem that empowers communities and inspires sustainable farming.
            </Typography>
          </Box>
        </motion.div>

        <Timeline position="alternate" sx={{ mt: 4, '& .MuiTimelineContent-root': { flex: '0 0 85%' } }}>
          {milestones.map((m, i) => (
            <TimelineItem key={m.year}>
              <TimelineSeparator>
                <TimelineDot 
                  sx={{ 
                    background: `linear-gradient(135deg, ${m.color}, ${alpha(m.color, 0.7)})`,
                    width: 24,
                    height: 24,
                    boxShadow: `0 6px 16px ${alpha(m.color, 0.4)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }} 
                >
                  {m.icon}
                </TimelineDot>
                {i < milestones.length - 1 && (
                  <TimelineConnector 
                    sx={{ 
                      background: `linear-gradient(180deg, ${m.color}, ${milestones[i + 1]?.color || '#43b047'})`,
                      height: 80,
                      width: 3,
                      borderRadius: 2
                    }} 
                  />
                )}
              </TimelineSeparator>
              <TimelineContent sx={{ flex: '0 0 85%' }}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariant}
                  transition={{ delay: i * 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Card 
                    elevation={0} 
                    sx={{ 
                      mb: 4, 
                      borderRadius: 3, 
                      background: m.gradient,
                      border: `2px solid ${alpha(m.color, 0.2)}`,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: `0 24px 48px ${alpha(m.color, 0.2)}`,
                        '& .timeline-icon': {
                          transform: 'scale(1.2) rotate(10deg)',
                        }
                      }
                    }}
                  >
                    {/* Decorative corner */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 120,
                        height: 120,
                        background: `linear-gradient(135deg, ${alpha(m.color, 0.1)} 0%, transparent 70%)`,
                        borderRadius: '0 0 0 100%',
                      }}
                    />
                    
                    <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Box
                            className="timeline-icon"
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              background: `linear-gradient(135deg, ${m.color}, ${alpha(m.color, 0.8)})`,
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '24px',
                              mr: 3,
                              boxShadow: `0 6px 20px ${alpha(m.color, 0.4)}`,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.1) rotate(5deg)',
                              }
                            }}
                          >
                            {m.icon}
                          </Box>
                          <Box>
                            <Typography 
                              variant="h4" 
                              fontWeight={800} 
                              sx={{ 
                                color: m.color,
                                fontSize: { xs: '1.4rem', md: '1.6rem' },
                                mb: 0.5
                              }}
                            >
                              {m.year}
                            </Typography>
                            <Typography 
                              variant="h5" 
                              fontWeight={700} 
                              sx={{ 
                                color: 'text.primary',
                                fontSize: { xs: '1.2rem', md: '1.3rem' }
                              }}
                            >
                              {m.title}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography 
                          variant="body1" 
                          color="text.primary" 
                          mb={3}
                          sx={{ 
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            lineHeight: 1.7,
                            fontWeight: 500
                          }}
                        >
                          {m.desc}
                        </Typography>
                        
                        <Box sx={{ 
                          p: 3, 
                          background: alpha(m.color, 0.1),
                          borderRadius: 3,
                          border: `2px solid ${alpha(m.color, 0.2)}`,
                          position: 'relative',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: -8,
                            left: 20,
                            width: 0,
                            height: 0,
                            borderLeft: '8px solid transparent',
                            borderRight: '8px solid transparent',
                            borderBottom: `8px solid ${alpha(m.color, 0.1)}`
                          }
                        }}>
                          <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            fontStyle="italic"
                            sx={{ 
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              lineHeight: 1.6,
                              fontWeight: 500
                            }}
                          >
                            "{m.quote}"
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        {/* Key Achievements Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariant}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Box sx={{ mt: 8, mb: 4 }}>
            <Typography 
              variant="h3" 
              fontWeight={800} 
              sx={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #2e7d32, #43b047)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 4,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Our Impact & Services
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #e8f5e8 0%, #f0fff0 100%)',
                    border: '2px solid rgba(46, 125, 50, 0.2)',
                    borderRadius: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(46, 125, 50, 0.2)'
                    }
                  }}
                >
                  <Typography variant="h2" sx={{ color: '#2e7d32', mb: 1 }}>🏆</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 1 }}>
                    TNOCD Certified
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Registration: TNO(F) 973
                  </Typography>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                    border: '2px solid rgba(245, 124, 0, 0.2)',
                    borderRadius: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(245, 124, 0, 0.2)'
                    }
                  }}
                >
                  <Typography variant="h2" sx={{ color: '#f57c00', mb: 1 }}>🌱</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 1 }}>
                    Native Varieties
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    All native crops, oils & seeds
                  </Typography>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
                    border: '2px solid rgba(123, 31, 162, 0.2)',
                    borderRadius: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(123, 31, 162, 0.2)'
                    }
                  }}
                >
                  <Typography variant="h2" sx={{ color: '#7b1fa2', mb: 1 }}>🎓</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 1 }}>
                    Education Services
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Farm Internships & Training
                  </Typography>
                </Card>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    border: '2px solid rgba(25, 118, 210, 0.2)',
                    borderRadius: 3,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(25, 118, 210, 0.2)'
                    }
                  }}
                >
                  <Typography variant="h2" sx={{ color: '#1976d2', mb: 1 }}>⚙️</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 1 }}>
                    Engineering Solutions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jeevamirtham & Bio-digesters
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
