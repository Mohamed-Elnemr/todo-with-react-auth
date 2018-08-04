import React, { Component } from 'react';
import {loginAction} from "./actions/authActions"
import TextInputCell from "./reusable/TextInputCell"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isAuthen: this.props.isAuthen
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setStateWithErrors = this.setStateWithErrors.bind(this);
  }

  setStateWithErrors(errors){
    this.setState({ errors })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // User data
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    // Fire login action
    loginAction(
      user, 
      this.props.history, 
      this.props.authOnLogin, 
      this.setStateWithErrors
    )
  }
  
  componentWillMount() {
    if (this.props.isAuthen === true) {
      this.props.history.push('/');
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                  <TextInputCell 
                    type="email" 
                    placeholder="Email Address" 
                    name="email" 
                    value={this.state.email} 
                    onChange={this.onChange} 
                    error={errors.email || errors.password}
                    HighlightFieldOnError = {false}
                  />
                  <TextInputCell 
                  type="password" 
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.onChange} 
                  error={errors.email || errors.password}
                  HighlightFieldOnError = {true}
                  customErrorMsg = "Email or Password is incorrect"
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

export default Login;
