// * Reducer for holding the company of the user
const sales = (
  state = {
    yearSales: [],
    weekSales: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_YEARS_SALES_DATA":
      return { ...state, yearSales: action.payload };
    case "SET_WEEKS_SALES_DATA":
      return { ...state, weekSales: action.payload };
    default:
      return state;
  }
};

export default sales;
