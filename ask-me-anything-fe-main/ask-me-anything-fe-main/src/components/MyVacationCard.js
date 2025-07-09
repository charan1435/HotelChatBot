import React from "react";
import { Link } from "react-router-dom";
import { makeStyles,createTheme ,ThemeProvider} from "@material-ui/core/styles";
import backgroundImage from "../assets/images/homepage5.avif"
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0077ff",
    },
    secondary: {
      main: "#ff0022",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    // backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: theme.spacing(1),
  },
  location: {
    fontSize: "1.2rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  actions: {
    paddingTop: 0,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    
  },
}));

function MyVacationCard({ hotelName, hotelLocation, userstaycation_id }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h3" className={classes.title}>
          {hotelName}
        </Typography>
        <Typography variant="body1" className={classes.location}>
          {hotelLocation}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          component={Link}
          to={`/chatHistory/${userstaycation_id}`}
          className={classes.link}
          variant="contained"
          color="primary"
        >
          View Chats
        </Button>
      </CardActions>
    </Card>
    </ThemeProvider>
  );
}

export default MyVacationCard;
