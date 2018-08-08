const Validator = require('validator');
const isEmpty = require('./utils/is-empty');

// valType should be either "login" or "register"
DataValidator = ( data, valType = "login" ) => {
  let errors = {};

  // If input data is null or undefined, set it as an empty string as Validator only checks strings
  if ( valType === "register" || valType === "login" ) {
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
  }
  
  if ( valType === "register") {
    data.name = !isEmpty(data.name) ? data.name : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  }

  if (valType === "todo") {
    data.text = !isEmpty(data.text) ? data.text : '';
  }

  // Login and Registeration data 
  if ( valType === "register" || valType === "login" ) {

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (Validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
    }

  }
  // Registeration data only 
  if ( valType === "register") {

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
      errors.name = 'Name field is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Passwords must match';
    }

    if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Confirm Password field is required';
    }

  }

  // Todo creation data only 
  if ( valType === "todo") {

    if (!Validator.isLength(data.text, { min: 2, max: 100 })) {
      errors.text = 'text must be between 2 and 100 characters';
    }

    if (Validator.isEmpty(data.text)) {
      errors.text = 'text field is required';
    }

  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = DataValidator