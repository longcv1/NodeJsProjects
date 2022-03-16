const mongoose = require("mongoose");

const cartItemsSchema = mongoose.Schema({
  name: { type: String },
  image: { type: String },
  price: { type: Number },
  amount: { type: Number },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
});

const OrderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
    },
    shippingFee: {
      type: Number,
    },
    subtotal: {
      type: Number,
    },
    total: {
      type: Number,
    },
    cartItems: [cartItemsSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    clientSecret: {
      type: String,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
