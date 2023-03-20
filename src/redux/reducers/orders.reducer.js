const orders = (state = [], action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return action.payload;
    case "ADD_ORDER":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default orders;
