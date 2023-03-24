import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../../theme";
import { Button } from "@mui/material";

function MenuTextFields() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
  function handlePostSales() {
    axios.post("/api/sales", salesToSend).then((response) => {
      //Sending the low stock items to the notifications reducer
      dispatch({
        type: "SET_NOTIFICATIONS",
        payload: response.data,
      });
    });

    //Clear sales to send
    setSalesToSend({
      date: "",
    });

    //Close Form
    dispatch({
      type: "SET_SHOW_SALES_FORM",
      payload: false,
    });
  }
  return (
    <Box
      width="100%"
      sx={{
        "& .MuiButton-sizeMedium": {
          backgroundColor: colors.greenAccent[500],
        },
      }}
    >
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
          <Box key={index} width="100%" mt="5%">
            <TextField
              value={
                salesToSend.dishes?.[dish.dish]?.quantitySold
                  ? salesToSend.dishes?.[dish.dish].quantitySold
                  : ""
              }
              autoFocus
              label={dish.dish}
              type="number"
              variant="standard"
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
        sx={{
          marginTop: "4%",
          ml: "70%",
        }}
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
