import Header from "../Header/Header";
import { Box } from "@mui/system";

const Inventory = () => {
  return (
    // HEADER
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="INVENTORY" subtitle="Welcome to your Inventory" />
      </Box>
    </Box>
  );
};

export default Inventory;
