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

//______________________________________________________________________________________________________________
// @route   GET api/profile
// @desc    GET current Uesr todos
// @access  Private
router.get('/', jwtMidware,  (req, res) => {
  let errors = {};

  Todo.find({ owner: req.user._id })
  .populate('owner', ['name'])
  .then(todos => {
     if (!todos) {
       errors.todos = 'There is no todos for this user';
       res.status(404).json(errors);
     }

     res.json(todos);
  })
  .catch((err)=>{res.status(404).json(err)});

});

//______________________________________________________________________________________________________________
// @route   GET api/todos/owner/:user_id
// @desc    Get todos by user id
// @access  private
router.get('/owner/:owner_id', jwtMidware, (req, res) => {
  let errors = {};

  // Check if the logged in user is the one making the request
  if (req.params.owner_id != req.user._id) {
    return res
      .status(401)
      .json({ notauthorized: 'User not authorized' });
  } 

  // Find user relative todos
  Todo.find({ owner: req.params.owner_id })
  .populate('owner', ['name'])
  .then(todos => {
     if (!todos) {
       errors.todos = 'There is no todos for this user';
       res.status(404).json(errors);
     }

     res.json(todos);
  })
  .catch(err =>
     res.status(404).json({ todos: 'There are no todos for this user' })
  );
});

//______________________________________________________________________________________________________________
// @route   DELETE api/todos/:id
// @desc    Delete todo
// @access  Private
router.delete('/:id', jwtMidware, (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => {
      // Check for todo owner
      if (todo.owner.toString() !== req.user._id.toString()) {
        return res
          .status(401)
          .json({ notauthorized: 'User not authorized' });
      }
      // Delete
      todo.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ todonotfound: 'No todo found' }))
});

module.exports = router;