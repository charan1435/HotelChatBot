import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../Redux/actions/UserActions';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/signup.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2575DA",
    '&:hover': {
      backgroundColor: "#2575DA",
    },
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
  },
}));

function SignupPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && contactNumber && password) {
      const newUser = { email, contact_number: contactNumber, password };
      dispatch(createUser(newUser)).then((response) => {
        navigate('/signin');
        toast.success('User created successfully');
      }).catch((error) => {
        setError('Failed to create user');
      });
    } else {
      setError('Please enter all fields');
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <Typography variant="h5" component="h2" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            id="contactNumber"
            name="contactNumber"
            label="Contact Number"
            type="tel"
            variant="outlined"
            margin="normal"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submitButton}
            fullWidth
          >
            Sign In
          </Button>
          </form>
          </Paper>
          </Container>
          
          )}
export default SignupPage;
