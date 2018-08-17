import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInputCell from "./reusable/TextInputCell"
import { loginUser } from '../../actions/authActionCreators';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // User data
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    // Fire login action
    this.props.loginUser(userData)
  }

  componentDidMount() {
    if (this.props.auth.isAuthen) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthen) {
      this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
                    showError = {false}
                  />
                  <TextInputCell 
                  type="password" 
                  placeholder="Password" 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.onChange} 
                  error={errors.email || errors.password}
                  showError = {true}
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);