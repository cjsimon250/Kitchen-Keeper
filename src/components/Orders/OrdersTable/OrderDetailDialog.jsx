import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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

  return (
    <Box>
      <Dialog open={showDetails}>
        <DialogTitle variant="h4" color={colors.greenAccent[400]}>
          Order Details
        </DialogTitle>
      </Dialog>
    </Box>
  );
}

export default OrderDetailDialog;
