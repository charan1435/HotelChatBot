import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "yellow",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  appBar: {
    backgroundColor: "#FFB900",  
  },
}));


function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const loggedIn = useSelector((state) => state.user.loggedIn);

  const handleLogout = () => {
    // remove the user's login information from local storage
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");

    // navigate to the login page
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >
      <List>
        <ListItem button onClick={() => navigate("/home")}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => navigate("/aboutus")}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => navigate("/contactus")}>
          <ListItemText primary="Contact" />
        </ListItem>
        {localStorage.getItem("loggedIn") && (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
        {!localStorage.getItem("loggedIn") && (
          <ListItem button onClick={handleLogin}>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <a href="/">
              <img src={Logo} alt="Logo" height={50} width={100} />
            </a>
          </Typography>
          {localStorage.getItem("loggedIn") && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
          {!localStorage.getItem("loggedIn") && (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={handleDrawerClose}>
        {sideList()}
      </Drawer>
    </div>
  );
}

export default Navbar;
