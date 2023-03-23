import { Box, useTheme } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { tokens } from "../../../theme";

function Notifications() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //All low stock inventory items
  const lowStockItems = useSelector((store) => store.notifications);

  //Fetch notifications on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_NOTIFICATIONS",
    });
  }, []);

  return (
    <Box
      width="20vw"
      height="40vh"
      backgroundColor={colors.khakiAccent[500]}
      borderRadius="10px"
      sx={{ border: `10px solid ${colors.khakiAccent[700]}`, overflow: "auto" }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        pt="3%"
        color={colors.greenAccent[700]}
      >
        Notifications
      </Typography>
      <Box mt="5%">
        {lowStockItems.length > 0 ? (
          lowStockItems.map((lowStockItem, index) => {
            return (
              <Typography
                variant="subtitle1"
                textAlign="center"
                color={colors.primary[500]}
                key={index}
                mt="5%"
              >
                You're low on {lowStockItem.item}. Only {lowStockItem.quantity}{" "}
                {lowStockItem.unit} left in stock!
              </Typography>
            );
          })
        ) : (
          <Typography
            variant="subtitle1"
            textAlign="center"
            color={colors.primary[500]}
            mt="5%"
          >
            No New Notifications!
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Notifications;
