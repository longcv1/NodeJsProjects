const express = require('express');
const router = express.Router();

const productController = require('../../controllers/controller.product');
const { authentication } = require('../../auth/authUtils');
const asyncHandler = require('../../libs/async.handler');

router.get('/search/:keySearch', asyncHandler(productController.getListSearchProducts));
router.get('', asyncHandler(productController.findAllProducts));
router.get('/:product_id', asyncHandler(productController.findProduct));

// Authentication
router.use(authentication);

router.post('/', asyncHandler(productController.createProduct));
router.post('/publish/:id', asyncHandler(productController.publishProductForShop));
router.post('/un-publish/:id', asyncHandler(productController.unPublishProductForShop));
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
router.get('/published/all', asyncHandler(productController.getAllPublishForShop))

module.exports = router;