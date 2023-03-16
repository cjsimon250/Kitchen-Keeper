import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function MenuFormNewIngredient() {
  const dispatch = useDispatch();
  //All of the user's inventory to choose from
  const inventory = useSelector((store) => store.inventory);
  //Initial values for new ingredient options

  //Object that holds new ingredients to add and whether the inputs to add
  //a new ingredient are showing
  const newIngredient = useSelector((store) => store.menu.newIngredientInputs);

  //Fetching all of the users inventory on page load for user to select from
  useEffect(() => {
    dispatch({
      type: "FETCH_INVENTORY",
    });
  }, []);

  return (
    <>
      {newIngredient.showForm ? (
        <Box>
          {/* <InputLabel>Item</InputLabel>
          <Select>
            {inventory.map((ingredient) => {
              <MenuItem key={ingredient.id} value={ingredient.item}>
                {ingredient.item}
              </MenuItem>;
            })}
          </Select> */}
          {console.log(newIngredient)}
          <h1>Im working</h1>
        </Box>
      ) : null}
    </>
  );
}
export default MenuFormNewIngredient;
