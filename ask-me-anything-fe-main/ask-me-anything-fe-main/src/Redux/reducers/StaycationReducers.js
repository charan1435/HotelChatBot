import {
  CREATE_USER_STAYCATION_REQUEST,
  CREATE_USER_STAYCATION_SUCCESS,
  CREATE_USER_STAYCATION_FAILURE,
  FETCH_USER_STAYCATIONS_REQUEST,
  FETCH_USER_STAYCATIONS_SUCCESS,
  FETCH_USER_STAYCATIONS_FAILURE
} from "../types/StaycationType";

const initialState = {
  staycations: [],
  staycation: {
    loading: false,
    error: null,
    success: null
  }
};

const StaycationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_STAYCATION_REQUEST:
      return {
        ...state,
        staycation: {
          ...state.staycation,
          loading: true,
        }
      };
    case CREATE_USER_STAYCATION_SUCCESS:
      return {
        ...state,
        staycation: {
          ...state.staycation,
          loading: false,
          error: null,
          success: action.payload
        }
      };
    case CREATE_USER_STAYCATION_FAILURE:
      return {
        ...state,
        staycation: {
          ...state.staycation,
          loading: false,
          error: action.payload,
          success: null
        }
      };
    case FETCH_USER_STAYCATIONS_REQUEST:
      return {
        ...state,
        staycation: {
          ...state.staycation,
          loading: true,
        }
      };
    case FETCH_USER_STAYCATIONS_SUCCESS:
      return {
        ...state,
        staycation: {
          ...state.staycation,
          loading: false,
          error: null,
          success: null
        },
        staycations: action.payload
      };
    case FETCH_USER_STAYCATIONS_FAILURE:
      return {
        ...state,
        staycation: {
          ...state.staycation,
          loading: false,
          error: action.payload,
          success: null
        }
      };
    default:
      return state;
  }
};

export default StaycationReducer;
