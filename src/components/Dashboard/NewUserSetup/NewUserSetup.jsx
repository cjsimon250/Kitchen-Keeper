import { useSelector } from "react-redux";
import NewUserWelcome from "./NewUserWelcome";
import AddToInventoryForm from "../../Forms/AddToInventoryForm";
import AddToMenuForm from "../../Forms/AddToMenuForm";

function NewUserSetup() {
  //variables for which scene is showing in the dialog box
  const showInitialWelcome = useSelector(
    (store) => store.conditionalForms.showInitialWelcome
  );
  const showAddToInventoryForm = useSelector(
    (store) => store.conditionalForms.showAddToInventoryForm
  );
  const showAddToMenuForm = useSelector(
    (store) => store.conditionalForms.showAddToMenuForm
  );

  function handleDialogContents() {
    switch (true) {
      case showInitialWelcome:
        return <NewUserWelcome />;
      case showAddToInventoryForm:
        return <AddToInventoryForm />;
      case showAddToMenuForm:
        return <AddToMenuForm />;
      default:
        return null;
    }
  }

  return <>{handleDialogContents()}</>;
}

export default NewUserSetup;
