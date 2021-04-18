// React Imports
import React, { FC } from "react";
import Filters from "./Filters";
import HappyHour from "./HappyHour";
import { DRAWER_WIDTH } from "../../Utils/constants";

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
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginLeft: DRAWER_WIDTH,
    },
  },
}));

const Home: FC = () => {
  useFirestoreConnect({ collection: "happyHours" });
  useFirestoreConnect({ collection: "users" });

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
          happyHours.map((h) => <HappyHour key={h.id} {...h} />)
        ) : (
          <Typography>No Happy Hours found.</Typography>
        )}
      </div>
    </>
  );
};

export default Home;
