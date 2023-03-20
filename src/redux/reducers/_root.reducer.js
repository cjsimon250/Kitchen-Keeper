import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import showTeamForm from "./teamForm.reducer";
import showContactsForm from "./contactsForm.reducer";
import inventory from "./inventory.reducer";
import company from "./company.reducer";
import menu from "./menu.reducer";
import conditionalForms from "./conditionalForms.reducer";
import orders from "./orders.reducer";
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
  conditionalForms, // All conditionally rendered forms
  orders, //All of the user's past orders
});

export default rootReducer;
