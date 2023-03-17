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
      id: null,
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
        menuItem: {
          ...state.menuItem,
          ingredients: [...state.menuItem.ingredients, action.payload],
        },
      };
    case "DELETE_INGREDIENT":
      return {
        ...state,
        menuItem: {
          ...state.menuItem,
          ingredients: [
            ...state.menuItem.ingredients.filter(
              (ingredient) => ingredient.item !== action.payload
            ),
          ],
        },
      };
    default:
      return state;
  }
};
export default combineReducers({
  menu,
  editMenuItemForm,
});
