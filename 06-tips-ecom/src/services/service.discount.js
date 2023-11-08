'use strict';

const { BadRequestError } = require('../core/error.response');
const Discount = require('../models/model.discount');
const { Types } = require('mongoose');
const { findAllProducts } = require('../models/repositories/product.repo');
const {
   findAllDiscountCodeUnSelect,
} = require('../models/repositories/discount.repo');

class DiscountService {
   // Create discount code
   static async createDiscountCode(payload) {
      const {
         discount_name,
         discount_description,
         discount_type,
         discount_value,
         discount_code,
         discount_start_date,
         discount_end_date,
         discount_max_uses,
         discount_uses_count,
         discount_users_used,
         discount_max_uses_per_user,
         discount_min_order_value,
         discount_shopId,
         discount_is_active,
         discount_applies_to,
         discount_product_ids,
      } = payload;

      if (
         new Date() < new Date(discount_start_date) ||
         new Date() > new Date(discount_end_date)
      ) {
         throw new BadRequestError('Discount code has expired\n');
      }

      // create index for discount code
      const foundDiscountCode = await Discount.findOne({
         discount_code,
         discount_shopId: Types.ObjectId(discount_shopId),
      }).lean();

      if (foundDiscountCode && foundDiscountCode.discount_is_active) {
         throw new BadRequestError('Discount code existed\n');
      }

      return await Discount.create({
         discount_name,
         discount_description,
         discount_type,
         discount_value,
         discount_code,
         discount_start_date: new Date(discount_start_date),
         discount_end_date: new Date(discount_end_date),
         discount_max_uses,
         discount_uses_count,
         discount_users_used,
         discount_max_uses_per_user,
         discount_min_order_value: discount_min_order_value || 0,
         discount_shopId,
         discount_is_active,
         discount_applies_to,
         discount_product_ids:
            discount_applies_to === 'all' ? [] : discount_product_ids,
      });
   }

   // Get all discount code with product
   static async getAllDiscountCodesWithProduct({ code, shopId, limit, page }) {
      // create index for discount code
      const foundDiscountCode = await Discount.findOne({
         discount_code: code,
         discount_shopId: Types.ObjectId(shopId),
      }).lean();

      if (!foundDiscountCode && !foundDiscountCode.discount_is_active) {
         throw new BadRequestError('Discount code not existed\n');
      }

      const { discount_applies_to, discount_product_ids } = foundDiscountCode;
      let products;
      if (discount_applies_to === 'specific') {
         products = await findAllProducts({
            filter: {
               _id: { $in: discount_product_ids },
               isPublished: true,
            },
            limit: +limit,
            page: +page,
            sort: 'ctime',
            select: ['product_name'],
         });
      } else {
         products = await findAllProducts({
            filter: {
               product_shop: Types.ObjectId(shopId),
               isPublished: true,
            },
            limit: +limit,
            page: +page,
            sort: 'ctime',
            select: ['product_name'],
         });
      }

      return products;
   }

   // Get all discount code by shop
   static async getAllDiscountCodesByShop({ limit, page, shopId }) {
      const discounts = await findAllDiscountCodeUnSelect({
         limit: +limit,
         page: +page,
         filter: {
            discount_shopId: Types.ObjectId(shopId),
            discount_is_active: true,
         },
         unSelect: ['__v', 'discount_shopId'],
         module: Discount,
      });

      return discounts;
   }
}

module.exports = new DiscountService();
