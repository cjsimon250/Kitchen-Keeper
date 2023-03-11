import Header from "../Header/Header";
import { Box } from "@mui/system";

const BarGraph = () => {
  return (
    // HEADER
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ORDERS" subtitle="All of your orders" />
      </Box>
    </Box>
  );
};

export default BarGraph;
