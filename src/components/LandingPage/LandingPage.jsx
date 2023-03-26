import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import LoginForm from "../LoginForm/LoginForm";
import { Box, useTheme } from "@mui/system";
import { Button } from "@mui/material";
import { tokens } from "../../theme";
import { useSelector, useDispatch } from "react-redux";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterPage/RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
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
      <h2>{heading}</h2>

      <Box className="grid">
        <Box className="grid-col grid-col_8">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </p>

          <p>
            Praesent consectetur orci dui, id elementum eros facilisis id. Sed
            id dolor in augue porttitor faucibus eget sit amet ante. Nunc
            consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
            finibus metus facilisis. Nullam eget lectus non urna rhoncus
            accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
            euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
            lobortis augue mi vel felis. Duis ultrices sapien at est convallis
            congue.
          </p>

          <p>
            Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
            Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
            vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
            sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
            non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
            amet nisi.
          </p>
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
