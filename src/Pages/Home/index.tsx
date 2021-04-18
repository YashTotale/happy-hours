// React Imports
import React, { FC } from "react";
import Filters from "./Filters";

// Firebase Imports
import { useFirestoreConnect } from "react-redux-firebase";

// Redux Imports
import { useSelector } from "react-redux";
import { getHappyHours, getHappyHoursLoading } from "../../Redux";
import { CircularProgress, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Home: FC = () => {
  useFirestoreConnect({ collection: "happyHours" });

  const classes = useStyles();

  const happyHours = useSelector(getHappyHours);
  const happyHoursLoading = useSelector(getHappyHoursLoading);

  return (
    <>
      <Filters />
      <div className={classes.container}>
        {happyHoursLoading ? (
          <CircularProgress />
        ) : happyHours ? (
          happyHours.map((h) => <h1 key={h.id}>{h.name}</h1>)
        ) : (
          <Typography>No Happy Hours found.</Typography>
        )}
      </div>
    </>
  );
};

export default Home;
