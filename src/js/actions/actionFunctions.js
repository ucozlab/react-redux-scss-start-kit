import * as types from './actionTypes';

/****** USER ******/
export const setUserLogin = (isLoggedIn) => {
  return {
    type: types.USER_LOGIN,
    payload: {
      isLoggedIn
    }
  }
};