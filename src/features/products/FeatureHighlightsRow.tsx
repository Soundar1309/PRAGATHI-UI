import { Box, Typography, useTheme, Stack } from "@mui/material";
import NatureIcon from "@mui/icons-material/Nature";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupsIcon from "@mui/icons-material/Groups";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedIcon from "@mui/icons-material/Verified";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";

const features = [
  {
    icon: NatureIcon,
    label: "100% Natural",
  },
  {
    icon: CalendarTodayIcon,
    label: "Since 1969",
  },
  {
    icon: GroupsIcon,
    label: "10K Farmers",
  },
  {
    icon: ShoppingCartIcon,
    label: "6cr+ Orders",
  },
  {
    icon: PeopleIcon,
    label: "18L Customer",
  },
  {
    icon: VerifiedIcon,
    label: "Certified",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const iconVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: [0, -10, 10, 0], scale: 1.15, transition: { duration: 0.5 } },
};

export function FeatureHighlightsRow() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        background: theme.palette.mode === 'light' 
          ? `linear-gradient(135deg, #d4f7d4 0%, #f0fff0 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
        py: 2,
        px: { xs: 1, sm: 4 },
        display: "flex",
        flexDirection: "row",
        justifyContent: { xs: "flex-start", md: "center" },
        alignItems: "center",
        gap: 0,
        overflowX: { xs: "auto", md: "visible" },
        boxShadow: theme.palette.mode === 'light' 
          ? "0 1px 8px rgba(44,70,57,0.04)"
          : `0 1px 8px ${alpha(theme.palette.primary.main, 0.15)}`,
        mb: 4,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
      }}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Stack
        direction="row"
        sx={{
          width: "100%",
          flexWrap: "nowrap",
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          display: { xs: "flex", sm: "flex" },
        }}
      >
        {features.map((feature, _index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.label}
              variants={chipVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              style={{ 
                display: "flex",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  gap: { xs: 0, sm: 2 },
                  px: { xs: 1, sm: 3 },
                  py: { xs: 1, sm: 1 },
                  borderRadius: { xs: 2, sm: 99 },
                  bgcolor: {
                    xs: "transparent",
                    sm: theme.palette.mode === 'light' 
                      ? theme.palette.background.paper
                      : alpha(theme.palette.background.paper, 0.9)
                  },
                  boxShadow: {
                    xs: "none",
                    sm: theme.palette.mode === 'light'
                      ? "0 2px 8px rgba(44,70,57,0.10)"
                      : `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`
                  },
                  mx: { xs: 0.5, sm: 1 },
                  minWidth: { xs: 60, sm: 150, md: 180 },
                  maxWidth: { xs: 80, sm: 180, md: 220 },
                  cursor: "pointer",
                  transition: "box-shadow 0.25s, transform 0.25s",
                  "&:hover": {
                    boxShadow: {
                      xs: "none",
                      sm: `0 4px 18px ${alpha(theme.palette.primary.main, 0.3)}`
                    },
                    transform: { xs: "none", sm: "scale(1.06)" },
                    bgcolor: {
                      xs: "transparent",
                      sm: theme.palette.mode === 'light' 
                        ? theme.palette.grey[100]
                        : alpha(theme.palette.background.paper, 0.95)
                    },
                  },
                }}
                tabIndex={0}
                aria-label={feature.label}
              >
                <Box
                  sx={{
                    width: { xs: 32, sm: 44 },
                    height: { xs: 32, sm: 44 },
                    marginRight: { xs: 0, sm: 12 },
                  }}
                >
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: { xs: 20, sm: 30 },
                        transition: 'color 0.2s, font-size 0.2s',
                        '&:hover': {
                          color: theme.palette.primary.light,
                          fontSize: { xs: 24, sm: 34 },
                        },
                      }}
                    />
                  </motion.div>
                </Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: 8, sm: 16 },
                    color: theme.palette.text.primary,
                    letterSpacing: 0.5,
                    userSelect: "none",
                    display: { xs: "block", sm: "block" },
                    textAlign: { xs: "center", sm: "left" },
                    lineHeight: { xs: 1.1, sm: 1.4 },
                    mt: { xs: 0.5, sm: 0 },
                  }}
                >
                  {feature.label}
                </Typography>
              </Box>
            </motion.div>
          );
        })}
      </Stack>
    </Box>
  );
} 