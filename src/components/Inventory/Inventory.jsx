import Header from "../Header/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AddToInventoryForm from "../Forms/AddToInventoryForm";

const Inventory = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //User's inventory
  const inventory = useSelector((store) => store.inventory);

  //Variables for toggling the delete column and button text
  const [deleteIsVisbile, setDeleteIsVisible] = useState(true);
  const [deleteButtonText, setDeleteButtonText] = useState(
    "Delete Inventory Item"
  );

  //Fetch user's inventory on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_INVENTORY",
    });
  }, []);

  //Filtering the inventory to convert quantities and units so that they
  //are more readable
  useEffect(() => {
    inventory.forEach((item) => {
      if (item.unit === "Oz" && (item.quantity || item.minimumStock) > 48) {
        item.quantity /= 16;
        item.minimumStock /= 16;
        item.unit = "Lb";
      } else if (
        item.unit === "Fl. Oz" &&
        (item.quantity || item.minimumStock) > 63
      ) {
        item.quantity /= 128;
        item.minimumStock /= 128;
        item.unit = "Gal.";
      }
    });
  }, [inventory]);

  //Function to handle toggling the delete column
  const handleToggleDeleteColumn = () => {
    setDeleteIsVisible(!deleteIsVisbile);
    setDeleteButtonText(
      deleteIsVisbile ? "Hide Delete Column" : "Delete Inventory Item"
    );
  };

  //Function for handling deleting a row
  function handleDelete(event, cellValues) {
    let rowToDelete = cellValues.row;

    axios.delete(`/api/inventory/${rowToDelete.id}`).then(() => {
      dispatch({
        type: "FETCH_INVENTORY",
      });
    });
  }

  // Function to handle updating an edited row
  const handleEditCell = useCallback(
    (params) => {
      // Get the corresponding database id from the hidden "id" column
      const id = params.id;
      //field is the field name in SQL
      const field = params.field;
      //Value of updated cell
      const value = params.value;

      axios.put(`/api/inventory/${id}`, {
        payload: { value: value, field: field },
      });
    },
    [inventory]
  );

  //For every row this grabs the value from the key to put into the "headerName" column
  const columns = [
    {
      field: "item",
      headerName: "Item",
      // flex is allowing the cells to grow
      flex: 1,
      cellClassName: "item-column-cell",
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity In Stock",
      flex: 1,
      cellClassName: "quantity-column-cell",
      editable: true,
    },
    {
      field: "minimumStock",
      headerName: "Minimum Desired Stock",
      flex: 1,
      cellClassName: "minStock-column-cell",
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 0.2,
      cellClassName: "unit-column-cell",
      editable: true,
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
          <Button
            variant="contained"
            onClick={(event) => {
              handleDelete(event, cellValues);
            }}
          >
            Delete
          </Button>
        );
      },
    },
    { field: "id", headerName: "ID", hide: false },
  ];
  return (
    // HEADER
    <Box m="20px">
      <Header title="INVENTORY" subtitle="Welcome to your Inventory" />
      <Box
        //All styling on the table and box holding it
        m="40px 0 40px 0"
        paddingBottom="40px"
        height="75vh"
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
          rows={inventory}
          columns={columns}
          //After edit by pressing enter user updates database
          onCellEditCommit={handleEditCell}
        />
        <Box display="flex" justifyContent="space-between">
          <Button
            sx={{ mt: "10px" }}
            onClick={() => {
              dispatch({
                type: "SET_SHOW_ADD_TO_INVENTORY_FORM",
                payload: true,
              });
            }}
          >
            Add Inventory Items
          </Button>
          <Button
            sx={{ mt: "10px" }}
            onClick={() => {
              handleToggleDeleteColumn();
            }}
          >
            {deleteButtonText}
          </Button>
        </Box>
        <AddToInventoryForm />
      </Box>
    </Box>
  );
};

export default Inventory;
