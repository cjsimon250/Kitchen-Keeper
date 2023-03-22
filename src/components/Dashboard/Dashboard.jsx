import Header from "../Header/Header";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewUserSetup from "./NewUserSetup/NewUserSetup";

const Dashboard = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((store) => store.inventory);

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
    // HEADER
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <NewUserSetup />
        <button
          onClick={() => {
            dispatch({
              type: "FETCH_SALES",
              payload: {
                minDate: "2022-03-21",
                maxDate: "2023-03-21",
              },
            });
            console.log(sales);
          }}
        >
          GET SALES
        </button>
      </Box>
    </Box>
  );
};

export default Dashboard;
