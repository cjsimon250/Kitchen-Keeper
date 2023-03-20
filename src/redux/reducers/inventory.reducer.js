const inventory = (state = [], action) => {
  switch (action.type) {
    case "SET_INVENTORY":
      return action.payload;
    default:
      return state;
  }
};

export default inventory;
