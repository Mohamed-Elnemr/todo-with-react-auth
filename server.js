const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Load api route files
const users = require('./routes/api/users');
const todos = require('./routes/api/todos');

const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB URL
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db,{useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/users', users);
app.use('/api/todos', todos);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));