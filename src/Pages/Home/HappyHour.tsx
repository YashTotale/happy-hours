// React Imports
import React, { FC } from "react";
import { HappyHour as HappyHourProps } from "../../Utils/types";
import { createTimePeriod } from "../../Utils/funcs";

// Redux Imports
import { useSelector } from "react-redux";
import { getUsers, getUsersLoading } from "../../Redux";

// Material UI Imports
import {
  Avatar,
  Chip,
  CircularProgress,
  makeStyles,
  Paper,
  Tooltip,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  happyHour: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: "50%",
    maxWidth: "95%",
    padding: theme.spacing(1, 3),
    margin: theme.spacing(2, 0),
  },
  top: {
    display: "flex",
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
}));

const HappyHour: FC<HappyHourProps> = ({
  name,
  description,
  tags,
  attendees,
  start,
  end,
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={8} className={classes.happyHour}>
      <div className={classes.top}>
        <Typography variant="h4" className={classes.heading}>
          {name}
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
