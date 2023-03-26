import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import LandingPage from "../LandingPage/LandingPage";
import RegisterForm from "../RegisterPage/RegisterForm/RegisterForm";
import { useSelector } from "react-redux";
import { useState } from "react";

function LoginPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box style={{ boxSizing: "initial", p: "initial" }}>
      <Box width="35vw" margin="auto">
        <LandingPage />
      </Box>
    </Box>
  );
}

export default LoginPage;
