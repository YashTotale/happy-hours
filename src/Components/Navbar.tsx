// React Imports
import React, { FC, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { getUser, toggleDarkMode, toggleMenuOpen, togglePopup } from "../Redux";
import { AppDispatch } from "../Store";

// Firebase Imports
import { FirebaseReducer } from "react-redux-firebase";

// Material UI Imports
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {
  Brightness7,
  Brightness4,
  Person,
  Add,
  Home,
  Menu as MenuIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {
    position: "relative",
    justifyContent: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  headingLink: {
    position: "absolute",
    color: "inherit",
    textDecoration: "inherit",
  },
  heading: {
    fontFamily: "'Great Vibes', cursive",
    color: theme.palette.text.primary,
  },
  icons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  avatar: {
    cursor: "pointer",
    marginLeft: theme.spacing(1),
  },
}));

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const user = useSelector(getUser);
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const isDarkMode = theme.palette.type === "dark";

  return (
    <AppBar elevation={2} position="fixed" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        {location.pathname === "/" && (
          <Tooltip title="Toggle Filters">
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => dispatch(toggleMenuOpen())}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        )}
        {!isSmall && (
          <Link to="/" className={classes.headingLink}>
            <Typography variant="h4" className={classes.heading}>
              Happy Hours
            </Typography>
          </Link>
        )}
        <div className={classes.icons}>
          {isSmall && (
            <Tooltip title="Home">
              <IconButton onClick={() => history.push("/")}>
                <Home />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Create Happy Hour">
            <IconButton
              onClick={() =>
                dispatch(togglePopup({ open: true, type: "create" }))
              }
            >
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title={`Toggle ${isDarkMode ? "Light" : "Dark"} Theme`}>
            <IconButton
              onClick={() => {
                dispatch(toggleDarkMode());
              }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          {!user.isLoaded ? (
            <CircularProgress />
          ) : user.isEmpty ? (
            <LoginButton dispatch={dispatch} classes={classes} />
          ) : (
            <ProfileMenu dispatch={dispatch} user={user} classes={classes} />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

interface LoginButtonProps {
  dispatch: AppDispatch;
  classes: ReturnType<typeof useStyles>;
}

const LoginButton: FC<LoginButtonProps> = ({ dispatch }) => {
  return (
    <Tooltip title="Login">
      <IconButton
        onClick={() => dispatch(togglePopup({ open: true, type: "login" }))}
      >
        <Person />
      </IconButton>
    </Tooltip>
  );
};

interface ProfileMenuProps {
  user: FirebaseReducer.AuthState;
  dispatch: AppDispatch;
  classes: ReturnType<typeof useStyles>;
}

const ProfileMenu: FC<ProfileMenuProps> = ({ user, dispatch, classes }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="Profile">
        <Avatar
          alt={user.displayName ?? "Profile Picture"}
          src={user.photoURL ?? undefined}
          variant="circular"
          onClick={handleClick}
          className={classes.avatar}
        />
      </Tooltip>
      <Menu
        elevation={6}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(togglePopup({ type: "logout", open: true }));
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
