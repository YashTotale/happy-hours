//React Imports
import { hot } from "react-hot-loader";
import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Create from "./Pages/Create";
import NotFound from "./Pages/404";

// Components
import Popup from "./Components/Popup";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";

// Material UI Imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  app: {},
  toolbar: theme.mixins.toolbar,
}));

const App: FC = () => {
  return (
    <>
      <Popup />
      <Navbar />
      <Routes />
    </>
  );
};

const Routes: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <div className={classes.toolbar} />
      <Switch>
        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/create">
          <Create />
        </PrivateRoute>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

//Hot Loader reloads the app when you save changes
export default hot(module)(App);
