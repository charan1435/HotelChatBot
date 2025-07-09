import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import BackgroundImage from "../assets/images/homepage5.avif";
import logo from '../assets/images/Homepage.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  loginSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    flex: 0.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2),
    },
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // adds a light shadow
  },
  signupSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    flex: 0.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // adds a light shadow

  },
  button: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2, 4),
    marginTop: theme.spacing(2),
    boxShadow: "none",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1.5, 3),
      marginTop: theme.spacing(1),
      fontSize: "0.9rem",
    },
  },
  title: {
    fontWeight: 700,
    fontSize: "3rem",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
  },
  subtitle: {
    fontWeight: 400,
    fontSize: "1.2rem",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  logo: {
    width: "100%",
    height: "auto",
    marginBottom: theme.spacing(3),
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} md={6} className={classes.imageSection}>
        <img src={logo} alt="Logo" className={classes.logo} />

          <Typography variant="h1" className={classes.title}>
            Welcome to Staycations!
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            The most innovative AI-based chatbot for your staycations.
          </Typography>

        </Grid>
        <Grid item xs={12} md={3}>
          <Box className={classes.loginSection}>
            <Typography variant="h1" className={classes.title}>
              Do you have an account?
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Login to access the most innovative AI-based chatbot for your staycations.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              component={Link}
              to="/signin"
            >
              Login
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box className={classes.signupSection}>
            <Typography variant="h1" className={classes.title}>
              Join with us today
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Sign up to access the most innovative AI-based chatbot for your staycations.
            </Typography>
            <Button variant="contained" color="primary" className={classes.button}>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}


export default HomePage;
