import Menu from "./Menu/Menu";
import Inventory from "./Inventory/Inventory";
import Header from "../Header/Header";
import { useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/system";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";
import Tooltip from "@mui/material/Tooltip";

function MenuInventory() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" width="98%">
      <Header title="MENU & INVENTORY" subtitle="View your menu & inventory" />
      <Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" justifyContent="space-around">
            <Typography variant="h4" pt="10%">
              Inventory
            </Typography>
            <Tooltip
              title={<Typography fontSize="1.3em">Add Team Member</Typography>}
              placement="right"
              arrow
            >
              <IconButton
                sx={{
                  color: `${colors.orangeAccent[500]}`,
                }}
                onClick={() => {
                  dispatch({
                    type: "SET_SHOW_ADD_TO_INVENTORY_FORM",
                    payload: true,
                  });
                }}
              >
                <AddIcon style={{ fontSize: "1.5em" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box display="flex" justifyContent="space-around" mr="20px">
            <Typography variant="h4" pt="13%">
              Menu
            </Typography>
            <Tooltip
              title={<Typography fontSize="1.5em">Add Menu Item</Typography>}
              placement="top"
              arrow
            >
              <IconButton
                sx={{
                  color: `${colors.orangeAccent[500]}`,
                }}
                // Open the form to add new menu item
                onClick={() => {
                  dispatch({
                    type: "SET_SHOW_ADD_TO_MENU_FORM",
                    payload: true,
                  });

                  dispatch({
                    type: "FETCH_INVENTORY",
                  });
                }}
              >
                <AddIcon style={{ fontSize: "1.5em" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Inventory />
          <Box width="25vw" sx={{ h: "25vh" }}>
            <Menu />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MenuInventory;
