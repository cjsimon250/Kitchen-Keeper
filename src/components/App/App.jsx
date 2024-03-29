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
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
// //global components
import Topbar from "../Global/Topbar";
import Sidebar from "../Global/Sidebar";
// //all scenes
import Dashboard from "../Dashboard/Dashboard";
import Menu from "../MenuInventory/Menu/Menu";
import Orders from "../Orders/Orders";
import Team from "../Team/Team";
import Contacts from "../Contacts/Contacts";
import MenuInventory from "../MenuInventory/MenuInventory";

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
            {/* only show the sidebar if the user is logged in */}
            {user.id && <Sidebar display="flex" height="100vh" />}
            <Box
              className="content"
              width="95vw"
              sx={{ m: "auto", pl: "80px" }}
            >
              {/* only show the topbar if the user is logged in */}
              {user.id && <Topbar />}

              <Switch>
                {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
                <Redirect exact from="/" to="/dashboard" />

                {/* Visiting localhost:3000/about will show the about page. */}
                <Route
                  // shows AboutPage at all times (logged in or not)
                  exact
                  path="/about"
                >
                  <AboutPage />
                </Route>

                <Route exact path="/login">
                  {user.id ? (
                    // If the user is already logged in,
                    // redirect to the /dashboard page
                    <Redirect to="/dashboard" />
                  ) : (
                    // Otherwise, show the login page
                    <LoginPage />
                  )}
                </Route>

                {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the Dashboard if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/dashboard */}
                <ProtectedRoute
                  // logged in shows home else shows LoginPage
                  exact
                  path="/"
                >
                  <Dashboard />
                </ProtectedRoute>

                <Route exact path="/">
                  {user.id ? (
                    // If the user is already logged in,
                    // redirect them to the /dashboard page
                    <Redirect to="/dashboard" />
                  ) : (
                    // Otherwise, show the Landing page
                    <LandingPage />
                  )}
                </Route>

                <ProtectedRoute exact path="/dashboard">
                  <Dashboard />
                </ProtectedRoute>
                <ProtectedRoute exact path="/menuinventory">
                  <MenuInventory />
                </ProtectedRoute>
                <ProtectedRoute exact path="/team">
                  <Team />
                </ProtectedRoute>

                <ProtectedRoute exact path="/orders">
                  <Orders />
                </ProtectedRoute>
                <ProtectedRoute exact path="/contacts">
                  <Contacts />
                </ProtectedRoute>

                {/* If none of the other routes matched, we will show a 404. */}
                <Route>
                  <h1>404</h1>
                </Route>
              </Switch>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
