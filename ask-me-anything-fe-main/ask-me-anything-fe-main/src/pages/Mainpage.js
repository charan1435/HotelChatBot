import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateNewStayCationModal from "../components/CreateNewStayCationModal";
import { makeStyles,createTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Pic from "../assets/images/mainpage.svg";

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
  palette: {
    primary: {
      main: "#0077ff",
    },
    secondary: {
      main: "#ff0022",
    },
  },
  mainpageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "50px",
    backgroundColor: "#f5f5f5",
  },
  mainpageContent: {
    maxWidth: "50%",
    paddingRight: "50px",
  },
  mainpageTitle: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  mainpageDescription: {
    fontSize: "1.5rem",
    marginBottom: "50px",
  },
  mainpageButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  createButton: {
    marginRight: "20px",
  },
  rightSideContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "400px",
  },
  hotelGraphic: {
    marginBottom: "20px",
    width: "80%",
  },
  animation: {
    marginBottom: "20px",
    width: "80%",
  },
}));

function Mainpage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.mainpageContainer}>
      <div className={classes.mainpageContent}>
        <Typography variant="h1" className={classes.mainpageTitle}>
          Welcome to our Hotel Staycation App
        </Typography>
        <Typography variant="body1" className={classes.mainpageDescription}>
          Explore our collection of hotels and create your perfect staycation today!
        </Typography>
        <div className={classes.mainpageButtons}>
          {loggedIn && (
            <Button
              variant="contained"
              color="primary"
              className={classes.createButton}
              onClick={() => setModalOpen(true)}
            >
              Create New Staycation
            </Button>
          )}
          {loggedIn && (
            <Button variant="contained" color="secondary" onClick={() => navigate("/myvacations")}>
              Visit My Vacations
            </Button>
          )}
        </div>
      </div>
      <div className={classes.carouselContainer}>
       <img src={Pic} alt="Logo" />
      </div>
      {modalOpen && <CreateNewStayCationModal setOpenModal={setModalOpen} />}
    </div>
    </ThemeProvider>
  );
}

export default Mainpage;
