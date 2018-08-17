import { SET_AUTH_STATUS, SET_ERRORS, REST_AUTH_STATUS } from './types';

// Clear store's logged in user status
export const clearAuthStatus = errors => {
  return {
    type: REST_AUTH_STATUS,
    payload: null
  }
};

// Set errors in store
export const setErrors = errors => {
  return {
    type: SET_ERRORS,
    payload: errors
  }
};

// Set token in store
export const setToken = decoded => {
  return {
    type: SET_AUTH_STATUS,
    payload: decoded
  };
};