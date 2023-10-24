"use strict";

const { BadRequestError } = require("../core/error.response");
const { product, clothing, electronic } = require("../models/model.product");

class ProductFactory {
  static async createProduct(typeProduct, payload) {
    switch (typeProduct) {
      case "Electronics":
        return new Electronics(payload);
      case "Clothing":
        return new Clothing(payload);
      default:
        return null;
    }
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

  async createProduct(_id) {
    return await product.create({...this, _id});
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create(this.product_attributes);
    if (!newClothing)
      throw new BadRequestError("Cannot create new instance of Clothing");

    const newProduct = await super.createProduct();
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

module.exports = ProductFactory;
