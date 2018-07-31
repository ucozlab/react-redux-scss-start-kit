import { combineReducers } from 'redux';
import userReducer from "./userReducer";

// Combine Reducers
export const reducers = combineReducers({
  userState: userReducer,
});