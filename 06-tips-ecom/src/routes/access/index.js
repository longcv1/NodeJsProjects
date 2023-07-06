const express = require('express');
const controllerAccess = require('../../controllers/controller.access');
const { authentication } = require('../../auth/authUtils');
const asyncHandler = require('../../libs/async.handler');
const router = express.Router();

router.post('/login', asyncHandler(controllerAccess.login));
router.post('/signup', asyncHandler(controllerAccess.signup));

// Authentication
router.use(authentication);

router.post('/logout', asyncHandler(controllerAccess.logout));
router.post('/handleRefreshToken', asyncHandler(controllerAccess.handleRefreshToken));

module.exports = router;