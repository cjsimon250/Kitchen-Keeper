import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";
import { Typography, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

function OrdersTable() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //Array of available units of mesurement to map through
  const units = ["Lb", "Oz", "Gal", "Fl. Oz"];

  //All of the user's inventory to choose from
  const inventory = useSelector((store) => store.inventory);

  //New order to send to the database
  const [orderToSend, setOrderToSend] = useState({
    supplier: "",
    date: "",
    inventoryItems: [],
  });

  //Inventory item to add into orderToSend
  const [inventoryItem, setInventoryItem] = useState({
    inventoryId: null,
    item: "",
    quantity: 1,
    unit: "",
  });

  useEffect(() => {
    dispatch({
      type: "FETCH_INVENTORY",
    });
  }, []);

  //Function to handle adding a new inventory item
  function handleAddInventoryItem() {
    //Adding new object to the array
    setOrderToSend({
      ...orderToSend,
      inventoryItems: [...orderToSend.inventoryItems, inventoryItem],
    });
    //Resetting inventoryItem
    setInventoryItem({
      inventoryId: null,
      item: "",
      quantity: 1,
      unit: "",
    });
  }
  //Function to order to the database
  function handleAddOrder() {
    dispatch({ type: "POST_ORDER", payload: orderToSend });

    //Clear inputs
    setOrderToSend({
      supplier: "",
      date: "",
      inventoryItems: [],
    });
  }
  return (
    <Box
      width="25vw"
      height="52vh"
      borderRadius="2%"
      sx={{
        mt: "5vh",
        overflowY: "auto",
        backgroundColor: `${colors.khakiAccent[700]}`,
        boxShadow: "8px 8px 12px rgba(0,0,0,0.4)",
        "& .MuiButton-sizeMedium": {
          width: "30vw",
          backgroundColor: colors.greenAccent[600],
        },
        "& .MuiButton-sizeMedium:hover": {
          backgroundColor: colors.greenAccent[700],
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: colors.greenAccent[400],
          textAlign: "center",
          mt: "4%",
          mb: "12%",
        }}
      >
        Add New Order
      </Typography>
      <TextField
        autoFocus
        id="order-date"
        type="date"
        variant="outlined"
        fullWidth
        value={orderToSend.date}
        sx={{ ml: "5%", width: "90%" }}
        m="auto"
        onChange={(event) => {
          setOrderToSend({
            ...orderToSend,
            date: event.target.value,
          });
        }}
      />
      <TextField
        autoFocus
        label="Supplier"
        type="text"
        variant="outlined"
        fullWidth
        value={orderToSend.supplier}
        sx={{ ml: "5%", mt: "5%", width: "90%" }}
        onChange={(event) => {
          setOrderToSend({
            ...orderToSend,
            supplier: event.target.value,
          });
        }}
      />
      <Box
        mt="5%"
        display="flex"
        justifyContent="space-evenly"
        width="90%"
        ml="3.5%"
      >
        <TextField
          variant="outlined"
          value={inventoryItem.item}
          select
          sx={{ width: "40%" }}
          label="Inventory Item"
          onChange={(event) => {
            const selectedValue = event.target.value;
            //Find the id of the inventory item
            const selectedIngredient = inventory.find(
              (ingredient) => ingredient.item === selectedValue
            );
            setInventoryItem({
              ...inventoryItem,
              item: selectedValue,
              inventoryId: selectedIngredient.id,
            });
          }}
        >
          {inventory.map((ingredient) => {
            return (
              <MenuItem key={ingredient.id} value={ingredient.item}>
                {ingredient.item}
              </MenuItem>
            );
          })}
        </TextField>

        <TextField
          autoFocus
          label="Quantity"
          type="number"
          variant="outlined"
          inputProps={{ min: 1 }}
          sx={{ width: "20%" }}
          value={inventoryItem.quantity}
          onChange={(event) => {
            setInventoryItem({
              ...inventoryItem,
              quantity: event.target.value,
            });
          }}
        />
        <TextField
          variant="outlined"
          value={inventoryItem.unit}
          sx={{ width: "20%" }}
          label="Unit"
          select
          onChange={(event) => {
            setInventoryItem({
              ...inventoryItem,
              unit: event.target.value,
            });
          }}
        >
          {units.map((unit, index) => {
            return (
              <MenuItem key={index} value={unit}>
                {unit}
              </MenuItem>
            );
          })}
        </TextField>
        <IconButton
          id="add-ingredient-btn"
          width="10%"
          onClick={() => {
            handleAddInventoryItem();
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <ul>
        {orderToSend.inventoryItems.map((item, index) => {
          return (
            <li key={index}>
              {item.item}: {item.quantity} {item.unit}
            </li>
          );
        })}
      </ul>
      <Box display="flex" justifyContent="flex-end">
        <Button
          display="flex"
          justifyContent="flex-end"
          sx={{ mr: "5%", position: "relative", mt: "25%", mb: "3%" }}
          style={{ width: "25%" }}
          onClick={() => {
            handleAddOrder();
          }}
        >
          Add Order
        </Button>
      </Box>
    </Box>
  );
}

export default OrdersTable;
