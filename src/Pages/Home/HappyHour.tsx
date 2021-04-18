// React Imports
import React, { FC } from "react";
import { HappyHour as HappyHourProps } from "../../Utils/types";

// Material UI Imports
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  happyHour: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "50%",
    maxWidth: "95%",
    padding: theme.spacing(1),
    margin: theme.spacing(2, 0),
  },
  description: {
    textAlign: "start",
    margin: theme.spacing(1, 2),
  },
}));

const HappyHour: FC<HappyHourProps> = ({ name, description }) => {
  const classes = useStyles();

  return (
    <Paper elevation={8} className={classes.happyHour}>
      <Typography variant="h4">{name}</Typography>
      <Typography className={classes.description}>{description}</Typography>
    </Paper>
  );
};

export default HappyHour;
