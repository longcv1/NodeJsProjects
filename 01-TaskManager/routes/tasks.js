const express = require('express');
const router = express.Router();
const { getAllTasks,
        getTask,
        updateTask,
        createTask,
        deleteTask
      } = require('../controllers/tasks');

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

//Export module
module.exports = router;