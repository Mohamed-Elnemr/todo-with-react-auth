const express = require('express');
const router = express.Router();

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
  const newUserData = {
    name: req.body.name,
    password: req.body.password
  }

  const newUser = new User( newUserData )
  newUser
    .save()
    .then(
      user => res.json({ user })
    )
    .catch(
      err => console.log(err)
    )
})

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
})
module.exports = router;