const express = require('express');
const router = express.Router();
const jwtMidware = require("../../middleware/jwtMidware");

// Load User and Todo model
const User = require('../../models/User');
const Todo = require('../../models/Todo');

//______________________________________________________________________________________________________________
// @route   POST api/todos
// @desc    Create a new todo
// @access  Private
router.post("/", jwtMidware, (req,res)=>{
  const { errors, isValid } = DataValidator(req.body, "todo");

  // Check Validation 
  if (!isValid) {
      return res.status(400).json(errors);
  }

  newTodo = new Todo({
    text: req.body.text, owner: req.user._id
  })
  
  newTodo
    .save()
    .then((todo)=>{
        res.json(todo)
    })
})

module.exports = router;