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

function AddTeamMemberForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //variable to show whether the add contact form is showing
  const showContactForm = useSelector((store) => store.showTeamForm);

  //function to close the add contact form via redux
  const handleClose = () => {
    dispatch({
      type: "SET_SHOW_TEAM_FORM",
      payload: false,
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
        <DialogTitle>Add New Team Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
          />
          <Box sx={{ mt: "10px" }}>
            <FormControl>
              <FormLabel id="access">Access</FormLabel>
              <RadioGroup
                row
                defaultValue="employee"
                name="access-radio-btn-group"
              >
                <FormControlLabel
                  value="employee"
                  control={<Radio />}
                  label="Employee"
                />

                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
              </RadioGroup>
            </FormControl>
          </Box>
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
          <Button id="add-btn" onClick={handleClose}>
            Add Team Member
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddTeamMemberForm;
