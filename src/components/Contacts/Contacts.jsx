import Header from "../Header/Header";
import { useState } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { Button } from "@mui/material";
import AddContactsForm from "./AddContactsForm";
import { useDispatch } from "react-redux";

const Contacts = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //variables for toggling the delete column and button text
  const [deleteIsVisbile, setDeleteIsVisible] = useState(true);
  const [deleteButtonText, setDeleteButtonText] =
    useState("Delete Team Member");

  //function to handle toggling the delete column
  const handleToggleDeleteColumn = () => {
    setDeleteIsVisible(!deleteIsVisbile);
    setDeleteButtonText(
      deleteIsVisbile ? "Hide Delete Column" : "Delete Contact"
    );
  };

  //function to show the add contact form via redux
  const handleShowAddContactForm = () => {
    dispatch({
      type: "SET_SHOW_CONTACTS_FORM",
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
      field: "name",
      headerName: "Name",
      // flex is allowing the cells to grow
      flex: 1,
      cellClassName: "name-column-cell",
      editable: true,
    },
    {
      field: "email",
      headerName: "E-Mail",
      flex: 1,
      cellClassName: "email-column-cell",
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.75,
      cellClassName: "phone-column-cell",
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      cellClassName: "address-column-cell",
      editable: true,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      cellClassName: "company-column-cell",
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
      <Header title="CONTACTS" subtitle="Wow! You're popular" />
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
          "& .company-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .phone-column-cell": {
            color: colors.orangeAccent[400],
          },
          "& .name-column-cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiButton-sizeMedium": {
            backgroundColor: colors.orangeAccent[500],
            p: "3px",
          },
          "& .MuiButton-sizeMedium:hover": {
            backgroundColor: colors.orangeAccent[700],
          },
        }}
      >
        <DataGrid
          //mui api to allow editing on each cell
          experimentalFeatures={{ newEditingApi: true }}
          rows={mockDataContacts}
          columns={columns}
        />
        <Box display="flex" justifyContent="space-between" alignItems="right">
          <Button
            sx={{ mt: "2.5px" }}
            onClick={() => {
              handleShowAddContactForm();
            }}
          >
            Add Contact
          </Button>
          <Button
            sx={{ mt: "2.5px" }}
            onClick={() => {
              handleToggleDeleteColumn();
            }}
          >
            {deleteButtonText}
          </Button>
        </Box>
        <AddContactsForm />
      </Box>
    </Box>
  );
};

export default Contacts;

// ** THIS IS NEEDED TO SAVE DATA AFTER TABLE EDIT **
// const processRowUpdate = (newRow) => {
//   const updatedRow = { ...newRow, isNew: false };
//   ...
//   return updatedRow;
// };

// <DataGrid
//   editMode="row"
//   processRowUpdate={processRowUpdate}
//   experimentalFeatures={{ newEditingApi: true }}
//   ...
