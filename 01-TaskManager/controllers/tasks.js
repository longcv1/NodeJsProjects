const Task = require('../models/Task');


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

const getTask = async(req, res) => {
    const {id:taskId} = req.params;
    try {
        const task = await Task.findOne({_id:taskId});
        if(!task){
            return res.status(404).json({msg:"Task not found!"});
        }
        return res.status(200).json({msg: "Task found"},task);
    } catch (error) {
        res.status(500).json({msg:error});
    }
};

const createTask = async (req, res) => {
    const newTask = await Task.create(req.body);
    try {
        res.status(201).json({message: "Task added", newTask});
    } catch (error) {
        res.status(500).json({msg:error});    
    }
};

const updateTask = (req, res) => {
    res.send('Update task');
};

const deleteTask = (req, res) => {
    res.send('Delete a task');
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}