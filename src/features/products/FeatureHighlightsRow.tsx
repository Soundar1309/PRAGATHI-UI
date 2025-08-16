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
                  alignItems: "center",
                  gap: 1.5,
                  px: 2.5,
                  py: 1.2,
                  borderRadius: 99,
                  bgcolor: theme.palette.mode === 'light' 
                    ? theme.palette.background.paper
                    : alpha(theme.palette.background.paper, 0.9),
                  boxShadow: theme.palette.mode === 'light'
                    ? "0 2px 8px rgba(44,70,57,0.10)"
                    : `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                  mx: 0.5,
                  minWidth: { xs: 120, sm: 150, md: 180 },
                  maxWidth: { xs: 140, sm: 180, md: 220 },
                  cursor: "pointer",
                  transition: "box-shadow 0.25s, transform 0.25s",
                  "&:hover": {
                    boxShadow: `0 4px 18px ${alpha(theme.palette.primary.main, 0.3)}`,
                    transform: "scale(1.06)",
                    bgcolor: theme.palette.mode === 'light' 
                      ? theme.palette.grey[100]
                      : alpha(theme.palette.background.paper, 0.95),
                  },
                }}
                tabIndex={0}
                aria-label={feature.label}
              >
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: theme.palette.mode === 'light'
                      ? `linear-gradient(135deg, ${theme.palette.primary.main} 60%, ${theme.palette.primary.dark} 100%)`
                      : `linear-gradient(135deg, ${theme.palette.primary.main} 40%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                    boxShadow: theme.palette.mode === 'light'
                      ? `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`
                      : `0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                    flexShrink: 0,
                  }}
                >
                  <Icon
                    sx={{
                      color: theme.palette.common.white,
                      fontSize: 30,
                      transition: 'color 0.2s, font-size 0.2s',
                      '&:hover': {
                        color: theme.palette.primary.light,
                        fontSize: 34,
                      },
                    }}
                  />
                </motion.div>
                <Typography
                  variant="subtitle2"
                  fontWeight={800}
                  sx={{
                    fontSize: 16,
                    color: theme.palette.text.primary,
                    letterSpacing: 0.5,
                    userSelect: "none",
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