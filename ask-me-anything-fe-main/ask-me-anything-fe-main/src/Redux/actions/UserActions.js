import axios from 'axios';

import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,CREATE_USER_REQUEST,CREATE_USER_SUCCESS,CREATE_USER_FAILURE} from "../types/UserTypes"


export const Login = (email, password, history) => {
  return async dispatch => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("User actions",data);
      // User actions {success: true}

      if (data.success) {
        dispatch({ type: LOGIN_SUCCESS });
        localStorage.setItem('loggedIn', true); 
        localStorage.setItem('userId', data.user_id); // store user ID in localStorage
        // store the logged in status in local storage
        // history.push('/home'); // navigate to the home page
        window.location.href = '/home';
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: data.error });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};


export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_USERS_REQUEST' });
    fetch('/product/1')
      .then(response => response.json())
      .then(users => {
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
      });
  };
};

export const createUser = (newUser) => {
  return (dispatch) => {
    return axios.post("/user", newUser).then((response) => {
      dispatch({
        type: "CREATE_USER_SUCCESS",
        payload: response.data,
      });
      localStorage.setItem('loggedIn', true); 
      localStorage.setItem('userId', response.data.id);
      window.location.href = '/home';
      return response.data; // return the response from the API call
    }).catch((error) => {
      dispatch({
        type: "CREATE_USER_ERROR",
        payload: error.response.data.message,
      });
      throw error; // throw the error to be caught by the caller
    });
  };
};

