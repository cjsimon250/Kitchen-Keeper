import { useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import OrderDetailDialog from "./OrderDetailDialog";
import dayjs from "dayjs";

function OrdersTable() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //User's past orders
  const orders = useSelector((store) => store.orders.orders);

  //Fetch user's orders and inventory on page load for form
  useEffect(() => {
    dispatch({
      type: "FETCH_ORDERS",
    });
  }, []);

  //Function for handling deleting a row
  async function handleDelete(event, cellValues) {
    let rowToDelete = cellValues.row;
    dispatch({ type: "DELETE_ORDER", payload: rowToDelete.id });
  }

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
          // let dateArr = order.date.split(`T`);
          order.date = dayjs(order.date).format("MMMM D, YYYY");
        });
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      cellClassName: "unit-column-cell",
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Box display="flex" justifyContent="space-between">
            <IconButton
              variant="contained"
              onClick={() => {
                dispatch({ type: "SET_SHOW_ORDER_DETAILS", payload: true });

                dispatch({
                  type: "SET_SELECTED_ORDER",
                  payload: cellValues.row,
                });
              }}
            >
              {" "}
              <VisibilityOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={(event) => {
                handleDelete(event, cellValues);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Box>
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
      width="55vw"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: `${
            theme.palette.mode === "light"
              ? colors.khakiAccent[900]
              : colors.khakiAccent[700]
          }`,
          fontSize: "0.9rem",
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: colors.khakiAccent[800],
          fontSize: "0.9rem",
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
      <DataGrid rows={orders} columns={columns} />
      <OrderDetailDialog />
    </Box>
  );
}

export default OrdersTable;
