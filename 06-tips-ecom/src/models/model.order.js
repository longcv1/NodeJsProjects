"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
  {
    order_userId: { type: Number, required: true },
    order_checkout: { type: Object, default: {} },
    order_shipping: { type: Object, default: {} },
    order_payment: { type: Object, default: {} },
    order_products: { type: Array, required: true },
    order_trackingNumber: { type: String, default: "#00001111800234" },
    order_status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "cancelled", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = {
  order: mongoose.model(DOCUMENT_NAME, orderSchema),
};
