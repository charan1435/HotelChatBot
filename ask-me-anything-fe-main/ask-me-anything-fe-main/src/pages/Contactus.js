import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from "@material-ui/icons/Email";
import illustration from "../assets/images/contactus.svg";

const useStyles = makeStyles((theme) => ({
  mainpageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "50px",
  },
  mainpageTitle: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  mainpageDescription: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  contactContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "50px",
    "& img": {
      width: "50%",
      marginRight: "50px",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      "& img": {
        width: "100%",
        marginRight: 0,
        marginBottom: "20px",
      },
    },
  },
  contactInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
    "& svg": {
      marginRight: "10px",
      fontSize: "2rem",
    },
  },
}));

function ContactUs() {
  const classes = useStyles();

  return (
    <div className={classes.mainpageContainer}>
      <Typography variant="h1" className={classes.mainpageTitle}>
        Contact Us
      </Typography>
      <Typography variant="body1" className={classes.mainpageDescription}>
        If you have any questions or concerns, please don't hesitate to get in touch using the contact information below.
      </Typography>
      <div className={classes.contactContainer}>
        <img src={illustration} alt="Contact us illustration" />
        <div>
          <div className={classes.contactInfo}>
            <PhoneIcon />
            <Typography variant="body1">555-555-5555</Typography>
          </div>
          <div className={classes.contactInfo}>
            <EmailIcon />
            <Typography variant="body1">info@myhotel.com</Typography>
          </div>
        </div>
      </div>     
    </div>
  );
}

export default ContactUs;
