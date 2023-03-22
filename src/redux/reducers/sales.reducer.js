// * Reducer for holding the company of the user
const sales = (state = [], action) => {
  switch (action.type) {
    case "SET_SALES_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default sales;
