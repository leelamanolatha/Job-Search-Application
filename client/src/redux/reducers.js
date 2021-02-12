import { AUTHENTICATE_USER } from './actionTypes';

const initialState = {
  loggedIn: undefined, 
  username:null,
};

// const initialRegister = {
//   token: null,
// };

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

// export function registerReducer(state = initialRegister, action) {
//   switch (action.type) {
//     case REGISTER_USER:
//       return { ...state, token: action.payload };
//     default:
//       return { ...state };
//   }
// }
