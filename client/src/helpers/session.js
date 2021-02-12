import React from 'react';
import * as Cookies from 'js-cookie';

// set the session details
export const setSessionCookie = (session) => {
  Cookies.remove('session');
  Cookies.set('session', session, { expires: 1 });
};

// retrieve the session object
export const getSessionCookie = () => {
  const sessionCookie = Cookies.get('session');
  if (sessionCookie === undefined) {
    return null;
  }
  return JSON.parse(sessionCookie);
};

export const SessionContext = React.createContext(getSessionCookie());
