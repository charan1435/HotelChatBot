import axios from "axios";
import {
  FETCH_USER_STAYCATIONS_REQUEST,
  FETCH_USER_STAYCATIONS_SUCCESS,
  FETCH_USER_STAYCATIONS_FAILURE,
  CREATE_USER_STAYCATION_REQUEST,
  CREATE_USER_STAYCATION_SUCCESS,
  CREATE_USER_STAYCATION_FAILURE
} from "../types/StaycationType"

export const createUserStaycationRequest = () => ({
  type: CREATE_USER_STAYCATION_REQUEST,
});

export const createUserStaycationSuccess = (message) => ({
  type: CREATE_USER_STAYCATION_SUCCESS,
  payload: message,
});

export const createUserStaycationFailure = (error) => ({
  type: CREATE_USER_STAYCATION_FAILURE,
  payload: error,
});

export const createUserStaycation = (guest_id, roomid, password) => {
  return async (dispatch) => {
    dispatch(createUserStaycationRequest());
    try {
      const response = await fetch("/createUserStaycation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guest_id, roomid, password }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(createUserStaycationSuccess(data.message));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(createUserStaycationFailure(error.message));
    }
  };
};



export const fetchUserStaycationsRequest = () => {
  return {
    type: FETCH_USER_STAYCATIONS_REQUEST,
  };
};

export const fetchUserStaycationsSuccess = (staycations) => {
  return {
    type: FETCH_USER_STAYCATIONS_SUCCESS,
    payload: staycations,
  };
};

export const fetchUserStaycationsFailure = (error) => {
  return {
    type: FETCH_USER_STAYCATIONS_FAILURE,
    payload: error,
  };
};

export const fetchUserStaycations = () => {
  return (dispatch) => {
    const userId = localStorage.getItem('userId');
    console.log('userId:', userId);

    if (!userId) {
      // Handle the case where the userId is not available in localStorage
      return;
    }
    dispatch(fetchUserStaycationsRequest());
    axios
      .get(`/user/${userId}/staycations`)
      .then((response) => {
        console.log('hello')
        const staycations = response.data;
        dispatch(fetchUserStaycationsSuccess(staycations));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchUserStaycationsFailure(errorMessage));
      });
  };
};

