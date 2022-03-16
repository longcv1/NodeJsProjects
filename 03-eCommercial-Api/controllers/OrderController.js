/**
 * Add Dependencies
 */
const Order = require('../models/Order');
const{StatusCodes} = require("http-status-codes");
const CustomError = require("../errors");
const {checkPermissions} = require("../utils");
const Product = require('../models/Product');

// CREATE ORDER
const createOrder = async(req, res) => {
   const {items: cartItems, tax, shippingFee} = req.body;
   if(!cartItems || cartItems.length < 1){
      throw new CustomError.BadRequestError('No cart items provided');
   }
   if(!tax || !shippingFee){
      throw new CustomError.BadRequestError('Missing tax and shipping fee');
   }

   let orderItems = [];
   let subtotal = 0;
   for (const item of cartItems) {
     const dbProduct = await Product.findOne({ _id: item.product });
     if (!dbProduct) {
       throw new CustomError.NotFoundError(
         `No found with id : ${item.product}`
       );
     }
     const { name, price, image, _id } = dbProduct;
     const singleOrderItem = {
       amount: item.amount,
       name,
       price,
       image,
       product: _id,
     };
     // Add items to order
     //orderItems = [...orderItems, singleOrderItem];
     orderItems.push(singleOrderItem);
     // Calculate subtotal
     subtotal += item.amount * price;
   }
   console.log("----- TEST ----");
   console.log(orderItems);
   console.log(subtotal);
   res.send('Create Product');
}

// GET ALL ORDERS
const getAllOrders = async(req, res) => {
   res.send("ALL ORDERS");
}

// GET SINGLE ORDER
const getSingleOrder = async(req, res) => {
   
}

// GET CURRENT USER ORDER
const getCurrentUserOrder = async(req, res) => {
   
}

// UPDATE ORDER
const updateOrder = async(req, res) => {
   
}

module.exports = {
   getAllOrders,
   getSingleOrder,
   getCurrentUserOrder,
   createOrder,
   updateOrder
}