const express = require('express');
const controllerAccess = require('../../controllers/controller.access');
const asynHandler = require('../../libs/asyn.handler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.post('/login', asynHandler(controllerAccess.login));
router.post('/signup', asynHandler(controllerAccess.signup));

// Authentication
router.use(authentication);

router.post('/logout', asynHandler(controllerAccess.logout));
router.post('/handleRefreshToken', asynHandler(controllerAccess.handleRefreshToken));

module.exports = router;