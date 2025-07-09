import { FETCH_CHAT_HISTORY, ADD_MESSAGE } from "../types/ChatTypes"

const initialState = {
  messages: []
};

export const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAT_HISTORY:
      return {
        ...state,
        messages: action.payload,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message
});

export default ChatReducer;
