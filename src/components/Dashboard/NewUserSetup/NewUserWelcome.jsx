import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DialogContentText } from "@mui/material/";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";

function NewUserWelcome() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Variable to show whether the welcome is showing
  const showInitialWelcome = useSelector(
    (store) => store.conditionalForms.showInitialWelcome
  );

  //Function to close the welcome dialog and open inventory form via redux
  const handleNext = () => {
    dispatch({
      type: "SET_SHOW_ADD_TO_INVENTORY_FORM",
      payload: true,
    });
    dispatch({
      type: "SET_SHOW_INITIAL_WELCOME",
      payload: false,
    });
  };

  return (
    //Welcome Dialog
    <Box>
      <Dialog
        fullWidth
        open={showInitialWelcome}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.khakiAccent[800],
          },
          "& #add-btn, #cancel-btn": {
            backgroundColor: colors.orangeAccent[500],
          },
          "& .MuiButton-textPrimary": {
            color: `e0e0e0`,
          },
        }}
      >
        <DialogTitle variant="h3" color={colors.greenAccent[400]}>
          Welcome to Kitchen Keeper!
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant="h6">
            A few things before we begin,
          </DialogContentText>
          <ul>
            <li>
              Please have a list with all of your current inventory ready. This
              includes item names and the quantity you currently have in stock
            </li>
            <li>
              You will also need your menu and the amount of each individual
              ingredient that is in every dish on your menu
            </li>
            <li>
              Don't worry if you forget something or enter in the wrong
              information. You will be able to come back and change it later
            </li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button id="add-btn" variant="text" onClick={() => handleNext()}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NewUserWelcome;
