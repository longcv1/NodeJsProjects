const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.connect(url);
}

//Export module
module.exports = connectDB;
