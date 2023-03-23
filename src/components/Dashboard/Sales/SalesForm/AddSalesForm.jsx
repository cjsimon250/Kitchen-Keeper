import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../../theme";
import MenuTextFields from "./MenuTextFields";
import { IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";

function AddSalesForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Variable to show whether the welcome is showing
  const showForm = useSelector(
    (store) => store.conditionalForms.showAddSalesForm
  );

  return (
    //Welcome Dialog
    <Box>
      <Dialog
        open={showForm}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.khakiAccent[800],
          },
        }}
      >
        <DialogTitle variant="h3" color={colors.greenAccent[400]}>
          End Of Day Sales Summary
          <IconButton
            onClick={() => {
              dispatch({
                type: "SET_SHOW_SALES_FORM",
                payload: false,
              });
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <MenuTextFields />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
export default AddSalesForm;
