import Header from "../Header/Header";
import { Box, useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";

const Sales = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    // HEADER
    <Box m="20px">
      <Header title="Sales" subtitle="Business is booming!!" />
      <Box
        display="flex"
        justifyContent="space-evenly"
        marginBottom="8%"
        marginTop="5%"
      >
        <Box
          width="40vw"
          height="60vh"
          borderRadius="3%"
          sx={{
            backgroundColor: `${colors.khakiAccent[700]}`,
            boxShadow: "8px 8px 12px rgba(0,0,0,0.4)",
            border: `5px solid ${colors.khakiAccent[800]}`,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: colors.greenAccent[400],
              textAlign: "center",
              mt: "4%",
            }}
          >
            Add New Order
          </Typography>
        </Box>
        <Box
          width="40vw"
          height="60vh"
          borderRadius="3%"
          sx={{
            backgroundColor: `${colors.khakiAccent[700]}`,
            boxShadow: "8px 8px 12px rgba(0,0,0,0.4)",
            border: `5px solid ${colors.khakiAccent[800]}`,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: colors.greenAccent[400],
              textAlign: "center",
              mt: "4%",
            }}
          >
            Add New Order
          </Typography>
        </Box>
      </Box>
      <Box
        width="80vw"
        height="70vh"
        borderRadius="3%"
        margin="auto"
        sx={{
          backgroundColor: `${colors.khakiAccent[700]}`,
          boxShadow: "8px 8px 12px rgba(0,0,0,0.4)",
          border: `5px solid ${colors.khakiAccent[800]}`,
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: colors.greenAccent[400], textAlign: "center", mt: "4%" }}
        >
          Add New Order
        </Typography>
      </Box>
    </Box>
  );
};

export default Sales;
