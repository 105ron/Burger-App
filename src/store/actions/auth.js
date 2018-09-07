import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export function authStart() {
  return {
    type: actionTypes.AUTH_START,
  };
}

export function authSuccess(authData) {
  return {
    authData,
    type: actionTypes.AUTH_SUCCESS,
  };
}

export function authFail(error) {
  return {
    error,
    type: actionTypes.AUTH_FAIL,
  };
}

export function auth(email, password) {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail());
      });
  };
}
