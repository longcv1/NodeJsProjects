const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    title: {
      type: String,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
