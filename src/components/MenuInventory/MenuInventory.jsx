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
    <Box m="20px">
      <Header title="MENU & INVENTORY" subtitle="View your menu & inventory" />
      <Box width="100%">
        <Box display="flex" width="100%" justifyContent="space-between">
          <Typography variant="h3">Menu</Typography>
          <Tooltip
            title={<Typography fontSize="1.5em">Add Menu Item</Typography>}
            placement="top"
            arrow
          >
            <IconButton
              sx={{ alignItems: "right", color: `${colors.orangeAccent[500]}` }}
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
        <Menu />
        <Typography variant="h3" mt="3%">
          Inventory
        </Typography>
        <Inventory />
      </Box>
    </Box>
  );
}

export default MenuInventory;
