import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import axios from "axios";
import { useState } from "react";

function AddContactsForm({ fetchContacts }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Variable to show whether the add contact form is showing
  const showContactForm = useSelector((store) => store.showContactsForm);

  //Variable to hold the contact to add
  const [contactToAdd, setContactToAdd] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    company: "",
  });

  //Function to close the add contact form via redux
  const handleClose = () => {
    dispatch({
      type: "SET_SHOW_CONTACTS_FORM",
      payload: false,
    });
  };

  //Function to handle adding a contact
  function handleAddContact(evt) {
    evt.preventDefault();

    axios
      .post("/api/contacts", contactToAdd)
      .then((response) => {
        fetchContacts();

        //Clear inputs
        setContactToAdd({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          company: "",
        });

        //Close form
        dispatch({
          type: "SET_SHOW_CONTACTS_FORM",
          payload: false,
        });
      })
      .catch((error) => console.log(error));
  }

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
          "& .MuiButtonBase-root": {
            backgroundColor: colors.orangeAccent[500],
          },
          "& .MuiButton-textPrimary": {
            color: `e0e0e0`,
          },
        }}
      >
        <form onSubmit={handleAddContact}>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              required
              value={contactToAdd.name}
              onChange={(evt) =>
                setContactToAdd({ ...contactToAdd, name: evt.target.value })
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
              required
              value={contactToAdd.email}
              onChange={(evt) =>
                setContactToAdd({ ...contactToAdd, email: evt.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone Number"
              type="text"
              fullWidth
              variant="standard"
              required
              value={contactToAdd.phoneNumber}
              onChange={(evt) =>
                setContactToAdd({
                  ...contactToAdd,
                  phoneNumber: evt.target.value,
                })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              required
              value={contactToAdd.address}
              onChange={(evt) =>
                setContactToAdd({ ...contactToAdd, address: evt.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="company"
              label="Company"
              type="text"
              fullWidth
              variant="standard"
              required
              value={contactToAdd.company}
              onChange={(evt) =>
                setContactToAdd({ ...contactToAdd, company: evt.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Contact</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default AddContactsForm;
