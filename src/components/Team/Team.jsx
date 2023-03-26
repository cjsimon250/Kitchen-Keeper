import Header from "../Header/Header";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import AddTeamMemberForm from "./AddTeamMemberForm/AddTeamMemberForm";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const Team = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //function to show the add contact form via redux
  const handleShowAddTeamMemberForm = () => {
    dispatch({
      type: "SET_SHOW_TEAM_FORM",
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
      flex: 1,
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
    <Box m="20px">
      <Header
        title="TEAM"
        subtitle='"Many hands make light work"  -John Heywood'
      />
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
          "& .phone-column-cell": {
            color: colors.orangeAccent[400],
          },
          "& .name-column-cell": {
            color: colors.greenAccent[400],
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
        <Tooltip
          placement="top"
          arrow
          title={<Typography fontSize="1.3em">Add Team Member</Typography>}
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
              handleShowAddTeamMemberForm();
            }}
          >
            <AddIcon style={{ fontSize: "1.5em" }} />
          </IconButton>
        </Tooltip>
        <DataGrid
          //mui api to allow editing on each cell
          experimentalFeatures={{ newEditingApi: true }}
          rows={mockDataTeam}
          columns={columns}
        />
        <AddTeamMemberForm />
      </Box>
    </Box>
  );
};

export default Team;
