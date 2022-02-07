const mongoose = require("mongoose");
const Bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minlength: 3,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await Bcrypt.genSalt(10);
  this.password = await Bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getName = function () {
  return this.name;
};

UserSchema.methods.createJwt = function () {
  return jwt.sign({ userId: this._id, name: this.name }, "jwtSecret", {
    expiresIn: "30d",
  });
};

UserSchema.methods.comparePassword = async function (input) {
  const salt = await Bcrypt.genSalt(10);
  tempPassword = await Bcrypt.hash(input, salt);
  return isMatch = await Bcrypt.compare(input, this.password);
};

module.exports = mongoose.model("Users", UserSchema);
