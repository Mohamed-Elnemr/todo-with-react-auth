import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import MyTodos from './components/private/MyTodos';

import { setToken } from './actions/authActions';
import { logoutUser } from './actions/authActionCreators';
import {validateToken} from './utils/validateToken';

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
            <Route component={MyTodos} exact path="/myapp"/>
            <Route component={Landing} exact path="/"/>
            <Route component={Register} exact path="/register"/>
            <Route component={Login} exact path="/login"/>
          </div>
          <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;