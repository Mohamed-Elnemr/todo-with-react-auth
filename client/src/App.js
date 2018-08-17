import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import {PublicRoute, PrivateRoute} from "./router/RouterComponents";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import MyTodos from './components/private/MyTodos';

import { setToken } from './actions/authActions';
import { logoutUser } from './actions/authActionCreators';
import validateToken from './utils/validateToken';

import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super()
    // Get token from local storage
    const token = localStorage.getItem('token')
    // Get validation results
    const { isTokenVal, decoded} = validateToken(token)
    
    if( isTokenVal ){
      // Set auth header
      axios.defaults.headers.common['Authorization'] = token
      // Set store with token data
      store.dispatch(setToken(decoded))

    } else {
      // Remove auth header and remove token
      axios.defaults.headers.common['Authorization'] = ""
      // Set store status
      store.dispatch(logoutUser())
      // Remove token from local storage
      localStorage.removeItem('token')
    }    
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <Navbar/>
          <div className="container" style={{minHeight:"380px", marginTop:"60px"}}>
            <PrivateRoute component={MyTodos} exact path="/myapp"/>
            <PublicRoute component={Landing} exact path="/"/>
            <PublicRoute component={Register} exact path="/register"/>
            <PublicRoute component={Login} exact path="/login"/>
          </div>
          <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

/*   //set authorization header and state
  authOnLogin(token) {
   this.setState( {isAuthen:true, token:token} )
   axios.defaults.headers.common['Authorization'] = token 
  }

  logoutUser(){
    this.setState( {isAuthen:false, token: null} )
    axios.defaults.headers.common['Authorization'] = null
    localStorage.removeItem('token')
  } */
  /* 
  <Navbar isAuthen={this.state.isAuthen} logoutUser={this.logoutUser} />
    <PrivateRoute component={MyTodos} exact path='/myApp' isAuthen={this.state.isAuthen} logoutUser={this.logoutUser} isTokenExpired={this.isTokenExpired} />
    <PublicRoute component={Landing} exact path='/' isAuthen={this.state.isAuthen}/>
    <PublicRoute component={Register} exact path='/register' authOnLogin={this.authOnLogin} isAuthen={this.state.isAuthen}/>
    <PublicRoute component={Login} exact path='/login' authOnLogin={this.authOnLogin} isAuthen={this.state.isAuthen}/>
  */