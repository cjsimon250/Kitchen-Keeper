import Header from "../Header/Header";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InitialSetupInventory from "./InitialSetupInventory/InitialSetupInventory";

const Dashboard = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((store) => store.inventory);
  //Fetching inventory on page load
  useEffect(() => {
    dispatch({ type: "FETCH_INVENTORY" });
  }, [dispatch]);

  //If the current inventory is empty (user is new) then display
  //the add item to inventory form
  useEffect(() => {
    dispatch({ type: "SET_SHOW_INITIAL_INVENTORY_FORM", payload: true });
  }, [inventory === []]);

  return (
    // HEADER
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <InitialSetupInventory />
      </Box>
    </Box>
  );
};

export default Dashboard;
