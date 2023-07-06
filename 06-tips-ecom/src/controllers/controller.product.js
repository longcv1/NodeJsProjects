"use strict";

const { SuccessResponse } = require("../core/sucess.response");
const ProductService = require("../services/service.product");

class ProductController {
  createProduct = async (req, res, next) => {
    try {
      new SuccessResponse({
        message: "Create new Product success.....",
        metadata: await ProductService.createProduct(req.body.product_type, req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ProductController();
