import { useSelector } from "react-redux";
import NewUserWelcome from "./NewUserWelcome";
import NewUserInventoryForm from "./NewUserInventoryForm";
import NewUserMenuForm from "./NewUserMenuForm";

function NewUserSetup() {
  //variables for which scene is showing in the dialog box
  const showInitialWelcome = useSelector(
    (store) => store.newUserSetup.showInitialWelcome
  );
  const showInitialInventoryForm = useSelector(
    (store) => store.newUserSetup.showInitialInventoryForm
  );
  const showMenuForm = useSelector(
    (store) => store.newUserSetup.showInitialMenuForm
  );

  function handleDialogContents() {
    switch (true) {
      case showInitialWelcome:
        return <NewUserWelcome />;
      case showInitialInventoryForm:
        return <NewUserInventoryForm />;
      case showMenuForm:
        return <NewUserMenuForm />;
      default:
        return null;
    }
  }

  return <>{handleDialogContents()}</>;
}

export default NewUserSetup;
