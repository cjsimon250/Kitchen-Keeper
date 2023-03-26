import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
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
        <Typography variant="h2" mb="10%" textAlign="left">
          Login
        </Typography>
        {errors.loginMessage && (
          <Typography variant="h4" className="alert" role="alert">
            {errors.loginMessage}
          </Typography>
        )}
        <Box>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </Box>
        <Box>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </Box>
        <Box dislay="flex" justifyContent="space-between">
          <Button className="btn" type="submit" name="submit">
            Log In
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: "SET_IS_USER", payload: false });
            }}
          >
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default LoginForm;
