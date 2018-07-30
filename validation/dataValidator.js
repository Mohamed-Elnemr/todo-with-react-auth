const Validator = require('validator');
const isEmpty = require('./utils/is-empty');

class DataValidator {
  
  constructor() {
    this.errors = {};
    this.isValid = false;
  }

  // If input data is null or undefined, set it as an empty string as Validator only checks strings
  setData(data) {
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  }

  // Custom errors for input register data
  validateInput(data){
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      this.errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
      this.errors.name = 'Name field is required';
    }

    if (!Validator.isEmail(data.email)) {
      this.errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
      this.errors.email = 'Email field is required';
    }
  
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      this.errors.password = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(data.password)) {
      this.errors.password = 'Password field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
      this.errors.password2 = 'Passwords must match';
    }

    if (Validator.isEmpty(data.password2)) {
      this.errors.password2 = 'Confirm Password field is required';
    }

  }

  isDataValid(data){
    this.setData(data)
    this.validateInput(data)
    return isEmpty(this.errors)
  }

}

module.exports = DataValidator