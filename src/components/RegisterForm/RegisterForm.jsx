import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";

function RegisterForm() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    company: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: userData,
    });
  }; // end registerUser

  return (
    <Box
      sx={{
        "& .MuiButton-sizeMedium": {
          backgroundColor: colors.greenAccent[500],
        },
        "& .MuiButton-sizeMedium:hover": {
          backgroundColor: colors.greenAccent[700],
        },
      }}
    >
      <form className="formPanel" onSubmit={registerUser}>
        <Typography variant="h3" mb="10%" textAlign="left">
          Register User
        </Typography>
        {errors.registrationMessage && (
          <Typography variant="h4" className="alert" role="alert">
            {errors.registrationMessage}
          </Typography>
        )}
        <Box>
          <TextField
            type="text"
            name="username"
            label="Username"
            value={userData.username}
            variant="filled"
            inputProps={{ style: { fontSize: 15 } }}
            required
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) =>
              setUserData({ ...userData, username: event.target.value })
            }
          />
        </Box>
        <Box>
          <TextField
            type="password"
            name="password"
            label="Password"
            value={userData.password}
            variant="filled"
            inputProps={{ style: { fontSize: 15 } }}
            required
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) =>
              setUserData({ ...userData, password: event.target.value })
            }
          />
          <TextField
            type="text"
            name="company"
            label="Company Name"
            value={userData.company}
            variant="filled"
            inputProps={{ style: { fontSize: 15 } }}
            required
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) =>
              setUserData({ ...userData, company: event.target.value })
            }
          />
          <TextField
            type="text"
            name="firstName"
            label="First Name"
            value={userData.firstName}
            variant="filled"
            inputProps={{ style: { fontSize: 15 } }}
            required
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) =>
              setUserData({ ...userData, firstName: event.target.value })
            }
          />
          <TextField
            type="text"
            name="company"
            label="Last Name"
            value={userData.lastName}
            variant="filled"
            inputProps={{ style: { fontSize: 15 } }}
            required
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) =>
              setUserData({ ...userData, lastName: event.target.value })
            }
          />
          <TextField
            type="text"
            name="company"
            label="Phone Number"
            value={userData.phoneNumber}
            variant="filled"
            inputProps={{ style: { fontSize: 15 } }}
            required
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) =>
              setUserData({ ...userData, phoneNumber: event.target.value })
            }
          />
        </Box>
        <Box style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            id="register-btn"
            type="submit"
            name="submit"
            value="Register"
            sx={{ mt: "5%" }}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default RegisterForm;
