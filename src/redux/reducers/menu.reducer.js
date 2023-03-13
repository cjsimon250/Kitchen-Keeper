const menu = (state = [], action) => {
  switch (action.type) {
    case "SET_MENU":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default menu;
