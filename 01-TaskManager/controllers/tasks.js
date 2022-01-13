const Task = require('../models/Task');

///////////////////////////////////////////////////////////////////////////////
//@@ Gets all the tasks name
///////////////////////////////////////////////////////////////////////////////
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        if(!tasks){
            return res.status(404).json({msg:"Cannot get all tasks!"});
        }
        return res.status(200).json({msg:"All tasks found", tasks});
    } catch (error) {
        res.status(500).json({msg:error});
    }
};

///////////////////////////////////////////////////////////////////////////////
//@@ Gets specify task name by id
///////////////////////////////////////////////////////////////////////////////
const getTask = async (req, res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOne({_id:taskId});
        if(!task){
            return res.status(404).json({msg:"Task not found!"});
        }
        return res.status(200).json({msg: "Task found", task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
};

///////////////////////////////////////////////////////////////////////////////
//@@ Create a new task
///////////////////////////////////////////////////////////////////////////////
const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        return res.status(201).json({message: "Task added", newTask});
    } catch (error) {
        return res.status(500).json({msg:error});    
    }
};

///////////////////////////////////////////////////////////////////////////////
//@@ Update specify task by id
///////////////////////////////////////////////////////////////////////////////
const updateTask = async (req, res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskId},req.body,{
            new:true,
            runValidators:true
        });
        if(!task){
            return res.status(404).json({msg:"Update failed!"});
        }
        return res.status(200).json({id:taskId, data:req.body});
    } catch (error) {
        res.status(500).json({msg:error});
    }
};

///////////////////////////////////////////////////////////////////////////////
//@@ Delete a task
///////////////////////////////////////////////////////////////////////////////
const deleteTask = async (req, res) => {
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOneAndDelete({_id:taskId});
        if(!task){
            return res.status(404).json({msg:"Delete failed!"});
        }
        return res.status(200).json({msg: "Task deleted"});
    } catch (error) {
        res.status(500).json({msg:error});
    }
};

//Export module
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}