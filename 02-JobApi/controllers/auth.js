/**
 * Dependencies
 */
const Users = require("../models/Users");
const { StatusCode, StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/index");
const Bcrypt = require("bcrypt");

/**
 * Register
 * @param {name, email, password} req
 */
const register = async (req, res) => {
  const user = await Users.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(req.body);
};


/**
 * Login
 * @param {name, password} req
 */
const login = async (req, res) => {
  res.send("login");
};

module.exports = { register, login };
