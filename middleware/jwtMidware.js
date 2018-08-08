const jwtSecret            = require("../config/keys").jwtSecret;
const extractTokenFromHeader = require("./utils/extractTokenFromHeader")
const jwt                    = require('jsonwebtoken');
const User                   = require('../models/User');

jwtMidware = function (req,res,next) {
  // Get token from Header
  token = extractTokenFromHeader(req)
  return !token ? res.status(401).send("Unauthorized, no token"):

  // Verify the token and set user id
  jwt.verify(token, jwtSecret, (err, decoded) => {
    return err ? res.status(401).send("Unauthorized, bad token"):
      // Find user with the decoded id in token then set header
      User.findById(decoded.id) 
        .then(user => {
          // if Found, Set User to the req object //should be filterd out in the response
          return !user ? res.status(404).send("user not found"):
              ( req.user = user, next() );
        })
        .catch(err => console.log(err));
  });
}

module.exports = jwtMidware