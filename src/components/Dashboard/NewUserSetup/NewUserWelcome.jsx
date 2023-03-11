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

  //variable to show whether the welcome is showing
  const showInitialWelcome = useSelector(
    (store) => store.newUserSetup.showInitialWelcome
  );

  //function to close the add to inventory form via redux
  const handleClose = () => {
    dispatch({
      type: "SET_SHOW_INITIAL_INVENTORY_FORM",
      payload: false,
    });
  };

  return (
    //Form to add information of contacts
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
        <DialogTitle>Welcome to Kitchen Keeper!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A few things before we begin, -Please have a list of all of your
            current inventory ready -You will also need your menu and the amount
            of each individual ingredient that is in every dish on your menu
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="add-btn" variant="text" onClick={handleClose}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NewUserWelcome;
