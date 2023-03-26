import React, { useState } from "react";
import "./LandingPage.css";
import LoginForm from "../LoginForm/LoginForm";
import { Box, useTheme } from "@mui/system";
import { Button } from "@mui/material";
import { tokens } from "../../theme";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome to Kitchen Keeper");
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const alreadyUser = useSelector((store) => store.alreadyUser);

  const onLogin = (event) => {
    dispatch({
      type: "SET_IS_USER",
      payload: true,
    });
  };

  return (
    <Box
      className="container"
      sx={{
        "& .MuiButton-sizeMedium": {
          backgroundColor: colors.orangeAccent[500],
          p: "3px",
        },
        "& .MuiButton-sizeMedium:hover": {
          backgroundColor: colors.orangeAccent[700],
        },
      }}
    >
      <Typography variant="h1" color={colors.greenAccent[500]}>
        {heading}
      </Typography>

      <Box className="grid">
        <Box className="grid-col grid-col_8" mt="5%">
          <Typography fontSize="16px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </Typography>

          <Typography fontSize="16px">
            Praesent consectetur orci dui, id elementum eros facilisis id. Sed
            id dolor in augue porttitor faucibus eget sit amet ante. Nunc
            consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
            finibus metus facilisis. Nullam eget lectus non urna rhoncus
            accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
            euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
            lobortis augue mi vel felis. Duis ultrices sapien at est convallis
            congue.
          </Typography>

          <Typography fontSize="16px">
            Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
            Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
            vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
            sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
            non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
            amet nisi.
          </Typography>
        </Box>
        <Box className="grid-col grid-col_4">
          {alreadyUser ? <LoginForm /> : <RegisterForm />}

          {!alreadyUser && (
            <center>
              <h4>Already a Member?</h4>
              <Button className="btn btn_sizeSm" onClick={onLogin}>
                Login
              </Button>
            </center>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default LandingPage;
