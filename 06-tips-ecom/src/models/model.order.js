'use strict';

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
   {
      cart_state: {
         type: String,
         required: true,
         enum: ['active', 'completed', 'failed', 'pending'],
         default: 'active',
      },
      cart_products: {
         type: Array,
         required: true,
         default: [],
      },
      cart_count_product: {
         type: Number,
         default: 0,
      },
      cart_userId: {
         type: Number,
         required: true,
      },
   },
   {
      timestamps: {
         createdAt: 'createdOn',
         updatedAt: 'updatedOn',
      },
      collection: COLLECTION_NAME,
   },
);

//Export the model
module.exports = {
   order: mongoose.model(DOCUMENT_NAME, orderSchema)
};
