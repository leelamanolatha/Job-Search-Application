import { AUTHENTICATE_USER } from './actionTypes';
import { getSessionCookie, setSessionCookie } from '../helpers/session';
import * as Cookies from 'js-cookie';
// let logstatus = {
//     username: null,
// };

export const authenticateUser = () => {
  const session = getSessionCookie('session');
  // console.log(logstatus.username);
  if (session) {
    return {
      type: AUTHENTICATE_USER,
      payload: {
        loggedIn: true,
        username: session.username,
      },
    };
  }

  return {
    type: AUTHENTICATE_USER,
    payload: {
      loggedIn: false,
      username:null,
    },
  };
};

export const loginUser = (username) => (dispatch) => {
  
  setSessionCookie({ username });
  // console.log(logstatus.username);
  dispatch(authenticateUser());
};

export const logoutUser = () => (dispatch) => {
    Cookies.remove('session');
    dispatch(authenticateUser());
};

