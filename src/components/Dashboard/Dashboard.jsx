import Header from "../Header/Header";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_INVENTORY" });
  }, [dispatch]);
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
