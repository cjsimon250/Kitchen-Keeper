import { combineReducers } from "redux";

// * Reducer for displaying form to populate Inventory
const showInitialInventoryForm = (state = false, action) => {
  switch (action.type) {
    case "SET_SHOW_INITIAL_INVENTORY_FORM":
      return action.payload;
    default:
      return state;
  }
};

// * Reducer for displaying form to populate Menu
const showInitialMenuForm = (state = false, action) => {
  switch (action.type) {
    case "SET_SHOW_INITIAL_MENU_FORM":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  showInitialInventoryForm,
  showInitialMenuForm,
});
