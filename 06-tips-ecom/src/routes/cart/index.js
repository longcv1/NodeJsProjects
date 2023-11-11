const express = require('express');
const router = express.Router();

const cartController = require('../../controllers/controller.cart');
const asyncHandler = require('../../libs/async.handler');

router.post('', asyncHandler(cartController.addToCart));
router.delete('', asyncHandler(cartController.deleteCart));
//router.post('/update', asyncHandler(cartController.update));
router.get('', asyncHandler(cartController.listToCart));

module.exports = router;