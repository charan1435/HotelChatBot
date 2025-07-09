

import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE
} from "../types/UserTypes"

// Define the initial state
const initialState = {
  loading: false,
  loggedIn: localStorage.getItem('loggedIn') === 'true',
  error: null
};

// Define the reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, loggedIn: true };
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, loggedIn: false, error: action.payload };
    default:
      return state;
  }
};

// Define the action creators
export const createUserRequest = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};

export const createUserSuccess = (user) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: user,
  };
};

export const createUserFailure = (error) => {
  return {
    type: CREATE_USER_FAILURE,
    payload: error,
  };
};

export default userReducer;
