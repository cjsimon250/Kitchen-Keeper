// * Reducer for displaying Contacts form
const showContactsForm = (state = false, action) => {
  switch (action.type) {
    case "SET_SHOW_CONTACTS_FORM":
      return action.payload;
    default:
      return state;
  }
};

export default showContactsForm;
