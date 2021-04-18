// React Imports
import React, { FC } from "react";
import { HappyHour as HappyHourProps } from "../../Utils/types";
import { createTimePeriod } from "../../Utils/funcs";

// Redux Imports
import { useSelector } from "react-redux";
import { getUser, getUsers, getUsersLoading, togglePopup } from "../../Redux";

// Firebase Imports
import { TypeWithId, useFirestore } from "react-redux-firebase";

// Material UI Imports
import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  darken,
  makeStyles,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { useAppDispatch } from "../../Store";
import { useClosableSnackbar } from "../../Hooks";

interface StyleProps {
  isAttending: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  happyHour: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "95%",
    padding: theme.spacing(1, 3),
    margin: theme.spacing(2, 0),
  },
  top: {
    display: "flex",
    width: "100%",
  },
  heading: {
    textAlign: "start",
  },
  dates: {
    textAlign: "start",
    margin: theme.spacing(1, 0, 0),
  },
  description: {
    textAlign: "start",
    margin: theme.spacing(1, 0),
  },
  tags: {
    display: "flex",
    overflow: "scroll",
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  tag: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  join: ({ isAttending }) => ({
    margin: theme.spacing(1, 0, 1, "auto"),
    backgroundColor: isAttending
      ? theme.palette.error.main
      : theme.palette.primary.main,
    "&:hover": {
      backgroundColor: isAttending
        ? darken(theme.palette.error.main, 0.1)
        : darken(theme.palette.primary.main, 0.1),
    },
  }),
}));

const HappyHour: FC<TypeWithId<HappyHourProps>> = ({
  title,
  description,
  tags,
  attendees,
  start,
  end,
  id,
}) => {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const isAttending = !user.isEmpty && attendees.includes(user.uid);
  const classes = useStyles({ isAttending });
  const firestore = useFirestore();
  const { enqueueSnackbar } = useClosableSnackbar();

  return (
    <Paper elevation={8} className={classes.happyHour}>
      <div className={classes.top}>
        <Typography variant="h4" className={classes.heading}>
          {title}
        </Typography>
        <Attendees attendees={attendees} />
      </div>
      <Typography color="textSecondary" className={classes.dates}>
        {createTimePeriod(start, end)}
      </Typography>
      <Typography className={classes.description}>{description}</Typography>
      <div className={classes.tags}>
        {tags.map((tag, i) => (
          <Chip key={i} label={tag} className={classes.tag} />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (user.isEmpty) {
            dispatch(togglePopup({ open: true, type: "login" }));
            return;
          }

          const newAttendees = [...attendees];

          if (!isAttending) newAttendees.push(user.uid);
          else {
            newAttendees.splice(newAttendees.indexOf(user.uid), 1);
          }

          firestore
            .collection("happyHours")
            .doc(id)
            .update("attendees", newAttendees)
            .then(() => {
              enqueueSnackbar(`${isAttending ? "Left" : "Joined"} '${title}'`, {
                variant: "success",
              });
            });
        }}
        className={classes.join}
      >
        {isAttending ? "Leave" : "Join!"}
      </Button>
    </Paper>
  );
};

const useAttendeesStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
  },
  avatar: {
    margin: theme.spacing(0, 0.5),
  },
  more: {
    width: "40px",
    height: "40px",
    borderColor: theme.palette.text.primary,
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing(0.5),
  },
}));

interface AttendeesProps {
  attendees: string[];
}

const Attendees: FC<AttendeesProps> = ({ attendees }) => {
  const classes = useAttendeesStyles();

  const users = useSelector(getUsers);
  const usersLoading = useSelector(getUsersLoading);

  return (
    <div className={classes.wrapper}>
      {attendees.slice(0, 3).reduce((arr, a, i) => {
        if (!users || usersLoading)
          return [
            ...arr,
            <CircularProgress key={i} className={classes.avatar} />,
          ];

        const u = users[a];
        if (!u) return arr;

        return [
          ...arr,
          <Tooltip title={u.name} key={i}>
            <Avatar
              alt={u.name}
              src={u.picture}
              variant="circular"
              className={classes.avatar}
            />
          </Tooltip>,
        ];
      }, [] as JSX.Element[])}
      {attendees.length > 3 && (
        <div className={classes.more}>
          <Typography variant="h6" align="center">
            +{attendees.length - 3}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default HappyHour;
