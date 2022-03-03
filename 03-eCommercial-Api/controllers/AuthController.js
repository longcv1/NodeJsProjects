/**
 * Add Dependencies
 */
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
const {attachCookiesToRes, createTokenUser} = require('../utils');
const { create } = require('../models/User');


///////////////////////////////////////////////////////////////////////////////
//@@ Helper function to setting token and cookies
//@@ input: name, userId, role
///////////////////////////////////////////////////////////////////////////////
function settingTokenAndCookies(user, res) {
    //const tokenUser = { name: user.name, userId: user._id, role: user.role };
    const tokenUser = createTokenUser(user);
    const token = attachCookiesToRes({ res, user: tokenUser });
    console.log(token);
    res.status(StatusCodes.CREATED).json({ user: tokenUser, token:token });
}

///////////////////////////////////////////////////////////////////////////////
//@@ Register
//@@ input: name, email, password
///////////////////////////////////////////////////////////////////////////////
const register = async (req, res) => {
    const {email} = req.body;
    const isEmailExisted = await User.findOne({email});
    if(isEmailExisted){
        throw new CustomError.BadRequestError('Email already existed!');
    }
    const user = await User.create(req.body);
    settingTokenAndCookies(user, res);
}

///////////////////////////////////////////////////////////////////////////////
//@@ Login
//@@ input: name, email, password
///////////////////////////////////////////////////////////////////////////////
const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError('Provide email and password!');
    }

    const user = await User.findOne({email});
    if(!user){
        throw new CustomError.UnauthenticatedError('Wrong email!');
    }
    const isMatchedPassword = await user.comparePassword(password);
    
    if(!isMatchedPassword){
        throw new CustomError.UnauthenticatedError('Wrong password!');
    }
    settingTokenAndCookies(user, res);
}

///////////////////////////////////////////////////////////////////////////////
//@@ Logout
//@@ input: token
///////////////////////////////////////////////////////////////////////////////
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({msg:'Logged out'});
}

module.exports = {
    register,
    login,
    logout
}