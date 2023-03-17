import { combineReducers } from "redux";

// * Reducer for holding all of the data
const menu = (state = [], action) => {
  switch (action.type) {
    case "SET_MENU":
      return action.payload;
    default:
      return state;
  }
};

// * Reducer for displaying Menu form and holding selected item data
const editMenuItemForm = (
  state = { showForm: false, menuItem: {} },
  action
) => {
  switch (action.type) {
    case "SHOW_MENU_FORM":
      return action.payload;
    default:
      return state;
  }
};

//  * Reducer for holding whether the new ingredient inputs
// are open in the form or not and what the updated ingrdients to add to the data base are
const newIngredientInputs = (
  state = { showForm: false, newIngredients: [] },
  action
) => {
  switch (action.type) {
    case "SHOW_INGREDIENT_INPUTS":
      return {
        showForm: action.payload,
        newIngredients: state.newIngredients,
      };
    case "UPDATE_INGREDIENT":
      return {
        showForm: state.showForm,
        newIngredients: [...state.newIngredients, action.payload],
      };
    default:
      return state;
  }
};

export default combineReducers({
  menu,
  editMenuItemForm,
  newIngredientInputs,
});
