// React Imports
import React, { FC } from "react";
import { HappyHour as HappyHourProps } from "../../Utils/types";

// Material UI Imports
import { Chip, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  happyHour: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "50%",
    maxWidth: "95%",
    padding: theme.spacing(1, 3),
    margin: theme.spacing(2, 0),
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

const HappyHour: FC<HappyHourProps> = ({ name, description, tags }) => {
  const classes = useStyles();

  return (
    <Paper elevation={8} className={classes.happyHour}>
      <Typography variant="h4">{name}</Typography>
      <Typography className={classes.description}>{description}</Typography>
      <div className={classes.tags}>
        {tags.map((tag, i) => (
          <Chip key={i} label={tag} className={classes.tag} />
        ))}
      </div>
    </Paper>
  );
};

export default HappyHour;
