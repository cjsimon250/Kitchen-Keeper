import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { tokens } from "../../theme";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

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
      <form className="formPanel" onSubmit={login} sx={{ w: "5px" }}>
        <Typography variant="h3" mb="10%" textAlign="left">
          Login
        </Typography>
        {errors.loginMessage && (
          <Typography variant="h4" className="alert" role="alert">
            {errors.loginMessage}
          </Typography>
        )}
        <Box>
          <TextField
            type="text"
            name="username"
            label="Username"
            required
            variant="filled"
            value={username}
            size="medium"
            inputProps={{ style: { fontSize: 15 } }}
            onChange={(event) => setUsername(event.target.value)}
            sx={{ mt: "5%", width: "100%" }}
          />
        </Box>
        <Box>
          <TextField
            type="password"
            label="Password"
            required
            variant="filled"
            value={password}
            size="medium"
            inputProps={{ style: { fontSize: 15 } }}
            sx={{ mt: "5%", width: "100%" }}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
        <Box
          mt="10%"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={() => {
              dispatch({ type: "SET_IS_USER", payload: false });
            }}
          >
            Register
          </Button>
          <Button className="btn" type="submit" name="submit">
            Log In
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default LoginForm;
