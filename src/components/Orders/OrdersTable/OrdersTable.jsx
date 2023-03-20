import axios from "axios";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderDetailDialog from "./OrderDetailDialog";

function OrdersTable() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //User's past orders
  const orders = useSelector((store) => store.orders);

  //Variables for toggling the delete column and button text
  const [deleteIsVisbile, setDeleteIsVisible] = useState(true);
  const [deleteButtonText, setDeleteButtonText] = useState("Delete Orders");

  //Fetch user's orders and inventory on page load for form
  useEffect(() => {
    dispatch({
      type: "FETCH_ORDERS",
    });
  }, []);

  //Filtering through the dates to make them more readable
  // useEffect(() => {
  //   orders.forEach((order) => {
  //     let dateArr = order.date.split(`T`);
  //     order.date = dateArr[0];
  //   });
  // }, []);
  //Filtering the inventory to convert quantities and units so that they
  //are more readable
  //   useEffect(() => {
  //     inventory.forEach((item) => {
  //       if (item.unit === "Oz" && (item.quantity || item.minimumStock) > 48) {
  //         item.quantity /= 16;
  //         item.minimumStock /= 16;
  //         item.unit = "Lb";
  //       } else if (
  //         item.unit === "Fl. Oz" &&
  //         (item.quantity || item.minimumStock) > 63
  //       ) {
  //         item.quantity /= 128;
  //         item.minimumStock /= 128;
  //         item.unit = "Gal.";
  //       }
  //     });
  //   }, [inventory]);

  //Function to handle toggling the delete column
  const handleToggleDeleteColumn = () => {
    setDeleteIsVisible(!deleteIsVisbile);
    setDeleteButtonText(
      deleteIsVisbile ? "Hide Delete Column" : "Delete Orders"
    );
  };

  //Function for handling deleting a row
  function handleDelete(event, cellValues) {
    let rowToDelete = cellValues.row;
    dispatch({ type: "DELETE_ORDER", payload: rowToDelete.id });
  }

  // Function to handle updating an edited row
  //   const handleEditCell = useCallback(
  //     (params) => {
  //       // Get the corresponding database id from the hidden "id" column
  //       const id = params.id;
  //       //field is the field name in SQL
  //       const field = params.field;
  //       //Value of updated cell
  //       const value = params.value;

  //       axios.put(`/api/inventory/${id}`, {
  //         payload: { value: value, field: field },
  //       });
  //     },
  //     [inventory]
  //   );

  //For every row this grabs the value from the key to put into the "headerName" column
  const columns = [
    {
      field: "supplier",
      headerName: "Supplier",
      // flex is allowing the cells to grow
      flex: 1,
      cellClassName: "supplier-column-cell",
      editable: false,
    },
    {
      field: "date",
      headerName: "Date Recieved",
      flex: 1,
      cellClassName: "date-column-cell",
      editable: false,
      renderCell: () => {
        return orders.forEach((order) => {
          let dateArr = order.date.split(`T`);
          order.date = dateArr[0];
        });
      },
    },
    {
      field: "View",
      headerName: "Unit",
      flex: 0.5,
      cellClassName: "unit-column-cell",
      editable: false,
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            onClick={() => {
              dispatch({ type: "SET_SHOW_ORDER_DETAILS", payload: true });
            }}
          >
            {" "}
            <ExpandMoreIcon />
          </IconButton>
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      cellClassName: "delete-btn-column-cell",
      editable: false,
      hide: deleteIsVisbile,
      renderCell: (cellValues) => {
        return (
          <IconButton
            variant="contained"
            onClick={(event) => {
              handleDelete(event, cellValues);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        );
      },
    },
    { field: "id", headerName: "ID", hide: true },
  ];
  return (
    <Box
      //All styling on the table and box holding it
      paddingBottom="40px"
      height="75vh"
      width="52vw"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          fontSize: "small",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: `${
            theme.palette.mode === "light"
              ? colors.khakiAccent[900]
              : colors.khakiAccent[700]
          }`,
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: colors.khakiAccent[800],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.khakiAccent[800],
        },
        "& .unit-column-cell": {
          color: colors.orangeAccent[400],
        },
        "& .item-column-cell": {
          color: colors.greenAccent[400],
        },
        "& .MuiButton-sizeMedium": {
          backgroundColor: colors.orangeAccent[500],
        },
        "& .MuiButton-sizeMedium:hover": {
          backgroundColor: colors.orangeAccent[700],
        },
      }}
    >
      <DataGrid
        rows={orders}
        columns={columns}
        //After edit by pressing enter user updates database
        // onCellEditCommit={handleEditCell}
      />
      <Box display="flex" alignItems="right">
        <Button
          sx={{ mt: "10px" }}
          onClick={() => {
            handleToggleDeleteColumn();
          }}
        >
          {deleteButtonText}
        </Button>
      </Box>
      <OrderDetailDialog />
    </Box>
  );
}

export default OrdersTable;
