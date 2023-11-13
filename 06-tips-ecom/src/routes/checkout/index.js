const express = require('express');
const router = express.Router();

const checkoutController = require('../../controllers/controller.checkout');
const asyncHandler = require('../../libs/async.handler');

router.post('/review', asyncHandler(checkoutController.checkoutReview));


module.exports = router;