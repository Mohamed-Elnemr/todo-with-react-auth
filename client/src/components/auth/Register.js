import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInputCell from "./reusable/TextInputCell"
import { registerUser } from '../../actions/authActionCreators';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
    this.onChange           = this.onChange.bind(this);
    this.onSubmit           = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // Fire register action
    this.props.registerUser(userData)
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);