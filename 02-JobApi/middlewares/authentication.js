const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const {UnAuthenticatedError} = require('../errors/index');

const Auth = (req, res, next) => {
  const authHeader = req.headers.authentication;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Authentication invalid!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, "jwtSecret");
    const user = Users.findById(payload.id).select('-password');
    req.user = user;
    //req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    throw new UnAuthenticatedError("Authentication failed!");
  }
};

module.exports = Auth;