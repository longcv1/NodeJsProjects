const Task = require('../models/Task');


const getAllTasks = (req, res) => {
    res.send('Get all tasks');
};

const getTask = (req, res) => {
    res.send('Get a single task');
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