import { SET_AUTH_STATUS, REST_AUTH_STATUS } from '../actions/types';

const initialState = {
  isAuthen: false,
  tokenData: {}
}

const authReducer = (state = initialState, action) =>{
  switch(action.type){
    case SET_AUTH_STATUS:
      return {
          ...state,
          isAuthen: true,
          tokenData: action.payload
        }
    case REST_AUTH_STATUS:
      return {
          ...initialState
        }
    default: 
      return state
  }
}

export default authReducer