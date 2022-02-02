const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    minlength: 3,
    maxlength: 50,
    unique:true
  },
});

module.exports = mongoose.model('Users',UserSchema);