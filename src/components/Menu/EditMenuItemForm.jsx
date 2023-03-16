import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import MenuFormNewIngredient from "./MenuFormNewIngredient";

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

  //Object that holds new ingredients to add and whether the inputs to add
  //a new ingredient are showing
  const newIngredients = useSelector((store) => store.menu.newIngredientsInput);

  //Variable holding the data about item to send
  const [updatedItemToSend, setUpdatedItemToSend] = useState({
    dish: selectedItem?.dish || "",
    image: selectedItem?.image || "",
    price: selectedItem?.price || "",
    ingredients: selectedItem?.ingredients || [],
  });

  //On page load set updatedItemtoSend's initial values to the current values
  //Fetch all of the user's inventory
  useEffect(() => {
    setUpdatedItemToSend({
      dish: selectedItem?.dish || "",
      image: selectedItem?.image || "",
      price: selectedItem?.price || "",
      ingredients: selectedItem?.ingredients || [],
    });
  }, [selectedItem.ingredients]);

  //Function to close the add contact form via redux
  const handleClose = () => {
    dispatch({
      type: "SHOW_MENU_FORM",
      payload: { showForm: false, menuItem: {} },
    });
  };

  //Function to handle deleteing an ingredient
  const handleDeleteIngredient = async (selectedId) => {
    await axios.delete(`/api/menu/${selectedId}`);

    // Update the state of updatedItemToSend by removing the deleted ingredient
    setUpdatedItemToSend((updatedItemToSend) => ({
      ...updatedItemToSend,
      ingredients: updatedItemToSend.ingredients.filter(
        (item) => item.menuInventoryId !== selectedId
      ),
    }));
  };

  //Function to handle displaying all current ingredients with delete
  //buttons for each
  function displayAllCurrentIngredients() {
    return updatedItemToSend.ingredients.map((item) => {
      return (
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop="10px"
          key={item.menuInventoryId}
        >
          <li>
            {item.item}: {item.quantity} {item.unit}
          </li>
          <Button
            className="delete-btns"
            onClick={() => handleDeleteIngredient(item.menuInventoryId)}
          >
            Delete
          </Button>
        </Box>
      );
    });
  }

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
            <ul sx={{ w: "100%" }}>{displayAllCurrentIngredients()}</ul>
          </Box>
          <Box>
            <MenuFormNewIngredient />
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
            onClick={() => {
              dispatch({
                type: "SHOW_INGREDIENT_INPUTS",
                payload: true,
              });
            }}
          >
            Add Ingredient
          </Button>
          <Button
            id="confirm-btn"
            onClick={() => {
              handleClose();
            }}
          >
            Confirm Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditMenuItemForm;
