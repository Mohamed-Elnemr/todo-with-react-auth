import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {PublicRoute, PrivateRoute} from "./router/RouterComponents";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import MyTodos from './components/private/MyTodos';
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
        <Navbar isAuthen={this.state.isAuthen} logoutUser={this.logoutUser} />
        <div className="container" style={{minHeight:"380px", marginTop:"60px"}}>
          <PrivateRoute component={MyTodos} exact path='/myApp' isAuthen={this.state.isAuthen}  />
          <PublicRoute component={Landing} exact path='/' isAuthen={this.state.isAuthen}/>
          <PublicRoute component={Register} exact path='/register' authOnLogin={this.authOnLogin} isAuthen={this.state.isAuthen}/>
          <PublicRoute component={Login} exact path='/login' authOnLogin={this.authOnLogin} isAuthen={this.state.isAuthen}/>
        </div>
        <Footer  />
        </div>
      </Router>
    );
  }
}

export default App;