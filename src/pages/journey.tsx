import { Box, Container, Typography, Card, CardContent, Grid, Avatar } from "@mui/material";
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
    title: "The Dream Begins",
    desc: "Our founders envisioned a sustainable, organic farm to inspire healthier living.",
    image: "/assets/journey1.jpg",
    quote: "We wanted to create a place where nature and people thrive together.",
  },
  {
    year: "2014",
    title: "First Harvest",
    desc: "After years of nurturing the land, we celebrated our first organic harvest.",
    image: "/assets/journey2.jpg",
    quote: "Seeing the first crops flourish was a dream come true.",
  },
  {
    year: "2018",
    title: "Community Outreach",
    desc: "We launched educational programs and farm tours for local schools.",
    image: "/assets/journey3.jpg",
    quote: "Sharing our knowledge is as important as growing food.",
  },
  {
    year: "2023",
    title: "A Thriving Ecosystem",
    desc: "Today, Pragathi Farms is a model for biodiversity, sustainability, and community.",
    image: "/assets/journey4.jpg",
    quote: "Our journey continues, rooted in nature and hope.",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function JourneyPage() {
  return (
    <Box sx={{ bgcolor: "#F7F9FB", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h3" fontWeight={800} color="text.primary" mb={2} textAlign="center">
            Our Journey
          </Typography>
          <Typography variant="h6" color="text.primary" mb={5} textAlign="center">
            The story of Pragathi Nature Farms, from vision to vibrant reality.
          </Typography>
        </motion.div>
        <Timeline position="alternate">
          {milestones.map((m, i) => (
            <TimelineItem key={m.year}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {i < milestones.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariant}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card elevation={3} sx={{ mb: 3, borderRadius: 3, bgcolor: "#fff" }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Avatar
                          src={m.image}
                          alt={m.title}
                          sx={{ width: 100, height: 100, mx: "auto", boxShadow: 2 }}
                          variant="rounded"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 8 }}>
                        <CardContent>
                          <Typography variant="h6" fontWeight={700} color="text.primary">
                            {m.year} — {m.title}
                          </Typography>
                          <Typography variant="body1" color="text.primary" mb={1}>
                            {m.desc}
                          </Typography>
                          <Typography variant="body2" color="text.primary" fontStyle="italic">
                            “{m.quote}”
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
}
