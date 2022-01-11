const express = require('express');
const router = express.Router();
const { getAllTasks,
        getTask,
        updateTask,
        createTask,
        deleteTask } = require('../controllers/tasks')


router.get('/', getAllTasks);


router.get('/:id', getTask);

router.post('/', createTask);

router.put('/task=?:/id', updateTask);

router.delete('/:id', deleteTask);

module.exports = router;