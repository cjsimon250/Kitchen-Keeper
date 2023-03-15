import Header from "../Header/Header";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AddInventoryForm from "./AddInventoryForm";

const Inventory = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Fetch user's inventory on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_INVENTORY",
    });
  }, [inventory]);

  //User's inventory
  const inventory = useSelector((store) => store.inventory);

  //Variables for toggling the delete column and button text
  const [deleteIsVisbile, setDeleteIsVisible] = useState(true);
  const [deleteButtonText, setDeleteButtonText] = useState(
    "Delete Inventory Item"
  );

  //Function to handle toggling the delete column
  const handleToggleDeleteColumn = () => {
    setDeleteIsVisible(!deleteIsVisbile);
    setDeleteButtonText(
      deleteIsVisbile ? "Hide Delete Column" : "Delete Inventory Item"
    );
  };

  //function to show the add contact form via redux
  const handleShowAddTeamMemberForm = () => {
    dispatch({
      type: "SET_SHOW_INVENTORY_FORM",
      payload: true,
    });
  };

  //function for handling deleting a row
  function handleDelete(event, cellValues) {
    let rowToDelete = cellValues.row;

    console.log(rowToDelete);
  }

  //for every row this grabs the value from the key to put into the "headerName" column
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
      field: "quantitiy",
      headerName: "Quantity In Stock",
      flex: 1,
      cellClassName: "quantity-column-cell",
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 0.1,
      cellClassName: "phone-column-cell",
      editable: true,
    },
    {
      field: "access",
      headerName: "Access",
      flex: 1,
      cellClassName: "access-column-cell",
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
          "& .phone-column-cell": {
            color: colors.orangeAccent[400],
          },
          "& .name-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiButton-sizeMedium": {
            p: "3px",
            backgroundColor: colors.orangeAccent[500],
          },
          "& .MuiButton-sizeMedium:hover": {
            backgroundColor: colors.orangeAccent[700],
          },
        }}
      >
        <DataGrid
          //mui api to allow editing on each cell
          experimentalFeatures={{ newEditingApi: true }}
          rows={mockDataTeam}
          columns={columns}
        />
        <Box display="flex" justifyContent="space-between">
          <Button
            sx={{ mt: "10px" }}
            onClick={() => {
              handleShowAddTeamMemberForm();
            }}
          >
            Add Inventory Item
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
        <AddInventoryForm />
      </Box>
    </Box>
  );
};

export default Inventory;
