import React from "react";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../theme";
import LandingPage from "../LandingPage/LandingPage";

function LoginPage() {
  const theme = useTheme();

  return (
    <Box style={{ boxSizing: "initial", p: "initial" }}>
      <Box width="50vw" margin="auto">
        <LandingPage />
      </Box>
    </Box>
  );
}

export default LoginPage;
