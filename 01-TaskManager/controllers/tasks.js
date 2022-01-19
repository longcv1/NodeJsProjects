const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async-wrapper');

///////////////////////////////////////////////////////////////////////////////
//@@ Gets all the tasks name
///////////////////////////////////////////////////////////////////////////////
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    if (!tasks) {
        return res.status(404).json({ msg: "Cannot get all tasks!" });
    }
    return res.status(200).json({ msg: "All tasks found", tasks });
});

///////////////////////////////////////////////////////////////////////////////
//@@ Gets specify task name by id
///////////////////////////////////////////////////////////////////////////////
const getTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
        return res.status(404).json({ msg: "Task not found!" });
    }
    return res.status(200).json({ msg: "Task found", task });
});

///////////////////////////////////////////////////////////////////////////////
//@@ Create a new task
///////////////////////////////////////////////////////////////////////////////
const createTask = asyncWrapper(async (req, res) => {
    const newTask = await Task.create(req.body);
    return res.status(201).json({ message: "Task added", newTask });
});

///////////////////////////////////////////////////////////////////////////////
//@@ Update specify task by id
///////////////////////////////////////////////////////////////////////////////
const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        return res.status(404).json({ msg: "Update failed!" });
    }
    return res.status(200).json({ id: taskId, data: req.body });
});

///////////////////////////////////////////////////////////////////////////////
//@@ Delete a task
///////////////////////////////////////////////////////////////////////////////
const deleteTask = asyncWrapper(async (req, res) => {

    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
        return res.status(404).json({ msg: "Delete failed!" });
    }
    return res.status(200).json({ msg: "Task deleted" });
});

//Export module
module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}