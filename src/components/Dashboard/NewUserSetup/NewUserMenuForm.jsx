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
import Select from "@mui/material/Select";
import { FormControl, FormControlLabel, FormLabel, Radio } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";

function NewUserMenuForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Variable to show whether the add contact form is showing
  const showMenuForm = useSelector(
    (store) => store.newUserSetup.showInitialMenuForm
  );

  //Variable for storing ingredients previously added by user
  const ingredients = useSelector((store) => store.inventory);

  //Variable for storing the single ingredient object that will then be added to
  //menuItemToSend.ingredientInformation array
  const [ingredientObject, setIngredientObject] = useState({
    ingredientName: "",
    quantity: 1,
    unit: "Lb",
  });

  //Variable for storing dish to send to database
  // **These to values are set so that on first render they are considered controlled**
  const [menuItemToSend, setMenuItemToSend] = useState({
    dish: "",
    image: "",
    price: 0,
    ingredients: [],
  });

  //Function to close the add contact form via redux
  const handleClose = () => {
    dispatch({
      type: "SET_SHOW_INITIAL_MENU_FORM",
      payload: false,
    });
  };

  //Function for returning a MenuItem of all previously added ingredients
  //for the user to select from
  function showAllIngredients() {
    return ingredients.map((ingredient) => (
      <MenuItem key={ingredient.id} value={ingredient.item}>
        {ingredient.item}
      </MenuItem>
    ));
  }

  //Function to handle the adding new ingredient
  function handleAddIngredient() {
    //Adding the current ingredientObject to the ingredients array
    setMenuItemToSend({
      ...menuItemToSend,
      ingredients: [...menuItemToSend.ingredients, ingredientObject],
    });

    //Clearing the ingredient object
    setIngredientObject({
      ingredientName: "",
      quantity: 0,
      unit: "Lb",
    });
  }

  //Function to display previously added ingredients to the user

  function displayAddedIngredients() {
    return menuItemToSend.ingredients.map((ingredient) => {
      return (
        <Box key={ingredient.ingredientName}>
          <li>
            Ingredient: {ingredient.ingredientName} Quantity:{" "}
            {ingredient.quantity} {ingredient.unit}
          </li>
        </Box>
      );
    });
  }

  //Function to add the dish to the data base
  function handlePostMenuItem() {
    //Posting to the database
    dispatch({
      type: "POST_MENU",
      payload: menuItemToSend,
    });

    //Clearing all inputs and ingredients list
    setMenuItemToSend({
      dish: "",
      image: "",
      price: 0,
      ingredients: [],
    });
  }

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
            backgroundColor: colors.greenAccent[500],
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
            value={menuItemToSend.dish}
            onChange={(event) =>
              setMenuItemToSend({
                ...menuItemToSend,
                dish: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Image URL"
            type="text"
            fullWidth
            variant="standard"
            value={menuItemToSend.image}
            onChange={(event) =>
              setMenuItemToSend({
                ...menuItemToSend,
                image: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price of Dish"
            type="number"
            variant="standard"
            inputProps={{ min: 0 }}
            value={menuItemToSend.price}
            onChange={(event) =>
              setMenuItemToSend({
                ...menuItemToSend,
                price: event.target.value,
              })
            }
          />
          <Box display="inline-flex">
            {/* Selecting from list of previously added ingredients */}
            <FormControl sx={{ mt: "10px" }}>
              <InputLabel>Ingredient</InputLabel>
              <Select
                margin="dense"
                id="quantity"
                label="Ingredient Name"
                value={ingredientObject.ingredientName}
                onChange={(event) =>
                  setIngredientObject({
                    ...ingredientObject,
                    ingredientName: event.target.value,
                  })
                }
              >
                {/* Mappng through all previously added ingredients to show options*/}
                {showAllIngredients()}
              </Select>
              <TextField
                autoFocus
                margin="dense"
                id="quantity"
                label="Quantity In Dish"
                type="number"
                variant="standard"
                inputProps={{ min: 1 }}
                value={ingredientObject.quantity}
                onChange={(event) =>
                  setIngredientObject({
                    ...ingredientObject,
                    quantity: event.target.value,
                  })
                }
              />

              <Box sx={{ mt: "10px", ml: "30px" }}>
                <FormLabel id="access">Unit of Measurement</FormLabel>
                <RadioGroup
                  row
                  defaultValue="Lb"
                  name="access-radio-btn-group"
                  value={ingredientObject.unit}
                  onChange={(event) =>
                    setIngredientObject({
                      ...ingredientObject,
                      unit: event.target.value,
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
              </Box>
            </FormControl>
          </Box>
          {/* Displaying a list of previously added ingredients */}
          <DialogTitle variant="h5" color={colors.greenAccent[400]}>
            Added Ingredients:
          </DialogTitle>
          <ul>{displayAddedIngredients()}</ul>
        </DialogContent>
        <DialogActions>
          <Button id="add-btn" onClick={handleAddIngredient}>
            Add Ingredient
          </Button>
          <Button id="cancel-btn" onClick={handlePostMenuItem}>
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
