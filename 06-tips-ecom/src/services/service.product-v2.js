"use strict";

const { BadRequestError } = require("../core/error.response");
const { product, clothing, electronic } = require("../models/model.product");
const {
  publishProductByShop,
  unPublishProductByShop,
  findAllDraftsForShop,
  findAllPublishForShop,
  searchProductsByUser,
  findAllProducts,
  findProduct,
  updateProductById,
} = require("../models/repositories/product.repo");

class ProductFactory {
  static productRegistry = {};

  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }

  // Create product
  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new BadRequestError(`Invalid product type ${type}`);
    }

    return new productClass(payload).createProduct();
  }

  // Update product
  static async updateProduct(type, productId, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) {
      throw new BadRequestError(`Invalid product type ${type}`);
    }

    return new productClass(payload).updateProduct(productId);
  }

  // PUT
  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
  }

  static async unPublishProductByShop({ product_shop, product_id }) {
    return await unPublishProductByShop({ product_shop, product_id });
  }

  // GET
  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true };
    return await findAllDraftsForShop({ query, limit, skip });
  }

  // GET
  static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublished: true };
    return await findAllPublishForShop({ query, limit, skip });
  }

  // GET
  static async searchProducts(keySearch) {
    return await searchProductsByUser(keySearch);
  }

  // GET
  static async findAllProducts({
    limit = 50,
    sort = "ctime",
    page = 1,
    filter = { isPublished: true },
  }) {
    return findAllProducts({
      limit,
      sort,
      page,
      filter,
      select: ["product_name", "product_price", "product_thumb"],
    });
  }

  // GET
  static async findProduct({ product_id }) {
    return findProduct({
      product_id,
      unSelect: ["__v"],
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

  async createProduct(product_id) {
    return await product.create({...this, _id: product_id});
  }

  async updateProduct(productId, payload) {
    return await updateProductById({productId, payload, model: product});
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
       ...this.product_attributes,
       product_shop: this.product_shop,
    });
    if (!newClothing)
      throw new BadRequestError("Cannot create new instance of Clothing");

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct)
      throw new BadRequestError("Cannot create new instance of product");

    return newProduct;
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronic)
      throw new BadRequestError("Cannot create new instance of Electronics");

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct)
      throw new BadRequestError("Cannot create new instance of product");

    return newProduct;
  }
}

// register product type
ProductFactory.registerProductType('Electronics', Electronics);
ProductFactory.registerProductType('Clothing', Clothing);

module.exports = ProductFactory;
