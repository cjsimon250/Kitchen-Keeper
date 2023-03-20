import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";
import { Typography, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import OrdersFormItemList from "./OrdersFormItemList";

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
  async function handleAddOrder() {
    await axios.post("/api/orders", orderToSend);

    //Clear inputs
    setOrderToSend({
      supplier: "",
      date: "",
      inventoryItems: [],
    });
  }
  return (
    <Box
      width="30vw"
      height="60vh"
      borderRadius="1%"
      sx={{ backgroundColor: `${colors.khakiAccent[600]}` }}
    >
      <Typography variant="h3">Add New Order</Typography>
      <TextField
        autoFocus
        id="order-date"
        type="date"
        variant="outlined"
        fullWidth
        value={orderToSend.date}
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
        onChange={(event) => {
          setOrderToSend({
            ...orderToSend,
            supplier: event.target.value,
          });
        }}
      />
      <FormControl>
        <InputLabel>Inventory Item</InputLabel>
        <Select
          variant="outlined"
          value={inventoryItem.item}
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
        </Select>
      </FormControl>

      <TextField
        autoFocus
        label="Quantity"
        type="number"
        variant="outlined"
        inputProps={{ min: 1 }}
        value={inventoryItem.quantity}
        onChange={(event) => {
          setInventoryItem({
            ...inventoryItem,
            quantity: event.target.value,
          });
        }}
      />
      <FormControl>
        <InputLabel>Unit</InputLabel>
        <Select
          variant="outlined"
          value={inventoryItem.unit}
          style={{ width: "100%" }}
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
        </Select>
      </FormControl>
      <IconButton
        onClick={() => {
          handleAddInventoryItem();
        }}
      >
        <AddIcon />
      </IconButton>
      <ul>
        {orderToSend.inventoryItems.map((item, index) => {
          console.log("INVENTORY ITEMS :", orderToSend);
          return (
            <li key={index}>
              {item.item}: {item.quantity} {item.unit}
            </li>
          );
        })}
      </ul>
      <Button
        onClick={() => {
          handleAddOrder();
        }}
      >
        Add Order
      </Button>
    </Box>
  );
}

export default OrdersTable;
