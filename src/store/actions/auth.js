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

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
}

export function checkAuthTimeout(expirationTime) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
        const { data: { idToken: token, localId, expiresIn } } = response;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', localId);
        dispatch(authSuccess(token, localId));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch((error) => {
        const message = error.response.data.error.message.replace(/_/, ' ');
        dispatch(authFail(message));
      });
  };
}

export function setAuthRedirectPath(path) {
  return {
    path,
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
  };
}

export function authCheckState() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  };
}
