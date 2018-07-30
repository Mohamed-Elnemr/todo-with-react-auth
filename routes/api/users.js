const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const jwtMidware = require("../../middleware/jwtMidware");

// Load User model
const User = require('../../models/User');

// Load Input data Validator
const DataValidator = require('../../validation/dataValidator');

// @route   GET api/users/
// @desc    Get Current User
// @access  Private
router.get('/', jwtMidware, (req, res) => res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
);

// @route   Post api/users/register
// @desc    register a new user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = DataValidator(req.body, "register");

  // Check Validation 
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    };

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
      })
    })
  })
});

// @route   Post api/users/login
// @desc    login a user
// @access  Public
router.post('/login', (req, res) => {  
  const { errors, isValid } = DataValidator(req.body);

  // Check Validation 
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  // User Login data 
  const email = req.body.email
  const password = req.body.password

  // Find user in DB
  User.findOne({email})
    .then(user =>{
      // Check if email exists
      if (!user) {
        return res.status(404).json('User not found');
      }
      
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Pass matched with hashed one
          const payload = { id: user.id, name: user.name }; // Create JWT Payload
  
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600*24 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          res.status(400).json(errors);
        }
      });
    })
    .catch(err => res.status(400).json("user is not found"))
});

module.exports = router;