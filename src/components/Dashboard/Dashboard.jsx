import Header from "../Header/Header";
import { Box } from "@mui/system";

const Dashboard = () => {
  return (
    // HEADER
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
