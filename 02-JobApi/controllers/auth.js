/**
 * Dependencies
 */
const Users = require("../models/Users");
const { StatusCode, StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../errors/index");
const Bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

/**
 * Register
 * @param {name, email, password} req
 */
const register = async (req, res) => {
  const user = await Users.create({ ...req.body });
  const token= user.createJwt();
  res.status(StatusCodes.CREATED).json({ user: { name: user.getName() }, token });
};


/**
 * Login
 * @param {name, password} req
 */
const login = async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password) throw new BadRequestError('Please provide your email and password...!');

  const user = await Users.findOne({email});
  if(!user) throw new UnAuthenticatedError('Invalid credential...!');

  const checkPassword = await user.comparePassword(password);
  if(!checkPassword){
    throw new UnAuthenticatedError('Wrong email or password...!');
  }

  const token = user.createJwt();
  res.status(StatusCodes.OK).json({user: {name: user.name}, token});
};

module.exports = { register, login };
