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

export default combineReducers({
  menu,
  editMenuItemForm,
});
