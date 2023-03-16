import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

//Function to handle displaying all current ingredients with delete
//buttons for each
function IngredientsList() {
  const selectedMenuItem = useSelector(
    //Array of ingredients data of the for the selected menu Items
    (store) => store.menu.editMenuItemForm.menuItem
  );

  //Variable holding the data to send to menu database
  const [updatedIngredientsToSend, setUpdatedIngredientsToSend] = useState({
    ingredients: selectedMenuItem?.ingredients || [],
  });

  useEffect(() => {}, [updatedIngredientsToSend]);

  //Function to handle deleteing an ingredient
  const handleDeleteIngredient = async (selectedId) => {
    await axios.delete(`/api/menu/${selectedId}`);

    // Update the state of updatedIngredientsToSend by removing the deleted ingredient
    setUpdatedIngredientsToSend((updatedIngredientsToSend) => [
      updatedIngredientsToSend.ingredients.filter(
        (item) => item.menuInventoryId !== selectedId
      ),
    ]);
  };
  return selectedMenuItem?.ingredients?.map((item) => {
    return (
      <Box
        display="flex"
        justifyContent="space-between"
        marginTop="10px"
        key={item.menuInventoryId}
      >
        <li>
          {item.item}: {item.quantity} {item.unit}
        </li>
        <Button
          className="delete-btns"
          onClick={() => handleDeleteIngredient(item.menuInventoryId)}
        >
          Delete
        </Button>
      </Box>
    );
  });
}

export default IngredientsList;
