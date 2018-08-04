import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    const authLinks = (
      <span>
        <Link to="/register" className="btn btn-lg btn-info mr-2">
          Sign Up
          </Link>
          <Link to="/login" className="btn btn-lg btn-light">
          Login
        </Link>
      </span>
    )
    const guestLinks = (
      <span>
        <Link to="/myApp" className="btn btn-lg btn-info mr-2">
          Go to the App
          </Link>
      </span>
    )
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-dark">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Todo App</h1>
                <p className="lead">
                  A MERN: (Mongodb, Express, React and Nodejs) stack Todo application with JWT authentication system 
                </p>
                <hr />
                {this.props.isAuthen === false ? authLinks: guestLinks}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
