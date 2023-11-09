const express = require('express');
const router = express.Router();

const discountController = require('../../controllers/controller.discount');
const { authentication } = require('../../auth/authUtils');
const asyncHandler = require('../../libs/async.handler');

router.post('/amount', asyncHandler(discountController.getDiscountAmount));
router.get('/list-product-code', asyncHandler(discountController.getAllDiscountCodesWithProduct));

// Authentication
router.use(authentication);
router.post('', asyncHandler(discountController.createDiscountCode));
router.get('', asyncHandler(discountController.getAllDiscountCodes));

module.exports = router;