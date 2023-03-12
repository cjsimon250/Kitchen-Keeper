import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import { FormControl, FormControlLabel, FormLabel, Radio } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";

function NewUserInventoryForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Variable to show whether the form is showing
  const showInitialInventoryForm = useSelector(
    (store) => store.newUserSetup.showInitialInventoryForm
  );

  //Variable to hold inventory item information to send
  // **These to values are set so that on first render they are considered controlled**
  const [inventoryItemToSend, setInventoryItemToSend] = useState({
    item: "",
    quantity: 0,
    inStockUnit: "Lb",
    minimumStock: 0,
    minimumStockUnit: "Lb",
  });

  //Function to handle posting the new item to database
  function handlePostInventoryItem() {
    console.log(inventoryItemToSend);
    dispatch({
      type: "POST_INVENTORY",
      payload: inventoryItemToSend,
    });

    //Clear inputs
    setInventoryItemToSend({
      item: "",
      quantity: 0,
      inStockUnit: "Lb",
      minimumStock: 0,
      minimumStockUnit: "Lb",
    });
  }

  //Function to close the add to inventory form and open the menu form via redux
  const handleNext = () => {
    dispatch({
      type: "SET_SHOW_INITIAL_WELCOME",
      payload: false,
    });
    dispatch({
      type: "SET_SHOW_INITIAL_MENU_FORM",
      payload: true,
    });
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
          "& #next-btn, #cancel-btn": {
            backgroundColor: colors.orangeAccent[500],
          },
          "& .MuiButton-textPrimary": {
            color: `e0e0e0`,
          },
        }}
      >
        <DialogTitle variant="h4" color={colors.greenAccent[400]}>
          Add Items to Your Inventory
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="item"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
            value={inventoryItemToSend.item}
            onChange={(event) =>
              setInventoryItemToSend({
                ...inventoryItemToSend,
                item: event.target.value,
              })
            }
          />
          <Box display="inline-flex">
            <TextField
              autoFocus
              margin="dense"
              id="quantity"
              label="Quantity In Stock"
              type="number"
              variant="standard"
              inputProps={{ min: 0 }}
              value={inventoryItemToSend.quantity}
              onChange={(event) =>
                setInventoryItemToSend({
                  ...inventoryItemToSend,
                  quantity: event.target.value,
                })
              }
            />
            <Box sx={{ mt: "10px", ml: "30px" }}>
              <FormControl>
                <FormLabel id="measurement-unit">Unit of Measurement</FormLabel>
                <RadioGroup
                  row
                  name="in-stock-radio-btn-group"
                  value={inventoryItemToSend.inStockUnit}
                  onChange={(event) =>
                    setInventoryItemToSend({
                      ...inventoryItemToSend,
                      inStockUnit: event.target.value,
                    })
                  }
                >
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
              inputProps={{ min: 0 }}
              value={inventoryItemToSend.minimumStock}
              onChange={(event) =>
                setInventoryItemToSend({
                  ...inventoryItemToSend,
                  minimumStock: event.target.value,
                })
              }
            />
            <Box sx={{ mt: "10px", ml: "30px" }}>
              <FormControl>
                <FormLabel id="measurement-unit">Unit of Measurement</FormLabel>
                <RadioGroup
                  row
                  value={inventoryItemToSend.minimumStockUnit}
                  name="min-stock-radio-btn-group"
                  onChange={(event) =>
                    setInventoryItemToSend({
                      ...inventoryItemToSend,
                      minimumStockUnit: event.target.value,
                    })
                  }
                >
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
              handlePostInventoryItem();
            }}
          >
            Add Item
          </Button>
          <Button id="next-btn" variant="text" onClick={handleNext}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NewUserInventoryForm;
