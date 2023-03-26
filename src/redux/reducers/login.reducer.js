//Reducer for login page to determine whether to show
//registration form or login form
const alreadyUser = (state = false, action) => {
  switch (action.type) {
    case "SET_IS_USER":
      return action.payload;
    default:
      return state;
  }
};

export default alreadyUser;
