import React, { Component } from 'react';
import axios from 'axios';
import TextInputCell from "./reusable/TextInputCell"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      isAuthen: this.props.isAuthen
    };
    this.onChange           = this.onChange.bind(this);
    this.onSubmit           = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
    .post('/api/users/register', newUser)
    .then( () =>
        axios
        .post ( "/api/users/login", newUser)
        .then( res => {
          // Get token from the response then set it to localStorage
          const token = res.data.token
          localStorage.setItem('token', token);
        })
        .catch( err => 
          this.setState({ errors: err.response.data })
        )
    )
    .catch( err => this.setState({ errors:err.response.data }))
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextInputCell 
                  type="text" 
                  placeholder="Name" 
                  name="name" 
                  value={this.state.name} 
                  onChange={this.onChange} 
                  error={errors.name}
                />
                <TextInputCell 
                  type="email" 
                  placeholder="Email Address" 
                  name="email" 
                  value={this.state.email} 
                  onChange={this.onChange} 
                  error={errors.email}
                />
                <TextInputCell 
                  type="password" 
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.onChange} 
                  error={errors.password}
                />
                <TextInputCell 
                  type="password" 
                  placeholder="Password" 
                  name="password2" 
                  value={this.state.password2} 
                  onChange={this.onChange} 
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
