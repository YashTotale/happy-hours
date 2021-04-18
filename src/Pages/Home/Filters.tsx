// React Imports
import React, { FC } from "react";
import { DRAWER_WIDTH } from "../../Utils/constants";

// Redux Imports
import { useAppDispatch } from "../../Store";
import { useSelector } from "react-redux";
import {
  getIsMenuOpen,
  getSortFilter,
  setSort,
  toggleMenuOpen,
} from "../../Redux";
import { Sort, sortValues } from "../../Redux/filters.slice";

// Material UI Imports
import {
  Drawer,
  FormControlLabel,
  Hidden,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  filter: {
    paddingLeft: theme.spacing(3),
  },
  heading: {
    margin: theme.spacing(1, 1, 0),
  },
}));

const Filters: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const sort = useSelector(getSortFilter);

  return (
    <Sidebar>
      <div>
        <div className={classes.toolbar} />
        <Typography variant="h4" className={classes.heading}>
          Sort
        </Typography>
        <div className={classes.filter}>
          <RadioGroup
            name="sort-options"
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value as Sort))}
          >
            {sortValues.map((val, i) => (
              <FormControlLabel
                key={i}
                value={val}
                label={val}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </Sidebar>
  );
};

const useSidebarStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    padding: theme.spacing(1),
  },
}));

const Sidebar: FC = ({ children }) => {
  const classes = useSidebarStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const isMenuOpen = useSelector(getIsMenuOpen);

  return (
    <div className={classes.root}>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={isMenuOpen}
            onClose={() => dispatch(toggleMenuOpen())}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {children}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {children}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default Filters;
