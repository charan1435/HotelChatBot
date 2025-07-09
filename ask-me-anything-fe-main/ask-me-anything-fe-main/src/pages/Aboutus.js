import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import illustration from "../assets/images/aboutus.svg";

const useStyles = makeStyles((theme) => ({
  mainpageContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "50px",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
  },
  mainpageIllustration: {
    width: "100%",
    maxWidth: "500px",
    justifySelf: "center",
    alignSelf: "center",
  },
  mainpageDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  mainpageTitle: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
  },
  mainpageDescription: {
    fontSize: "1.5rem",
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  mainpageButton: {
    marginTop: "30px",
    padding: "10px 20px",
    borderRadius: "50px",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function AboutUs() {
  const classes = useStyles();

  return (
    <div className={classes.mainpageContainer}>
      <img
        src={illustration}
        alt="Illustration"
        className={classes.mainpageIllustration}
      />
      <div className={classes.mainpageDetails}>
        <Typography variant="h1" className={classes.mainpageTitle}>
          About Us
        </Typography>
        <Typography variant="body1" className={classes.mainpageDescription}>
          Welcome to our hotel! We are proud to introduce our AI-powered chatbot
          that handles guest queries. With our chatbot, you can get answers to
          all your questions and concerns 24/7.
        </Typography>
        <Typography variant="body1" className={classes.mainpageDescription}>
          Our chatbot is designed to be user-friendly and easy to use. Simply
          type your question into the chatbox, and our chatbot will provide you
          with accurate and helpful answers.
        </Typography>
        <Typography variant="body1" className={classes.mainpageDescription}>
          We are committed to providing our guests with the best possible
          experience during their stay at our hotel. If you have any feedback or
          suggestions for us, please don't hesitate to get in touch using the
          contact information below.
        </Typography>
        <Button
          variant="contained"
          className={classes.mainpageButton}
          href="/contactus"
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}

export default AboutUs;
