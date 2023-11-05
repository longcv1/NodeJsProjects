'use strict';

const { SuccessResponse } = require('../core/sucess.response');
const ProductService = require('../services/service.product');

class ProductController {
   createProduct = async (req, res, next) => {
      try {
         new SuccessResponse({
            message: 'Create new Product success.....',
            metadata: await ProductService.createProduct(
               req.body.product_type,
               {
                  ...req.body,
                  product_shop: req.user.userId,
               },
            ),
         }).send(res);
      } catch (error) {
         next(error);
      }
   };

   updateProduct = async (req, res, next) => {
      try {
         new SuccessResponse({
            message: 'Update Product success.....',
            metadata: await ProductService.updateProduct(
            req.body.product_type,
            req.params.productId,
            {
               ...req.body,
               product_shop: req.user.userId,
            }),
         }).send(res);
      } catch (error) {
         next(error);
      }
   };

   // Query
   getAllDraftsForShop = async (req, res, next) => {
      try {
         new SuccessResponse({
            message: 'Get all drafts for shop success.....',
            metadata: await ProductService.findAllDraftsForShop({
               product_shop: req.user.userId,
            }),
         }).send(res);
      } catch (error) {
         next(error);
      }
   };

   // Query
   getAllPublishForShop = async (req, res, next) => {
      try {
         new SuccessResponse({
            message: 'Get all publish for shop success.....',
            metadata: await ProductService.findAllPublishForShop({
               product_shop: req.user.userId,
            }),
         }).send(res);
      } catch (error) {
         next(error);
      }
   };

   // Query
   getListSearchProducts = async (req, res, next) => {
      try {
         new SuccessResponse({
            message: 'Get list search product by user...',
            metadata: await ProductService.searchProducts(req.params),
         }).send(res);
      } catch (error) {
         next(error);
      }
   };

   // POST
   publishProductForShop = async (req, res, next) => {
      try {
         new SuccessResponse({
            message: 'Published for shop OK.....',
            metadata: await ProductService.publishProductByShop({
               product_id: req.params.id,
               product_shop: req.user.userId,
            }),
         }).send(res);
      } catch (error) {
         next(error);
      }
   };

   // POST
   unPublishProductForShop = async (req, res, next) => {
    try {
      new SuccessResponse({
        message: "Un-published product for shop .....",
        metadata: await ProductService.unPublishProductByShop({
          product_id: req.params.id,
          product_shop: req.user.userId,
        }),
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  // GET
  findAllProducts = async (req, res, next) => {
    try {
      new SuccessResponse({
        message: "Get all products OK.....",
        metadata: await ProductService.findAllProducts(req.query),
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  // GET
  findProduct = async (req, res, next) => {
    try {
      new SuccessResponse({
        message: "Get one product OK.....",
        metadata: await ProductService.findProduct({
          product_id: req.params.product_id,
        }),
      }).send(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
