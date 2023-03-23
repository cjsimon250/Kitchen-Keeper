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

  return (
    <Box
      width="20vw"
      height="40vh"
      backgroundColor={colors.khakiAccent[500]}
      borderRadius="10px"
    >
      <Typography variant="h3" textAlign="center" color={colors.primary[500]}>
        Notifications
      </Typography>
      {lowStockItems.map((lowStockItem, index) => {
        return (
          <Typography
            variant="h3"
            textAlign="center"
            color={colors.primary[500]}
            key={index}
          >
            {lowStockItem.item}
          </Typography>
        );
      })}
    </Box>
  );
}

export default Notifications;
