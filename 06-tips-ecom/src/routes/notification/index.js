const express = require('express');
const router = express.Router();

const notificationController = require('../../controllers/controller.notification');
const asyncHandler = require('../../libs/async.handler');

router.post('/', asyncHandler(notificationController.publishNotiToSystem));
router.get('/', asyncHandler(notificationController.listNotiByUser));

module.exports = router;