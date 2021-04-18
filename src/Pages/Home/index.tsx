// React Imports
import React, { FC } from "react";
import Filters from "./Filters";
import HappyHour from "./HappyHour";
import { DRAWER_WIDTH } from "../../Utils/constants";
import { parseFirestoreDate } from "../../Utils/funcs";

// Firebase Imports
import { useFirestoreConnect } from "react-redux-firebase";

// Redux Imports
import { useSelector } from "react-redux";
import {
  getHappyHours,
  getHappyHoursLoading,
  getSortFilter,
} from "../../Redux";
import { Sort } from "../../Redux/filters.slice";

// Material UI Imports
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

const sortHours = (hours: ReturnType<typeof getHappyHours>, sort: Sort) => {
  const toSort = [...hours];

  switch (sort) {
    case "Most Attendees": {
      return toSort.sort((a, b) => b.attendees.length - a.attendees.length);
    }
    case "Least Attendees": {
      return toSort.sort((a, b) => a.attendees.length - b.attendees.length);
    }
    case "Least Recently Created": {
      return toSort.sort(
        (a, b) =>
          parseFirestoreDate(a.created).getTime() -
          parseFirestoreDate(b.created).getTime()
      );
    }
    case "Most Recently Created": {
      return toSort.sort(
        (a, b) =>
          parseFirestoreDate(b.created).getTime() -
          parseFirestoreDate(a.created).getTime()
      );
    }
  }
};

const Home: FC = () => {
  useFirestoreConnect({ collection: "happyHours" });
  useFirestoreConnect({ collection: "users" });

  const classes = useStyles();

  const happyHours = useSelector(getHappyHours);
  const happyHoursLoading = useSelector(getHappyHoursLoading);

  const sort = useSelector(getSortFilter);

  return (
    <>
      <Filters />
      <div className={classes.container}>
        {happyHoursLoading ? (
          <CircularProgress />
        ) : happyHours ? (
          sortHours(happyHours, sort).map((h) => (
            <HappyHour key={h.id} {...h} />
          ))
        ) : (
          <Typography>No Happy Hours found.</Typography>
        )}
      </div>
    </>
  );
};

export default Home;
