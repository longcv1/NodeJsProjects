'use strict'

const { SuccessResponse } = require("../core/sucess.response");
const InventoryService = require("../services/service.inventory");


class InventoryController {
   addStockToInventory = async(req, res) => {
      new SuccessResponse({
         message: 'Added stock to inventory',
         metadata: await InventoryService.addStockToInventory(req.body),
      }).send(res);
   }
}

module.exports = new InventoryController;