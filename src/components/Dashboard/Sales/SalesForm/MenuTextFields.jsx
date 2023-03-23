import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Box, useTheme } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import { Button, IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";

function MenuTextFields() {
  const dispatch = useDispatch();

  const dishes = useSelector((store) => store.menu.menu);

  const [salesToSend, setSalesToSend] = useState({
    date: "",
  });

  //Fetch dishes on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_MENU",
    });
  }, []);

  //Function to send sales data to the data base
  async function handlePostSales() {
    await axios.post("/api/sales", salesToSend);

    setSalesToSend({
      date: "",
    });
  }
  return (
    <Box width="100%">
      <TextField
        autoFocus
        id="order-date"
        type="date"
        variant="outlined"
        fullWidth
        value={salesToSend.date}
        onChange={(event) => {
          setSalesToSend({
            ...salesToSend,
            date: event.target.value,
          });
        }}
      />
      {dishes.map((dish, index) => {
        return (
          <Box key={index} width="100%">
            <TextField
              value={
                salesToSend.dishes?.[dish.dish]?.quantitySold
                  ? salesToSend.dishes?.[dish.dish].quantitySold
                  : ""
              }
              autoFocus
              label={dish.dish}
              type="number"
              variant="outlined"
              inputProps={{ min: 0 }}
              fullWidth
              onChange={(event) => {
                setSalesToSend({
                  ...salesToSend,
                  dishes: {
                    ...salesToSend.dishes,
                    [dish.dish]: {
                      quantitySold: Number(event.target.value),
                      menuId: dish.id,
                    },
                  },
                });
              }}
            />
          </Box>
        );
      })}
      <Button
        onClick={() => {
          handlePostSales();
        }}
      >
        Post Sales
      </Button>
    </Box>
  );
}

export default MenuTextFields;
