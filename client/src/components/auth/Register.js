import React, { Component } from 'react';
import {registerAction} from "./actions/authActions"
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
    this.setStateWithErrors = this.setStateWithErrors.bind(this);
  }

  setStateWithErrors(errors){
    this.setState({ errors })
  }

  componentWillMount() {
    if (this.props.isAuthen === true) {
      this.props.history.push('/');
    }
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

    registerAction(
      newUser, 
      this.props.history, 
      this.props.authOnLogin, 
      this.setStateWithErrors
    )
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
