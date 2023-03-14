import { combineReducers } from "redux";

const menu = (state = [], action) => {
  switch (action.type) {
    case "SET_MENU":
      return action.payload;
    default:
      return state;
  }
};

// * Reducer for displaying Menu form
const showEditMenuItemForm = (state = false, action) => {
  switch (action.type) {
    case "SHOW_MENU_FORM":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  menu,
  showEditMenuItemForm,
});
