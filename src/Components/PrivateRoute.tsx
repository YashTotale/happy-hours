// React Imports
import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

// Redux Imports
import { useSelector } from "react-redux";
import { getUser, togglePopup } from "../Redux";
import { useAppDispatch } from "../Store";

// Material UI Imports
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const PrivateRoute: FC<RouteProps> = (props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const user = useSelector(getUser);

  if (!user.isLoaded) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (user.isEmpty) {
    dispatch(
      togglePopup({
        open: true,
        type: "login",
      })
    );
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
