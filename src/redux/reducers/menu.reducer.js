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

const editMenuItemForm = (
  state = {
    showForm: false,
    showIngredientInputs: false,
    menuItem: {
      menuId: null,
      dish: "",
      price: null,
      image: "",
      ingredients: [],
    },
  },
  action
) => {
  switch (action.type) {
    case "SHOW_MENU_FORM":
      return { ...state, showForm: action.payload };

    case "SET_SELECTED_DISH":
      return { ...state, menuItem: action.payload };
    case "SHOW_INGREDIENT_INPUTS":
      return {
        ...state,
        showIngredientInputs: action.payload,
      };
    case "UPDATE_INGREDIENTS":
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    default:
      return state;
  }
};
export default combineReducers({
  menu,
  editMenuItemForm,
});
