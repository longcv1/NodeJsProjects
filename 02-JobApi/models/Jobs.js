const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    require: true,
    maxlength: 50,
  },
  position: {
    type: String,
    require: true,
    maxlength: 50,
  },
  status:{
     type: String,
     enum: ['interview', 'declined', 'pending'],
     default: 'pending',
  }
});

module.exports = mongoose.model("Jobs", JobSchema);
