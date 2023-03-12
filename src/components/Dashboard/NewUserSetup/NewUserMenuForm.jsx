import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import NativeSelect from "@mui/material/NativeSelect";
import { FormControl, FormControlLabel, FormLabel, Radio } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";

function NewUserMenuForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //variable to show whether the add contact form is showing
  const showMenuForm = useSelector(
    (store) => store.newUserSetup.showInitialMenuForm
  );

  //variable for storing ingredients previously added by user
  const [ingredients, setIngredients] = useState([]);

  //function to close the add contact form via redux
  const handleClose = () => {
    dispatch({
      type: "SET_SHOW_INITIAL_MENU_FORM",
      payload: false,
    });
  };

  return (
    //Form to add information about menu items
    <Box>
      <Dialog
        open={showMenuForm}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.khakiAccent[800],
          },
          "& #add-btn, #cancel-btn": {
            backgroundColor: colors.orangeAccent[500],
          },
          "& #done-btn": {
            backgroundColor: colors.greenAccent[400],
          },
          "& .MuiButton-textPrimary": {
            color: `e0e0e0`,
          },
        }}
      >
        <DialogTitle variant="h4" color={colors.greenAccent[400]}>
          Add Dishes to Your Menu
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="dish"
            label="Name of Dish"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
          />
          <Box display="inline-flex">
            {/* Selecting from list of previously added ingredients */}
            <FormControl sx={{ mt: "10px" }}>
              <InputLabel>Ingredient</InputLabel>
              <NativeSelect
                margin="dense"
                id="quantity"
                label="Ingredient Name"
              ></NativeSelect>
              <TextField
                autoFocus
                margin="dense"
                id="quantity"
                label="Quantity In Dish"
                type="number"
                variant="standard"
              />
              {/* </FormControl> */}
              <Box sx={{ mt: "10px", ml: "30px" }}>
                {/* <FormControl> */}
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
                {/* </FormControl> */}
              </Box>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button id="add-btn" onClick={handleClose}>
            Add Another Ingredient
          </Button>
          <Button
            id="cancel-btn"
            onClick={() => {
              handleClose();
            }}
          >
            Add Dish
          </Button>
          <Button id="done-btn" onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NewUserMenuForm;
