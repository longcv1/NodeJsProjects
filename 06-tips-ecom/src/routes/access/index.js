const express = require('express');
const controllerAccess = require('../../controllers/controller.access');
const asynHandler = require('../../core/asyn.handler');
const router = express.Router();

router.post('/login', asynHandler(controllerAccess.login));
router.post('/signup', asynHandler(controllerAccess.signup));

module.exports = router;