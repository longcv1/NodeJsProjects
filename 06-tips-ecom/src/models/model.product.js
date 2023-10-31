'use strict';

const mongoose = require('mongoose'); // Erase if already required
const slugify = require('slugify');

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
   {
      product_name: { type: String, required: true },
      product_thumb: { type: String, required: true },
      product_description: String,
      product_slug: String, //quan-ao-cao-cap
      product_price: { type: Number, required: true },
      product_quantity: { type: Number, required: true },
      product_type: {
         type: String,
         required: true,
         enum: ['Electronics', 'Clothing', 'Furniture'],
      },
      product_attributes: { type: mongoose.Schema.Types.Mixed, required: true },
      product_shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
      product_ratingsAverage: {
         type: Number,
         default: 4,
         min: [1, 'Min rating is 1.0'],
         max: [5, 'Max rating is 5.0'],
         set: (val) => Math.round(val * 10) / 10,
      },
      product_variation: { type: Array, default: [] },
      // select: false if we don't want show in query find()
      isDraft: { type: Boolean, default: true, index: true, select: false },
      isPublished: {
         type: Boolean,
         default: false,
         index: true,
         select: false,
      },
   },
   {
      collection: 'Products',
      timestamps: true,
   },
);

// Index for search
productSchema.index({
   product_name: 'text',
   product_description: 'text',
});

// Document middleware : runs before save() or create()...
productSchema.pre('save', function (next) {
   this.product_slug = slugify(this.product_name, { lower: true });
   next();
});

// Declare the Schema of the Mongo model
var clothingSchema = new mongoose.Schema(
   {
      brand: {
         type: String,
         required: true,
      },
      size: {
         type: String,
      },
      material: {
         type: String,
      },
   },
   {
      collection: 'Clothes',
      timestamps: true,
   },
);

// Declare the Schema of the Mongo model
var electronicSchema = new mongoose.Schema(
   {
      manufactor: {
         type: String,
         required: true,
      },
      model: {
         type: String,
      },
      color: {
         type: String,
      },
   },
   {
      collection: 'Electronics',
      timestamps: true,
   },
);

//Export the model
module.exports = {
   product: mongoose.model('Product', productSchema),
   clothing: mongoose.model('Clothing', clothingSchema),
   electronic: mongoose.model('Electronic', electronicSchema),
};
