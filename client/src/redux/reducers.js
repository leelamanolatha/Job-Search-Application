import { AUTHENTICATE_USER } from './actionTypes';

const initialState = {
  loggedIn: undefined, 
  username:null,
};



export function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        username: action.payload.username,
      };
    default:
      return { ...state };
  }
}

