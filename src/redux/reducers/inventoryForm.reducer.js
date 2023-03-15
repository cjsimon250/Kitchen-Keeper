// * Reducer for displaying Inventory form
const showInventoryForm = (state = false, action) => {
  switch (action.type) {
    case "SET_SHOW_INVENTORY_FORM":
      return action.payload;
    default:
      return state;
  }
};

export default showInventoryForm;
