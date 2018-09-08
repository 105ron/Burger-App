import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: '',
  loading: false,
};

function authStart(state) {
  return updateObject(state, { error: '', loading: true });
}

function authSuccess(state, action) {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: '',
    loading: false,
  });
}

function authFail(state, action) {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
}

function authLogout(state) {
  return updateObject(state, { token: null, userId: null });
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    default:
      return state;
  }
}

export default reducer;
