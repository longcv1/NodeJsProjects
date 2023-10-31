"use strict";

const { SuccessResponse } = require("../core/sucess.response");
const ProductServiceV2 = require("../services/service.product-v2");

class ProductController {
   createProduct = async (req, res, next) => {
      new SuccessResponse({
         message: 'Create new Product success.....',
         metadata: await ProductServiceV2.createProduct(req.body.product_type, {
            ...req.body,
            product_shop: req.user.userId,
         }),
      }).send(res);
   };
}

module.exports = new ProductController();
