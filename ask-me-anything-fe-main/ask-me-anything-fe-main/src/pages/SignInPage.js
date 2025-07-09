import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../Redux/actions/UserActions';
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
import logo from '../assets/images/Welcome.svg';

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

function SignInPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn } = useSelector((state) => state);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      dispatch(Login(email, password))
        .then((response) => {
          if (response.success) {
            navigate('/home');
            toast.success('Logged in successfully!');
          } else {
            setError('Invalid email or password');
          }
        })
        .catch((error) => {
          setError('Something went wrong. Please try again later.');
        });
    } else {
      setError('Please enter email and password');
    }
  }

  if (loggedIn) {
    return <h1>Welcome!</h1>;
  }

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <Typography variant="h5" component="h2" gutterBottom>
          Sign In
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
          {error && (
            <Typography variant="body1" className={classes.error}>
              {error}
            </Typography>
          )}
        </form>
        </Paper>
        </Container>
)}


export default SignInPage;
