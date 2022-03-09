/**
 * Dependencies
 */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provide your name'],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Provide your email'],
        maxlength: 50,
        minlength: 3,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Incorrect email'
        }
    },
    password: {
        type: String,
        required: [true, 'Provide your password'],
        maxlength: 50,
        minlength: 3,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
})

UserSchema.pre('save', async function () {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (input) {
    const isMatched = await bcrypt.compare(input, this.password);
    return isMatched;
}

module.exports = mongoose.model('User', UserSchema);