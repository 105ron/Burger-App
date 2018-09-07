import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export function authStart() {
  return {
    type: actionTypes.AUTH_START,
  };
}

export function authSuccess(idToken, userId) {
  return {
    idToken,
    userId,
    type: actionTypes.AUTH_SUCCESS,
  };
}

export function authFail(error) {
  return {
    error,
    type: actionTypes.AUTH_FAIL,
  };
}

export function auth(email, password, isSignUp) {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    if (!isSignUp) url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    axios.post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((error) => {
        const message = error.response.data.error.message.replace(/_/, ' ');
        dispatch(authFail(message));
      });
  };
}