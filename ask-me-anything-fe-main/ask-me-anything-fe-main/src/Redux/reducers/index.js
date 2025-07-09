import { combineReducers } from 'redux';
import userReducer from './UserReducer.js';
import hotelReducer from './HotelReducer.js'
import staycationReducer from './StaycationReducers.js'
import ChatReducer from './ChatReducer.js'



const rootReducer = combineReducers({
  user: userReducer,
  hotel:hotelReducer,
  staycation : staycationReducer,
  chat:ChatReducer
});

export default rootReducer;
