const inventory = (state = [], action) => {
  switch (action.type) {
    case "SET_INVENTORY":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default inventory;
