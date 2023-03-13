// * Reducer for holding the company of the user
const company = (state = {}, action) => {
  switch (action.type) {
    case "SET_COMPANY":
      return action.payload;
    default:
      return state;
  }
};

export default company;
