import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";

//Reusable header to be passed to all scenes
const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{
          mb: "5px",
          color: `${colors.primary[100]}`,
        }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
