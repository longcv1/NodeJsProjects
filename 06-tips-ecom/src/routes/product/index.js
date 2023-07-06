const express = require('express');
const productController = require('../../controllers/controller.product');
const { authentication } = require('../../auth/authUtils');
const asyncHandler = require('../../libs/async.handler');
const router = express.Router();

// Authentication
router.use(authentication);

router.post('/', asyncHandler(productController.createProduct));

module.exports = router;