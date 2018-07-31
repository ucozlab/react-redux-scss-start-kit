import * as types from '../actions/actionTypes';


const initialState = {
  newsPopupOpened: false,
};

export default function(state = initialState, action) {

  switch(action.type) {

    case types.TOGGLE_ADD_NEWS_POPUP:
      return Object.assign({}, state, {
        ...action.payload
      });

  }

  return state;

}