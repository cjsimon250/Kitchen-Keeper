import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import { FormControl, FormControlLabel, FormLabel, Radio } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";
import { useState } from "react";
import axios from "axios";

function AddTeamMemberForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Variable to show whether the add contact form is showing
  const showContactForm = useSelector((store) => store.showTeamForm);

  //Variable to hold the new team member to add
  const [teamMember, setTeamMember] = useState({
    name: "",
    email: "",
  });

  //Function to close the add contact form via redux
  const handleClose = () => {
    dispatch({
      type: "SET_SHOW_TEAM_FORM",
      payload: false,
    });
  };

  //Function to handle adding a team member
  const handleAddTeamMember = (teamMember) => {
    axios
      .post("/api/team", teamMember)
      .then(() => {
        //Clear inputs
        setTeamMember({
          name: "",
          email: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });

    //Clear inputs
    setTeamMember({
      name: "",
      email: "",
    });
  };

  return (
    //Form to add information of contacts
    <Box>
      <Dialog
        open={showContactForm}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: colors.khakiAccent[800],
          },
          "& #add-btn, #cancel-btn": {
            backgroundColor: colors.orangeAccent[500],
          },
          "& .MuiButton-textPrimary": {
            color: `e0e0e0`,
          },
        }}
      >
        <DialogTitle>Invite New Team Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={teamMember.name}
            onChange={(evt) =>
              setTeamMember({
                ...teamMember,
                name: evt.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={teamMember.email}
            onChange={(evt) =>
              setTeamMember({
                ...teamMember,
                email: evt.target.value,
              })
            }
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            value={teamMember.phoneNumber}
            onChange={(evt) =>
              setTeamMember({
                ...teamMember,
                phoneNumber: evt.target.value,
              })
            }
          /> */}
          {/* <Box sx={{ mt: "10px" }}>
            <FormControl>
              <FormLabel id="access">Access</FormLabel>
              <RadioGroup
                row
                value={teamMember.access}
                defaultValue={1}
                name="access-radio-btn-group"
                onChange={(evt) =>
                  setTeamMember({
                    ...teamMember,
                    access: evt.target.value,
                  })
                }
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Employee"
                />

                <FormControlLabel value={2} control={<Radio />} label="Admin" />
              </RadioGroup>
            </FormControl>
          </Box> */}
        </DialogContent>
        <DialogActions>
          <Button
            id="cancel-btn"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button id="add-btn" onClick={() => handleAddTeamMember(teamMember)}>
            Add Team Member
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddTeamMemberForm;
