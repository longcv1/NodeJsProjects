const { Types } = require("mongoose");
const Cart = require("../model.cart");

const findCartById = async (cartId) => {
  return await Cart.findOne({
    _id: Types.ObjectId(cartId),
    cart_state: "active",
  }).lean();
};

module.exports = {
  findCartById,
};
