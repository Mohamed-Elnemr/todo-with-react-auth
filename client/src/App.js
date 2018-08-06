import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import MyTodos from './components/private/MyTodos';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super()
    // get token from local storage
    let token = localStorage.getItem('token')
    //set authorization header and initialize state
    if (token) {
      axios.defaults.headers.common['Authorization'] = token 
      this.state = { isAuthen: true, token: token }
    } else {
      this.state = { isAuthen : false, token : null }
    }
    this.authOnLogin = this.authOnLogin.bind(this)
    this.logoutUser  = this.logoutUser.bind(this)
}

  //set authorization header and state
  authOnLogin(token) {
  this.setState( {isAuthen:true, token:token} )
  axios.defaults.headers.common['Authorization'] = token 
  }

  logoutUser(){
  this.setState( {isAuthen:false, token: null} )
  axios.defaults.headers.common['Authorization'] = null
  localStorage.removeItem('token')
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar isAuthen={this.state.isAuthen} logoutUser={this.logoutUser}/>
          <Route 
            exact path="/myApp"
            render={
                    (props) => <MyTodos {...props} isAuthen={this.state.isAuthen}/>
                  }
          />
          <Route 
            exact path="/" 
            render={
                    (props) => <Landing {...props} isAuthen={this.state.isAuthen}/>
                  }
            />
            <Route 
            exact path="/login" 
            render={
                    (props) => <Login {...props} authOnLogin={this.authOnLogin} isAuthen={this.state.isAuthen}/>
                  }
            />
            <Route 
            exact path="/register" 
            render={
                    (props) => <Register {...props} authOnLogin={this.authOnLogin} isAuthen={this.state.isAuthen}/>
                  }
            />
          <Footer />
        </div>
      </Router>
    );
  }
}


export default App;