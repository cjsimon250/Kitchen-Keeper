import { combineReducers } from "redux";

// * Reducer for displaying form to populate Inventory
// const showInitialWelcome = (state = false, action) => {
//   switch (action.type) {
//     case "SET_SHOW_INITIAL_WELCOME":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// * Reducer for displaying form to populate Inventory
// const showInitialInventoryForm = (state = false, action) => {
//   switch (action.type) {
//     case "SET_SHOW_INITIAL_INVENTORY_FORM":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// // * Reducer for displaying form to populate Menu
// const showInitialMenuForm = (state = false, action) => {
//   switch (action.type) {
//     case "SET_SHOW_INITIAL_MENU_FORM":
//       return action.payload;
//     default:
//       return state;
//   }
// };
const conditionalForms = (
  state = {
    showInitialWelcome: false,
    showAddToInventoryForm: false,
    showAddToMenuForm: false,
  },
  action
) => {
  switch (action.type) {
    case "SET_SHOW_INITIAL_WELCOME":
      return {
        showInitialWelcome: action.payload,
        showAddToInventoryForm: false,
        showAddToMenuForm: false,
      };
    case "SET_SHOW_ADD_TO_MENU_FORM":
      return {
        showInitialWelcome: false,
        showAddToInventoryForm: false,
        showAddToMenuForm: action.payload,
      };
    case "SET_SHOW_ADD_TO_INVENTORY_FORM":
      return {
        showInitialWelcome: false,
        showAddToInventoryForm: action.payload,
        showAddToMenuForm: false,
      };

    default:
      return state;
  }
};

export default conditionalForms;
