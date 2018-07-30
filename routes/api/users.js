const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const DataValidator = require('../../validation/dataValidator');

// Load User model
const User = require('../../models/User');

// ******** NEEDS A MIDDLEWARE
// @route   GET api/users/
// @desc    Get Current User
// @access  Private
router.get('/', (req, res) => res.json({
    id: req.user.id,
    name: req.user.name,
    password: req.user.password
  })
);

// @route   Post api/users/register
// @desc    register a new user
// @access  Public
router.post('/register', (req, res) => {
  const dataVal = new DataValidator();
  let errors = {};
  
  if(!dataVal.isDataValid(req.body)){
    const errors = dataVal.errors;
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
    const name = req.body.name
    const password = req.body.password

  User.findOne({name})
    .then(user =>{
      // Check for user
      if (!user) {
        return res.status(404).json('User not found');
      }
      
      res.json({ user })
    })
    .catch(err => res.status(404).json("user is not found"))
});

module.exports = router;