import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route 
            exact path="/" 
            render={
                    (props) => <Landing {...props}/>
                  }
            />
            <Route 
            exact path="/login" 
            render={
                    (props) => <Login {...props}/>
                  }
            />
            <Route 
            exact path="/register" 
            render={
                    (props) => <Register {...props}/>
                  }
            />
          <Footer />
        </div>
      </Router>
    );
  }
}


export default App;