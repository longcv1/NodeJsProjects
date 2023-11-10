"use strict";

const { SuccessResponse } = require("../core/sucess.response");
const DiscountService = require("../services/service.discount");

class DiscountController {
  createDiscountCode = async (req, res) => {
    new SuccessResponse({
      message: "Success Code generation",
      metadata: await DiscountService.createDiscountCode({
        ...req.body,
        shopId: req.user.userId,
      }),
    }).send(res);
  };

  //////////////////////////////
  getAllDiscountCodes = async (req, res) => {
   new SuccessResponse({
     message: "Success get discount code for shop",
     metadata: await DiscountService.getAllDiscountCodesByShop({
       ...req.query,
       shopId: req.user.userId,
     }),
   }).send(res);
  };

  ///////////////////////////////
  getDiscountAmount = async (req, res) => {
   new SuccessResponse({
     message: "Success get discount amount",
     metadata: await DiscountService.getDiscountAmount({
       ...req.body,
     }),
   }).send(res);
  };

  ///////////////////////////////
  getAllDiscountCodesWithProduct = async (req, res) => {
   new SuccessResponse({
     message: "Success get all discount codes for product",
     metadata: await DiscountService.getAllDiscountCodesWithProduct({
       ...req.query,
     }),
   }).send(res);
  };

}

module.exports = new DiscountController();
