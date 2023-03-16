import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";
import IngredientsList from "./IngredientsList";

function EditMenuItemForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Variable to show whether the add contact form is showing
  const showForm = useSelector((store) => store.menu.editMenuItemForm.showForm);
  ///Variable holding the data of the item that the user selected
  const selectedItem = useSelector(
    (store) => store.menu.editMenuItemForm.menuItem
  );

  //Whether the add ingredient input fields are showing or not
  // const [showNewIngredientFields, setShowNewIngredientFields] = useState(false);

  //All of the user's inventory to show if they want to add a new ingredient
  const inventory = useSelector((store) => store.inventory);

  //Variable holding the data to send to menu database
  const [updatedItemToSend, setUpdatedItemToSend] = useState({
    dish: selectedItem?.dish || "",
    image: selectedItem?.image || "",
    price: selectedItem?.price || "",
  });

  //On page load set updatedItemtoSend's initial values to the current values
  useEffect(() => {
    setUpdatedItemToSend({
      dish: selectedItem?.dish || "",
      image: selectedItem?.image || "",
      price: selectedItem?.price || "",
    });
  }, [selectedItem]);

  //Function to close the update menu item form via redux
  const handleClose = () => {
    dispatch({
      type: "SHOW_MENU_FORM",
      payload: { showForm: false, menuItem: {} },
    });
  };

  return (
    //Form to edit a menu item
    <Box>
      <Dialog
        open={showForm}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.khakiAccent[800],
          },
          "#cancel-btn, #ingredient-btn": {
            backgroundColor: colors.orangeAccent[500],
          },
          "& #confirm-btn": {
            backgroundColor: colors.greenAccent[500],
          },
          ".delete-btns": {
            backgroundColor: colors.orangeAccent[500],
            padding: "4px",
          },
        }}
      >
        <DialogTitle variant="h4" sx={{ color: colors.greenAccent[500] }}>
          Edit "{selectedItem.dish}"
        </DialogTitle>
        <DialogContent>
          <Box
            margin="auto"
            sx={{
              maxWidth: "300px",
              maxHeight: "300px",
              marginBottom: "5%",
              marginTop: "5%",
            }}
          >
            <img
              src={`${updatedItemToSend.image}`}
              style={{
                maxHeight: "300px",
                maxWidth: "100%",
                width: "auto",
                height: "auto",
                display: "block",
                margin: "0 auto",
                objectFit: "contain",
                borderRadius: "10px",
                boxShadow: "5px 5px 7px rgba(0, 0, 0, 0.6)",
              }}
            />
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="dish"
            label="Dish"
            type="text"
            fullWidth
            variant="outlined"
            value={updatedItemToSend.dish}
            onChange={(event) => {
              setUpdatedItemToSend({
                ...updatedItemToSend,
                dish: event.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Image Url"
            type="url"
            fullWidth
            variant="outlined"
            value={updatedItemToSend.image}
            onChange={(event) => {
              setUpdatedItemToSend({
                ...updatedItemToSend,
                image: event.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            variant="outlined"
            value={updatedItemToSend.price}
            onChange={(event) => {
              setUpdatedItemToSend({
                ...updatedItemToSend,
                price: event.target.value,
              });
            }}
          />
          <DialogTitle variant="h5" sx={{ color: colors.greenAccent[500] }}>
            Ingredients
          </DialogTitle>
          {/* Displaying all ingredients already in the database and allowing
          the user to add more if necessary
          */}
          <Box width="100%" margin="auto">
            <ul sx={{ w: "100%" }}>
              <IngredientsList updatedItemToSend={updatedItemToSend} />
            </ul>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            id="cancel-btn"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            id="ingredient-btn"
            onClick={() => setShowNewIngredientFields(true)}
          >
            Add Ingredient
          </Button>
          <Button id="confirm-btn" onClick={handleClose}>
            Confirm Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditMenuItemForm;
