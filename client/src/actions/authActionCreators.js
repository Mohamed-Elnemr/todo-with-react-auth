import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { clearAuthStatus, setErrors, setToken } from './authActions';

export const registerUser = (userData) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then( () => 
      axios
        .post ( "/api/users/login", userData)
        .then( res => 
          handleToken(res.data.token, dispatch) 
        )
        .catch( err => 
          dispatch(setErrors(err.response.data))
        )
    )
    .catch( err => 
      dispatch(setErrors(err.response.data))
    )
}

export const loginUser = (userData) => dispatch => {
  axios
    .post ( "/api/users/login", userData )
    .then( res => 
      handleToken(res.data.token, dispatch) 
    )
    .catch( err => 
      dispatch(setErrors(err.response.data)) 
    )
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = ""
  dispatch( clearAuthStatus() )
}

function handleToken(token, dispatch) {
  // Decode token
  const decoded = jwt_decode(token);
  // Set token in localStorage
  localStorage.setItem('token', token);
  // Set token in store
  dispatch( setToken(decoded) )
}