import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, useTheme, Stack } from "@mui/material";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const imageMotion = {
  rest: { scale: 1, filter: "brightness(1)", transition: { duration: 0.2 } },
  hover: { scale: 1.04, filter: "brightness(1.08)", transition: { duration: 0.3 } },
};

const imageStyle = {
  width: "100%",
  maxWidth: 500,
  height: "auto",
  borderRadius: 3,
  boxShadow: "0 4px 16px rgba(60,60,60,0.10)",
  border: "1.5px solid #e0e0e0",
  margin: "0 auto",
  display: "block",
  background: "#fafaf9",
};

export default function AboutPage() {
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: "#F7F9FB", pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 220, md: 340 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(0deg,rgba(31,41,55,0.45),rgba(31,41,55,0.18)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat`,
        }}
      >
        <Container maxWidth="md" sx={{ zIndex: 2, textAlign: "center", py: { xs: 4, md: 8 } }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
            <Typography
              variant="h2"
              sx={{
                color: "#111",
                fontWeight: 800,
                letterSpacing: 1,
                mb: 2,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              About Pragathi Nature Farms
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#222",
                fontWeight: 400,
                mb: 2,
                maxWidth: 700,
                mx: "auto",
              }}
            >
              A living example of regenerative, organic, and natural farming in Tamil Nadu, India. Our farm is a sanctuary for biodiversity, sustainability, and community-driven agriculture.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Philosophy Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
            >
              <motion.img
                src="/assets/img25.png"
                alt="Farm Philosophy"
                style={imageStyle}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={imageMotion}
              />
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} justifyContent="center" height="100%">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                <Typography variant="h4" fontWeight={700} color="#111" mb={2}>
                  Our Philosophy
                </Typography>
                <Typography variant="body1" color="#111" mb={2}>
                  At Pragathi Nature Farms, we believe that the earth is a living entity to be nurtured, not exploited. Our philosophy is rooted in the principles of natural farming, where every action is guided by respect for the land, water, and all living beings. We strive to create a self-sustaining ecosystem that supports biodiversity, soil health, and the well-being of our community.
                </Typography>
                <Typography variant="body1" color="#111">
                  We are inspired by the teachings of Masanobu Fukuoka and Subhash Palekar, blending traditional wisdom with modern organic practices to cultivate food that is pure, nutritious, and grown in harmony with nature.
                </Typography>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Organic Practices Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={6} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} justifyContent="center" height="100%">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                <Typography variant="h4" fontWeight={700} color="#111" mb={2}>
                  Organic & Regenerative Practices
                </Typography>
                <Typography variant="body1" color="#111" mb={2}>
                  Our farm is a living laboratory for organic and regenerative agriculture. We use no synthetic fertilizers or pesticides. Instead, we rely on natural composting, green manures, mulching, and crop rotation to enrich the soil. Cows, goats, and poultry are integrated into our farming system, providing natural manure and helping to close the nutrient loop.
                </Typography>
                <Typography variant="body1" color="#111">
                  We practice intercropping, agroforestry, and water conservation through rainwater harvesting and drip irrigation. Our fields are alive with native trees, medicinal plants, and pollinator-friendly flowers, creating a resilient and productive landscape.
                </Typography>
              </motion.div>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
            >
              <motion.img
                src="/assets/img21.png"
                alt="Organic Practices"
                style={imageStyle}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={imageMotion}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Location & Biodiversity Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
            >
              <motion.img
                src="/assets/img33.png"
                alt="Farm Location"
                style={imageStyle}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={imageMotion}
              />
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} justifyContent="center" height="100%">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                <Typography variant="h4" fontWeight={700} color="#111" mb={2}>
                  Location & Biodiversity
                </Typography>
                <Typography variant="body1" color="#111" mb={2}>
                  Pragathi Nature Farms is located in the lush heart of Tamil Nadu, near the Western Ghats. Our 30-acre farm is a mosaic of paddy fields, orchards, vegetable gardens, and forest patches. We have planted over 10,000 trees, creating a haven for birds, butterflies, and beneficial insects.
                </Typography>
                <Typography variant="body1" color="#111">
                  The farm is a living classroom for students, farmers, and visitors who wish to learn about sustainable agriculture, biodiversity, and rural livelihoods. We regularly host workshops, farm tours, and volunteering opportunities.
                </Typography>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Founders' Vision Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={6} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} justifyContent="center" height="100%">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                <Typography variant="h4" fontWeight={700} color="#111" mb={2}>
                  Founders' Vision
                </Typography>
                <Typography variant="body1" color="#111" mb={2}>
                  Pragathi Nature Farms was founded by a passionate family committed to restoring the health of the land and the community. Their vision is to inspire a new generation of farmers and consumers to embrace natural, ethical, and community-driven agriculture.
                </Typography>
                <Typography variant="body1" color="#111">
                  The founders believe in transparency, education, and sharing knowledge. They actively mentor young farmers, collaborate with local schools, and support women’s self-help groups in the region.
                </Typography>
              </motion.div>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
            >
              <motion.img
                src="/assets/img45.png"
                alt="Founders Vision"
                style={imageStyle}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={imageMotion}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Community & Education Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariant}
            >
              <motion.img
                src="/assets/img51.png"
                alt="Community and Education"
                style={imageStyle}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={imageMotion}
              />
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} justifyContent="center" height="100%">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariant}>
                <Typography variant="h4" fontWeight={700} color="#111" mb={2}>
                  Community & Education
                </Typography>
                <Typography variant="body1" color="#111" mb={2}>
                  We believe that true change begins with education and community engagement. Our farm regularly hosts school children, college students, and aspiring farmers for hands-on learning experiences. We offer workshops on natural farming, composting, seed saving, and more.
                </Typography>
                <Typography variant="body1" color="#111">
                  Our partnerships with local NGOs and government agencies help us reach a wider audience and promote sustainable livelihoods in rural Tamil Nadu.
                </Typography>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Farm Life Gallery Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
          <Typography variant="h4" fontWeight={700} color="#111" mb={4} textAlign="center">
            Farm Life Gallery
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              "/assets/img1.png",
              "/assets/img8.png",
              "/assets/img17.png",
              "/assets/img23.png",
              "/assets/img34.png",
              "/assets/img69.png",
            ].map((src, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={src}>
                <Card sx={{ boxShadow: 2, borderRadius: 3, bgcolor: "#fff" }}>
                  <CardMedia
                    component="img"
                    image={src}
                    alt={`Farm life ${idx + 1}`}
                    sx={{ height: 220, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="#111" align="center">
                      {[
                        "Early morning at the farm",
                        "Diverse crops thriving together",
                        "Natural composting in action",
                        "Children learning about nature",
                        "Harvest time joy",
                        "A haven for birds and butterflies",
                      ][idx]}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ bgcolor: theme.palette.primary.main, py: 7, mt: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 700,
                mb: 2,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Visit Pragathi Nature Farms
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#E0E7EF",
                mb: 4,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Experience the beauty of organic farming, taste the difference, and join us in our mission to cultivate a healthier, greener future.
            </Typography>
            <Box
              component="a"
              href="/contact"
              sx={{
                display: "inline-block",
                bgcolor: "#fff",
                color: theme.palette.primary.main,
                fontWeight: 700,
                borderRadius: 2,
                px: 4,
                py: 1.5,
                boxShadow: "0 2px 8px rgba(59,130,246,0.08)",
                textTransform: "none",
                fontFamily: "Inter, system-ui, sans-serif",
                textDecoration: "none",
                fontSize: 18,
                transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                '&:hover': {
                  bgcolor: "#E0E7EF",
                  color: theme.palette.primary.dark,
                },
              }}
            >
              Contact Us
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
