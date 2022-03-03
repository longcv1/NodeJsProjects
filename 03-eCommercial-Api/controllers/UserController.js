/**
 * Add dependencies
 */
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomeError = require("../errors");
const {createTokenUser, attachCookiesToRes} = require('../utils');

///////////////////////////////////////////////////////////////////////////////
//@@ Get All Users
///////////////////////////////////////////////////////////////////////////////
const getAllUsers = async (req, res) => {
  console.log("getAllUser: ", req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users: users });
};

///////////////////////////////////////////////////////////////////////////////
//@@ Get Single User
///////////////////////////////////////////////////////////////////////////////
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomeError.NotFoundError("User not found!");
  }
  res.status(StatusCodes.OK).json({ user: user });
};

///////////////////////////////////////////////////////////////////////////////
//@@ Show Current User
///////////////////////////////////////////////////////////////////////////////
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

///////////////////////////////////////////////////////////////////////////////
//@@ Update User Information
///////////////////////////////////////////////////////////////////////////////
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if(!email || !name){
      throw new CustomeError.BadRequestError('Please provide your email and your name!');
  }
  const user = User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToRes({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

///////////////////////////////////////////////////////////////////////////////
//@@ Update User Password
///////////////////////////////////////////////////////////////////////////////
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomeError.BadRequestError("Provide your valid password!");
  }

  const user = await User.findOne({ _id: req.user.userId });
  console.log(user);
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomeError.BadRequestError("Wrong old password!");
  }

  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Update password successfully!" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
