'use strict';

const { BadRequestError, NotFoundError } = require('../core/error.response');
const Discount = require('../models/model.discount');
const { Types } = require('mongoose');
const { findAllProducts } = require('../models/repositories/product.repo');
const {
   findAllDiscountCodeUnSelect, checkDiscountExists,
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

   // Get discount amount
   static async getDiscountAmount({ code, shopId, products }) {
      const foundDiscount = await checkDiscountExists({
         model: Discount,
         filter: {
            discount_code: code,
            discount_shopId: Types.ObjectId(shopId),
         }
      });

      if(!foundDiscount) throw new NotFoundError('Discount not existed!\n');

      const {
         discount_is_active,
         discount_max_uses,
         discount_min_order_value,
         discount_start_date,
         discount_end_date,
         discount_type,
         discount_value,
      } = foundDiscount;

      if(!discount_is_active) throw new NotFoundError('Discount is expired\n');
      if(!discount_max_uses) throw new NotFoundError('Discount is out\n');
      
      if(new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
         throw new NotFoundError('Discount code has expired\n');
      }

      let totalOrder = 0;
      if(discount_min_order_value > 0) {
         totalOrder = products.reduce((acc, product) => {
            return acc + (product.quantity * product.price);
         }, 0);

         if(totalOrder < discount_min_order_value) {
            throw new NotFoundError(`Discount requires a min order value of ${discount_min_order_value}`);
         }
      }

      const amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100);

      return {
         totalOrder,
         discount: amount,
         totalPrice: totalOrder - amount,
      };
   }
   
   // Delete discount code
   static async deleteDiscountCode ({ shopId, codeId }) {
      const deleted = await Discount.findOneAndDelete ({
         discount_code: codeId,
         discount_shopId: shopId,
      });

      return deleted;
   }

   // Cancel discount code
   static async cancelDiscountCode ({ codeId, shopId, userId }) {
      const foundDiscount = await checkDiscountExists({
         model: Discount,
         filter: {
            discount_code: codeId,
            discount_shopId: Types.ObjectId(shopId),
         }
      });

      if(!foundDiscount) throw new NotFoundError('Discount code not existed!\n');

      const result = await Discount.findByIdAndUpdate(foundDiscount._id, {
         $pull: {discount_users_used: userId},
         $inc: {
            discount_max_uses: 1,
            discount_uses_count: -1,
         }
      });

      return result;
   }
}

module.exports = DiscountService;
