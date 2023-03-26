import Header from "../../Header/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddToInventoryForm from "../../Forms/AddToInventoryForm";

const Inventory = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //User's inventory
  const inventory = useSelector((store) => store.inventory);

  //Fetch user's inventory on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_INVENTORY",
    });
  }, []);

  // New state variable to hold the modified inventory
  const [modifiedInventory, setModifiedInventory] = useState([]);

  //Converting Quantaties to be more readable
  useEffect(() => {
    const newInventory = inventory.map((item) => {
      let newItem = { ...item };
      if (item.unit === "Oz") {
        if ((item.quantity || item.minimumStock) >= 16) {
          newItem.quantity = item.quantity / 16;
          newItem.minimumStock = item.minimumStock / 16;
          newItem.unit = "Lb";
        }
      } else if (item.unit === "Fl. Oz") {
        if ((item.quantity || item.minimumStock) >= 128) {
          newItem.quantity = item.quantity / 128;
          newItem.minimumStock = item.minimumStock / 128;
          newItem.unit = "Gal.";
        } else if ((item.quantity || item.minimumStock) >= 16) {
          newItem.quantity = item.quantity / 16;
          newItem.minimumStock = item.minimumStock / 16;
          newItem.unit = "Fl. Oz";
        }
      }
      return newItem;
    });

    // Set the new copy of the inventory as the state
    setModifiedInventory(newInventory);
  }, [inventory]);

  //Function for handling deleting a row
  function handleDelete(event, cellValues) {
    let rowToDelete = cellValues.row;

    axios.delete(`/api/inventory/${rowToDelete.id}`).then(() => {
      dispatch({
        type: "FETCH_INVENTORY",
      });
    });
  }

  //Change the value of the item in the modified inventory array
  const handleEditCellChange = useCallback((params) => {
    const { id, field, value } = params;
    setModifiedInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }, []);

  //Handle sending the item to update to the database
  const handleEditCell = useCallback(
    (params) => {
      const { id, field, value } = params;
      const itemToBeUpdated = modifiedInventory.find((item) => item.id === id);
      itemToBeUpdated[field] = value;
      console.log(id, itemToBeUpdated);
      axios
        .put(`/api/inventory/${id}`, { payload: itemToBeUpdated })
        .then(() => {
          dispatch({
            type: "FETCH_INVENTORY",
          });
        })
        .catch((error) => {
          console.log("PUT ERROR", error);
        });
    },
    [modifiedInventory]
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
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      cellClassName: "delete-btn-column-cell",
      editable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <IconButton
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
    // HEADER
    <Box>
      <Box
        //All styling on the table and box holding it
        mt="15px"
        height="70vh"
        width="60vw"
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
        <DataGrid
          rows={modifiedInventory}
          columns={columns}
          onCellEditCommit={handleEditCell}
          onEditCellChange={handleEditCellChange}
        />
        <AddToInventoryForm />
      </Box>
    </Box>
  );
};

export default Inventory;
