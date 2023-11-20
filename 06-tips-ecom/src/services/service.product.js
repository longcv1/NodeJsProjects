'use strict';

const { BadRequestError } = require('../core/error.response');
const { product, clothing, electronic } = require('../models/model.product');
const { insertInventory } = require('../models/repositories/inventory.repo');
const {
   findAllDraftsForShop,
   publishProductByShop,
   findAllPublishForShop,
   searchProductsByUser,
   unPublishProductByShop,
   findAllProducts,
   findProduct,
   updateProductById,
} = require('../models/repositories/product.repo');
const { removeInvalidObj, updateNestedObjParser } = require('../utils');
const { publishNotiToSystem } = require('./service.notification');

class ProductFactory {
   static async createProduct(typeProduct, payload) {
      switch (typeProduct) {
         case 'Electronics':
            return new Electronics(payload);
         case 'Clothing':
            return new Clothing(payload);
         default:
            return null;
      }
   }

   static async updateProduct(typeProduct, productId, payload) {
      switch (typeProduct) {
         case 'Electronics':
            return new Electronics(payload).updateProduct(productId, payload);
         case 'Clothing':
            return new Clothing(payload).updateProduct(productId);
         default:
            return null;
      }
   }

   // GET
   static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
      const query = { product_shop, isDraft: true };
      return await findAllDraftsForShop({ query, limit, skip });
   }

   // PUT
   static async publishProductByShop({ product_shop, product_id }) {
      return await publishProductByShop({ product_shop, product_id });
   }

   // GET
   static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
      const query = { product_shop, isPublished: true };
      return await findAllPublishForShop({ query, limit, skip });
   }

   static async unPublishProductByShop({ product_shop, product_id }) {
      return await unPublishProductByShop({ product_shop, product_id });
   }

   // GET
   static async searchProducts (keySearch) {
      return await searchProductsByUser(keySearch);
   }

   // GET
   static async findAllProducts ({
      limit = 50,
      sort = 'ctime',
      page = 1,
      filter = {isPublished: true}
   }) {
      return findAllProducts({
         limit,
         sort,
         page,
         filter,
         select: ['product_name', 'product_price', 'product_thumb'],
      });
   }

   // GET
   static async findProduct ({product_id}) {
      return findProduct({
         product_id,
         unSelect: ['__v'],
      });
   }
}

class Product {
   constructor({
      product_name,
      product_thumb,
      product_description,
      product_price,
      product_quantity,
      product_type,
      product_attributes,
      product_shop,
   }) {
      this.product_name = product_name;
      this.product_thumb = product_thumb;
      this.product_description = product_description;
      this.product_price = product_price;
      this.product_quantity = product_quantity;
      this.product_type = product_type;
      this.product_attributes = product_attributes;
      this.product_shop = product_shop;
   }

   async createProduct(productId) {
      const newProduct = await product.create({ ...this, _id: productId });
      if(newProduct) {
         await insertInventory({
            productId: newProduct._id,
            shopId: this.product_shop,
            stock: this.product_quantity,
         })
      }
      
      // push notification to system collection
      publishNotiToSystem({
         type: 'SHOP-001',
         receivedId: 1,
         senderId: this.product_shop,
         options: {
            product_name: this.product_name,
            shop_name: this.product_shop,
         }
      }).then(res => console.log(res)).catch(error => console.log(error));
      
      return newProduct;
   }

   async updateProduct(producId, payload) {
      return await updateProductById({
         producId,
         payload,
         model: product,
      });
   }
}

class Clothing extends Product {
   async createProduct() {
      const newClothing = await clothing.create({
         ...this.product_attributes,
         product_shop: this.product_shop,
      });

      if (!newClothing)
         throw new BadRequestError('Cannot create new instance of Clothing');

      const newProduct = await super.createProduct(newClothing._id);
      if (!newProduct)
         throw new BadRequestError('Cannot create new instance of product');

      return newProduct;
   }

   async updateProduct(productId) {
      const objParams = removeInvalidObj(this);

      if(objParams.product_attributes) {
         await updateProductById({
            productId,
            payload: updateNestedObjParser(objParams.product_attributes),
            model: clothing,
         })
      }

      const updatedProduct = await super.updateProduct(productId, updateNestedObjParser(objParams));

      return updatedProduct;
   }
}

class Electronics extends Product {
   async createProduct() {
      const newElectronic = await electronic.create({
         ...this.product_attributes,
         product_shop: this.product_shop,
      });

      if (!newElectronic)
         throw new BadRequestError('Cannot create new instance of Electronics');

      const newProduct = await super.createProduct(newElectronic._id);
      if (!newProduct)
         throw new BadRequestError('Cannot create new instance of product');

      return newProduct;
   }
}

module.exports = ProductFactory;
