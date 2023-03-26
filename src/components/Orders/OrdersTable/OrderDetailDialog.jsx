import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";

function OrderDetailDialog() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Variable for whether the dialog box is showing or not
  const showDetails = useSelector(
    (store) => store.conditionalForms.showOrderDetails
  );
  //Variable to hold the selected orders data
  const selectedOrder = useSelector((store) => store.orders.selectedOrder);

  //Function to close the add contact form via redux
  const handleClose = () => {
    dispatch({
      type: "SET_SHOW_ORDER_DETAILS",
      payload: false,
    });
  };
  return (
    <Box style={{ width: "100%" }}>
      <Dialog
        open={showDetails}
        onClose={handleClose}
        fullWidth
        sx={{
          "& #close-btn:hover": {
            color: colors.orangeAccent[500],
          },
        }}
      >
        <DialogTitle
          variant="h4"
          color={colors.greenAccent[400]}
          display="flex"
          justifyContent="space-between"
        >
          {selectedOrder.supplier} {selectedOrder.date}
          <IconButton
            id="close-btn"
            sx={{ ml: "5%" }}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <ul>
            {selectedOrder.orderDetails.length > 0 &&
              selectedOrder.orderDetails.map((item, index) => {
                return (
                  <li key={index}>
                    {item.item}: {item.quantity} {item.unit}
                  </li>
                );
              })}
          </ul>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default OrderDetailDialog;
