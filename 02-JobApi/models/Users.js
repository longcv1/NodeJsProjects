const mongoose = require("mongoose");
const Bcrypt = require("bcrypt");

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

module.exports = mongoose.model("Users", UserSchema);
