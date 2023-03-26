import Header from "../Header/Header";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewUserSetup from "./NewUserSetup/NewUserSetup";
import SalesByMonthLine from "./Sales/SalesByMonthLine";
import SalesByWeekBar from "./Sales/SalesByWeekBar";
import AddSalesForm from "./Sales/SalesForm/AddSalesForm";
import Notifications from "./Notifications/Notifications";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const inventory = useSelector((store) => store.inventory);
  const username = useSelector((store) => store.user.username);

  //Fetching inventory on page load to check if user is new or not
  useEffect(() => {
    dispatch({ type: "FETCH_INVENTORY" });
  }, [dispatch]);

  //If the current inventory is empty (user is new) then display
  //the add item to inventory form
  useEffect(() => {
    if (inventory?.length === 0) {
      dispatch({ type: "SET_SHOW_INITIAL_WELCOME", payload: true });
    } else {
      dispatch({ type: "SET_SHOW_INITIAL_WELCOME", payload: false });
    }
  }, [inventory, dispatch]);

  return (
    <Box
      m="20px"
      sx={{
        "& .MuiButton-sizeMedium": {
          width: "30vw",
          backgroundColor: colors.greenAccent[600],
        },
        "& .MuiButton-sizeMedium:hover": {
          backgroundColor: colors.greenAccent[700],
        },
      }}
    >
      <Header
        title="DASHBOARD"
        subtitle={`Welcome to your dashboard ${username}`}
      />
      <NewUserSetup />
      <Box display="flex" justifyContent="space-between" mt="5%">
        <Box>
          <SalesByMonthLine />
          <SalesByWeekBar />
        </Box>
        <Box>
          <Button
            sx={{ fontSize: "1rem", mb: "3%" }}
            onClick={() => {
              dispatch({
                type: "SET_SHOW_SALES_FORM",
                payload: true,
              });
            }}
          >
            Add Sales For Today
          </Button>
          <Notifications />
        </Box>
      </Box>
      <AddSalesForm />
    </Box>
  );
};

export default Dashboard;
