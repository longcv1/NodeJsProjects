const express = require('express');
const router = express.Router();

const inventoryController = require('../../controllers/controller.inventory');
const asyncHandler = require('../../libs/async.handler');

router.post('/', asyncHandler(inventoryController.addStockToInventory));


module.exports = router;