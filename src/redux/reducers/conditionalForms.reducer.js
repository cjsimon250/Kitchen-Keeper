const conditionalForms = (
  state = {
    showInitialWelcome: false,
    showAddToInventoryForm: false,
    showAddToMenuForm: false,
    showOrderDetails: false,
  },
  action
) => {
  switch (action.type) {
    case "SET_SHOW_INITIAL_WELCOME":
      return {
        ...state,
        showInitialWelcome: action.payload,
      };
    case "SET_SHOW_ADD_TO_MENU_FORM":
      return {
        ...state,
        showAddToMenuForm: action.payload,
      };
    case "SET_SHOW_ADD_TO_INVENTORY_FORM":
      return {
        ...state,
        showAddToInventoryForm: action.payload,
      };
    case "SET_SHOW_ORDER_DETAILS":
      return {
        ...state,
        showOrderDetails: action.payload,
      };
    default:
      return state;
  }
};

export default conditionalForms;
