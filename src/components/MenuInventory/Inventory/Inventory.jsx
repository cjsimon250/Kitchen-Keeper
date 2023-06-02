import axios from "axios";
import { useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddToInventoryForm from "../../Forms/AddToInventoryForm";
import { useDispatch, useSelector } from "react-redux";

const Inventory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  //User's inventory
  const inventory = useSelector((store) => store.inventory);

  //Fetch user's inventory on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_INVENTORY",
    });
  }, []);

  //Function for handling deleting a row
  async function handleDelete(event, cellValues) {
    let rowToDelete = cellValues.row;
    try {
      await axios.delete(`/api/inventory/${rowToDelete.id}`);
      dispatch({
        type: "FETCH_INVENTORY",
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Function to handle editing a cell
  async function handleEditCell(params) {
    try {
      await axios.put(`/api/inventory/${params.id}`, params);
      dispatch({
        type: "FETCH_INVENTORY",
      });
    } catch (error) {
      console.log(error);
    }
  }

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
        width="62vw"
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
          rows={inventory}
          columns={columns}
          onCellEditCommit={(params) => handleEditCell(params)}
        />
        <AddToInventoryForm />
      </Box>
    </Box>
  );
};

export default Inventory;
