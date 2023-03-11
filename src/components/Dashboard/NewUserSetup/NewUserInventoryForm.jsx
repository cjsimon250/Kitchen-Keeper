import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import { FormControl, FormControlLabel, FormLabel, Radio } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";

function NewUserInventoryForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //variable to show whether the form is showing
  const showInitialInventoryForm = useSelector(
    (store) => store.newUserSetup.showInitialInventoryForm
  );

  //function to close the add to inventory form via redux
  const handleClose = () => {
    dispatch({
      type: "SET_SHOW_INITIAL_INVENTORY_FORM",
      payload: false,
    });
  };

  return (
    //Form to add information of inventory items
    <Box>
      <Dialog
        fullWidth
        open={showInitialInventoryForm}
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
        <DialogTitle>Add Your Inventory Items To Manage</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="item"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <Box display="inline-flex">
            <TextField
              autoFocus
              margin="dense"
              id="quantity"
              label="Quantity In Stock"
              type="number"
              variant="standard"
            />
            <Box sx={{ mt: "10px", ml: "30px" }}>
              <FormControl>
                <FormLabel id="access">Unit of Measurement</FormLabel>
                <RadioGroup row defaultValue="Lb" name="access-radio-btn-group">
                  <FormControlLabel value="Lb" control={<Radio />} label="Lb" />

                  <FormControlLabel value="Oz" control={<Radio />} label="Oz" />
                  <FormControlLabel
                    value="Gal."
                    control={<Radio />}
                    label="Gal."
                  />
                  <FormControlLabel
                    value="Fl. Oz"
                    control={<Radio />}
                    label="Fl. Oz"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box display="inline-flex">
            <TextField
              autoFocus
              margin="dense"
              id="quantity"
              label="Minimum Quantity"
              type="number"
              variant="standard"
            />
            <Box sx={{ mt: "10px", ml: "30px" }}>
              <FormControl>
                <FormLabel id="access">Unit of Measurement</FormLabel>
                <RadioGroup row defaultValue="Lb" name="access-radio-btn-group">
                  <FormControlLabel value="Lb" control={<Radio />} label="Lb" />

                  <FormControlLabel value="Oz" control={<Radio />} label="Oz" />
                  <FormControlLabel
                    value="Gal."
                    control={<Radio />}
                    label="Gal."
                  />
                  <FormControlLabel
                    value="Fl. Oz"
                    control={<Radio />}
                    label="Fl. Oz"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            id="cancel-btn"
            onClick={() => {
              handleClose();
            }}
          >
            Add Item
          </Button>
          <Button id="add-btn" variant="text" onClick={handleClose}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NewUserInventoryForm;
