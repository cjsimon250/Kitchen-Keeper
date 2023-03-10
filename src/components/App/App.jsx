import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
// //global components
import Topbar from "./../Global/Topbar";
import Sidebar from "../Global/Sidebar";
// //all scenes
import Dashboard from "../Dashboard/Dashboard";
// import Menu from "./scenes/Menu/Menu.jsx";
// import Inventory from "./scenes/Inventory/Inventory.jsx";
// import Orders from "./scenes/Orders/Orders";
// import Team from "./scenes/Team/Team.jsx";
// import Sales from "./scenes/Sales/Sales.jsx";
// import Contacts from "./scenes/Contacts/Contacts.jsx";
// import Graphs from "./scenes/Graphs/Graphs.jsx";
// import Calendar from "./scenes/Calendar/Calendar.jsx";

function App() {
  //giving app access to theme and color mode

  const [theme, colorMode] = useMode();

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* resets css to baseline */}
          <CssBaseline />
          <Box className="app">
            {/* <Sidebar display="flex" height="100vh" /> */}
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              {/* Visiting localhost:3000/about will show the about page. */}
              <Route
                // shows AboutPage at all times (logged in or not)
                exact
                path="/about"
              >
                <AboutPage />
              </Route>

              <ProtectedRoute
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/info"
              ></ProtectedRoute>

              <Route exact path="/login">
                {user.id ? (
                  // If the user is already logged in,
                  // redirect to the /home page
                  <Redirect to="/dashboard" />
                ) : (
                  // Otherwise, show the login page
                  <LoginPage />
                )}
              </Route>

              <Route exact path="/registration">
                {user.id ? (
                  // If the user is already logged in,
                  // redirect them to the /home page
                  <Redirect to="/home" />
                ) : (
                  // Otherwise, show the registration page
                  <RegisterPage />
                )}
              </Route>

              {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute
                // logged in shows home else shows LoginPage
                exact
                path="/home"
              >
                <UserPage />
              </ProtectedRoute>

              {/* <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route> */}
              <Sidebar display="flex" height="100vh" />

              {/* content to show if the user is logged in */}
              <Box>
                <ProtectedRoute
                  // logged in shows home else shows LoginPage
                  exact
                  path="/dashboard"
                >
                  <Dashboard />
                </ProtectedRoute>
              </Box>
              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
