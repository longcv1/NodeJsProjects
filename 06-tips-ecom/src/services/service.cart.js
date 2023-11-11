'use strict'

const { NotFoundError } = require('../core/error.response');
const Cart = require('../models/model.cart');
const { getProductById } = require('../models/repositories/product.repo');
// const { Types } = require('mongoose');

class CartService {
    static async createUserCart({userId, product}) {
      const query = {
         cart_userId: userId,
         cart_state: 'active',
      }, updateOrInsert = {
         $addToSet: {
            cart_products: product,
         }
      }, options = {upsert: true, new: true};

      return await Cart.findOneAndUpdate(query, updateOrInsert, options);
    }

    static async updateUserCartQuantity({userId, product}) {
      const {productId, quantity} = product;
      const query = {
         cart_userId: userId,
         'cart_products.productId': productId,
         cart_state: 'active',
      }, updateSet = {
         $inc: {
            'cart_products.$.quantity': quantity,
         }
      }, options = {upsert: true, new: true};

      return await Cart.findOneAndUpdate(query, updateSet, options);
    }

    static async addToCart({userId, product = {}}) {
      const userCart = await Cart.findOne({cart_userId: userId});

      if(!userCart) {
         return await CartService.createUserCart({userId, product});
      }

      if(!userCart.cart_products.length) {
         userCart.cart_products = [product];
         return await userCart.save();
      }

      return await CartService.updateUserCartQuantity({userId, product});
    }

    static async addToCartV2({userId, shop_order_ids}) {
      const {
         productId,
         quantity,
         old_quantity,
      // eslint-disable-next-line no-unsafe-optional-chaining
      } = shop_order_ids[0]?.items.product[0];

      const foundProduct = getProductById(productId);
      if(!foundProduct) throw new NotFoundError();
      if(foundProduct.product_shop.toString() !== shop_order_ids[0].items.product[0]) {
         throw new NotFoundError('Product not belong to the shop');
      }

      return await CartService.updateUserCartQuantity({
         userId,
         product: {
            productId,
            quantity: quantity - old_quantity,
         }
      });
    }

    static async deleteUserCart({userId, productId}) {
      const query = { cart_userId: userId, cart_state: 'active'},
      updateSet = {
         $pull: {
            cart_products: {
               productId,
            }
         }
      }
      const deletedCart = await Cart.updateOne(query, updateSet);

      return deletedCart;
    }

    static async getListUserCart({userId}) {
      return await Cart.findOne({
         cart_userId: userId,
      }).lean();
    }
}

module.exports = CartService;