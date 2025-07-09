import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStaycations } from '../Redux/actions/StaycationActions';
import VacationCard from '../components/MyVacationCard';
import { CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    borderRadius: theme.spacing(2),
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  content: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.8rem",
    marginBottom: theme.spacing(1),
  },
  location: {
    fontSize: "1.4rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  actions: {
    paddingTop: 0,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function MyVacations() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const staycations = useSelector((state) => state.staycation.staycations);
  const loading = useSelector((state) => state.staycation.loading);
  const error = useSelector((state) => state.staycation.error);

  useEffect(() => {
    dispatch(fetchUserStaycations());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h2" align="center" className={classes.title}>
        My Vacations
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {staycations.map((vacation) => (
          <Grid item key={vacation.id} xs={12} sm={6} md={4}>
            <VacationCard vacation={vacation} hotelName={vacation.hotel_name} userstaycation_id={vacation.staycation_id}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MyVacations;
