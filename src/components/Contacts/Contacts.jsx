import Header from "../Header/Header";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import AddContactsForm from "./AddContactsForm";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const Contacts = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        <Tooltip
          placement="top"
          arrow
          title={<Typography fontSize="1.3em">Add New Contact</Typography>}
        >
          <IconButton
            sx={{
              mb: "2.5px",
              color: `${colors.orangeAccent[500]}`,
              position: "absolute",
              right: "3%",
              top: "15%",
            }}
            onClick={() => {
              handleShowAddContactForm();
            }}
          >
            <AddIcon style={{ fontSize: "1.5em" }} />
          </IconButton>
        </Tooltip>
        <DataGrid
          //mui api to allow editing on each cell
          experimentalFeatures={{ newEditingApi: true }}
          rows={mockDataContacts}
          columns={columns}
        />
        <AddContactsForm />
      </Box>
    </Box>
  );
};

export default Contacts;
