import isEmpty from './is-empty'
import jwtDecode from "jwt-decode"

export const isTokenExpired = (decoded) => {
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime ? true : false
  }

  export const validateToken = (token) => {
  if ( !isEmpty(token) ) {
    const decoded = jwtDecode(token);
    return isTokenExpired(decoded) ? {isTokenVal:false, decoded:null}: {isTokenVal:true, decoded}

  } else {
    return {isTokenVal:false, decoded:null}
  }
}