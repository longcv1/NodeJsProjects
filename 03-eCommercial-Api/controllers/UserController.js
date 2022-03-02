const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomeError = require('../errors');

const getAllUsers = async(req,res) => {
    console.log("getAllUser: ", req.user);
    const users = await User.find({role:'user'}).select('-password');
    res.status(StatusCodes.OK).json({users:users});
}

const getSingleUser = async(req,res) => {
    const user = await User.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new CustomeError.NotFoundError('User not found!');
    }
    res.status(StatusCodes.OK).json({user:user});
}

const showCurrentUser = async(req,res) => {
    res.status(StatusCodes.OK).json({user:req.user});
}

const updateUser = async(req,res) => {
    //To do   
}

const updateUserPassword = async(req,res) => {
    //To do   
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
};