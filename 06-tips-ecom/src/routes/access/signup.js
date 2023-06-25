const express = require('express');
const controllerAccess = require('../../controllers/controller.access');
const asynHandler = require('../../core/asyn.handler');
const router = express.Router();

router.post('/signup', asynHandler(controllerAccess.signUp));

module.exports = router;