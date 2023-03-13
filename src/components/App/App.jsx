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
import RegisterPage from "../RegisterPage/RegisterPage";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
// //global components
import Topbar from "../Global/Topbar";
import Sidebar from "../Global/Sidebar";
// //all scenes
import Dashboard from "../Dashboard/Dashboard";
import Menu from "../Menu/Menu";
import Inventory from "../Inventory/Inventory";
import Orders from "../Orders/Orders";
import Team from "../Team/Team";
import Contacts from "../Contacts/Contacts";
import Graphs from "../Graphs/Graphs";
import Calendar from "../Calendar/Calendar";

function App() {
  //giving app access to theme and color mode

  const [theme, colorMode] = useMode();

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  //function to fetch user and user company
  async function fetchUserData(dispatch) {
    await dispatch({ type: "FETCH_USER" });
    await dispatch({ type: "FETCH_COMPANY" });
  }
  useEffect(() => {
    fetchUserData(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* resets css to baseline */}
          <CssBaseline />
          <Box className="app">
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

              <Route exact path="/registration">
                {user.id ? (
                  // If the user is already logged in,
                  // redirect them to the /dashboard page
                  <Redirect to="/dashboard" />
                ) : (
                  // Otherwise, show the registration page
                  <RegisterPage />
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

                  <ProtectedRoute exact path="/dashboard">
                    <Dashboard />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/menu">
                    <Menu />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/inventory">
                    <Inventory />
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
                  <ProtectedRoute exact path="/calendar">
                    <Calendar />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/graphs">
                    <Graphs />
                  </ProtectedRoute>
                </Box>
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
