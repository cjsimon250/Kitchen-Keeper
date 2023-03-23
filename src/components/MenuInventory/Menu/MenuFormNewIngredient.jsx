import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Box } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

function MenuFormNewIngredient() {
  const dispatch = useDispatch();
  //All of the user's inventory to choose from
  const inventory = useSelector((store) => store.inventory);

  //Variable for whether the form to edit a menu item is showing
  const showEditMenuItemForm = useSelector(
    (store) => store.menu.editMenuItemForm.showIngredientInputs
  );

  //New ingredient object to send to database
  const [updatedIngredient, setUpdatedIngredient] = useState({
    item: "",
    unit: "",
    quantity: 1,
    inventoryId: null,
  });
  //Array of available units of mesurement to map through
  const units = ["Lb", "Oz", "Gal", "Fl. Oz"];

  //Funtion to handle canceling the new ingredient to be added
  function handleCancelAddIngredient() {
    //Hiding the input fields
    dispatch({
      type: "SHOW_INGREDIENT_INPUTS",
      payload: false,
    });
    //Resetting updatedIngredient
    setUpdatedIngredient({
      item: "",
      unit: "",
      quantity: 1,
      inventoryId: null,
    });
  }

  //Function to handle adding new ingredient
  function handleAddIngredient() {
    dispatch({
      type: "UPDATE_INGREDIENTS",
      payload: updatedIngredient,
    });

    //Resetting updatedIngredient
    setUpdatedIngredient({
      item: "",
      unit: "",
      quantity: 1,
      inventoryId: null,
    });
  }

  return (
    <>
      {showEditMenuItemForm ? (
        <Box display="flex" width="100%">
          <FormControl sx={{ width: "25%" }}>
            {/* Allowing user to select an ingredient from their inventory */}
            <InputLabel>Item</InputLabel>
            <Select
              value={updatedIngredient.item}
              variant="standard"
              onChange={(event) => {
                const selectedValue = event.target.value;
                //Find the id of the inventory item
                const selectedIngredient = inventory.find(
                  (ingredient) => ingredient.item === selectedValue
                );
                setUpdatedIngredient({
                  ...updatedIngredient,
                  item: selectedValue,
                  inventoryId: selectedIngredient.id,
                });
              }}
            >
              {inventory.map((ingredient) => {
                return (
                  <MenuItem key={ingredient.id} value={ingredient.item}>
                    {ingredient.item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/* Add quantity in the dish */}
          <TextField
            autoFocus
            id="quantity"
            label="Quantity In Dish"
            type="number"
            variant="standard"
            inputProps={{ min: 1 }}
            value={updatedIngredient.quantity}
            onChange={(event) =>
              setUpdatedIngredient({
                ...updatedIngredient,
                quantity: event.target.value,
              })
            }
          />
          {/* Allowing User to select unit of measurement */}
          <FormControl sx={{ width: "25%" }}>
            <InputLabel>Unit</InputLabel>
            <Select
              value={updatedIngredient.unit}
              variant="standard"
              onChange={(event) => {
                setUpdatedIngredient({
                  ...updatedIngredient,
                  unit: event.target.value,
                });
              }}
            >
              {units.map((unit, index) => {
                return (
                  <MenuItem key={index} value={unit}>
                    {unit}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Box marginLeft="5%">
            <IconButton onClick={() => handleAddIngredient()}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => handleCancelAddIngredient()}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
export default MenuFormNewIngredient;
