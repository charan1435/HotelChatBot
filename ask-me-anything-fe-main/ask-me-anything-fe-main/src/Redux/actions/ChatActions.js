import axios from "axios";
import { addMessage } from "../reducers/ChatReducer";

import {
  FETCH_CHAT_HISTORY_REQUEST,
  FETCH_CHAT_HISTORY_FAILURE,
  FETCH_CHAT_HISTORY,
  FETCH_CHAT_HISTORY_SUCCESS
} from "../types/ChatTypes"


export const fetchChatHistoryRequest = () => ({
  type: FETCH_CHAT_HISTORY_REQUEST,
});

export const fetchChatHistorySuccess = (chatHistory) => ({
  type: FETCH_CHAT_HISTORY_SUCCESS,
  payload: chatHistory,
});

export const fetchChatHistoryFailure = (error) => ({
  type: FETCH_CHAT_HISTORY_FAILURE,
  payload: error,
});

export const fetchChatHistory = (userstaycationid) => async (dispatch) => {
    try {
      const userId = localStorage.getItem("userId");
      // console.log("28",userstaycationid)
      const response = await axios.get(`/chat/${userstaycationid}/${userId}`);
      // console.log(response)
      dispatch({
        type: FETCH_CHAT_HISTORY,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  export const sendMessage = (message,userstaycationid) => async (dispatch) => {
    const requestBody = JSON.stringify({ input: message });
    const response = await fetch(`/chatbot/${userstaycationid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    });

    const data = await response.json();
    // Dispatch a Redux action to update the message list with the new message data
    dispatch(addMessage(data));
  };
  