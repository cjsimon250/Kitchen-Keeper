// * Reducer for holding the company of the user
const showTeamForm = (state = false, action) => {
  switch (action.type) {
    case "SET_COMPANY":
      return action.payload;
    default:
      return state;
  }
};

export default showTeamForm;
