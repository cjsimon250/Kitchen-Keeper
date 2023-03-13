// * Reducer for displaying Team form
const showTeamForm = (state = false, action) => {
  switch (action.type) {
    case "SET_SHOW_TEAM_FORM":
      return action.payload;
    default:
      return state;
  }
};

export default showTeamForm;
