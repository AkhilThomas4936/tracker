import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { store } from "./index";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/materialUi/theme";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
//components
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./components/Navabar";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import Alerts from "./components/Alerts";
import Dashboard from "./components/Dashboard";
import NewProject from "./components/NewProject";
import Invite from "./components/Invite";
import Project from "./components/Project";
import Bug from "./components/Bug";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Welcome />} />
        <Route exact path="/invite" render={() => <Invite />} />
        <Route exact path="/contact" render={() => <Contact />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/login" render={() => <Login />} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/add" component={NewProject} />
        <Route
          exact
          path="/:projectId"
          render={(props) => <Project {...props} />}
        />
        <Route
          exact
          path="/:projectId/:bugId"
          render={(props) => <Bug {...props} />}
        />
      </Switch>
      <Alerts />
    </ThemeProvider>
  );
}

export default App;
