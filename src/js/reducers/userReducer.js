import * as types from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
};

export default function(state = initialState, action) {

  switch(action.type) {

    case types.USER_LOGIN:
      return Object.assign({}, state, {
        ...action.payload
      });

  }

  return state;

}