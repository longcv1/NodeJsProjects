const Task = require('../models/Task');


const getAllTasks = (req, res) => {
    res.send('Get all tasks');
};

const getTask = (req, res) => {
    res.send('Get a single task');
};

const createTask = async (req, res) => {
    const newTask = await Task.create(req.body);
    res.status(201).json({message: "Added Successful", newTask});
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