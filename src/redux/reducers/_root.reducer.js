import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import showTeamForm from "./teamForm.reducer";
import showContactsForm from "./contactsForm.reducer";
import inventory from "./inventory.reducer";
import newUserSetup from "./newUserSetup.reducer";
import company from "./company.reducer";
import menu from "./menu.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // Contains registrationMessage and loginMessage
  user, // Will have an id and username if someone is logged in
  company, //Allows access to the user's company information
  showTeamForm, // Will be able to toggle the team form
  showContactsForm, //Will be able to toggle the contacts form
  inventory, //Allows access to the inventory
  menu, //Storing data for Menu component
  newUserSetup, //Storing the state of the new user dialogs (open or not)
});

export default rootReducer;
