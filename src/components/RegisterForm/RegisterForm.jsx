import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        company: company,
      },
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
            value={username}
            variant="filled"
            inputProps={{ style: { fontSize: 15 } }}
            required
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Box>
        <Box>
          <TextField
            type="password"
            name="password"
            label="Password"
            value={password}
            variant="filled"
            inputProps={{ style: { fontSize: 15 } }}
            required
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            type="text"
            name="company"
            label="Company Name"
            value={company}
            variant="filled"
            inputProps={{ style: { fontSize: 15 } }}
            required
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) => setCompany(event.target.value)}
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
