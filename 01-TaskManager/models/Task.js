const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false,
    }
})

//Export module
module.exports = mongoose.model('Task', TaskSchema);
