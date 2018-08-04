import axios from 'axios';

// user/newUser: is the user data
// history is sent from <route component> props
// authOnLogin is a method passed down from <app> methods to <components> as a props then to here
// setStateWithErrors is a method passed down from <components> to set their state with errors

export const loginAction = (user, history, authOnLogin, setStateWithErrors) => {
  axios
  .post ( "/api/users/login", user)
  .then( res => {
    // Get token from the response then set it to localStorage
    const token = res.data.token
    localStorage.setItem('token', token);
    // Send token to authOnLogin and Redirect
    authOnLogin(token)
    history.push('/myApp')
  })
  .catch( err => 
      setStateWithErrors(err.response.data),
  );
}

export const registerAction = (newUser, history, authOnLogin, setStateWithErrors) => {
  axios
    .post('/api/users/register', newUser)
    .then( () =>
      loginAction(
        newUser,
        history,
        authOnLogin,
        setStateWithErrors
      )
    )
    .catch( err => setStateWithErrors(err.response.data));
}