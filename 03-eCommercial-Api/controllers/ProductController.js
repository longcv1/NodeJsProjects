/**
 * Add dependencies
 */
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require('path');

// CREATE PRODUCT
const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

// GET A PRODUCT
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId }).populate('reviews');
  if (!product) {
    throw new CustomError.NotFoundError(
      `No Product found with id: ${productId}`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No Product found with id: ${productId}`
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No Product found with id: ${productId}`
    );
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg:'Deleted Product Successfully' });
};

// UPLOAD IMAGE
const uploadImage = async (req, res) => {
  if(!req.files){
      throw new CustomError.BadRequestError('No file updloaded');
  }
  const productImage = req.files.image;
  if(!productImage.mimetype.startsWith('image')){
    throw new CustomError.BadRequestError('Please upload image');
  }
  const maxSize = 1024*1024;
  if(productImage.size > maxSize){
      throw new CustomError.BadRequestError('Please upload image smaller than 1MB');
  }
  const imagePath = path.join(__dirname,'../public/uploads/' + `${productImage.name}`);
  console.log(__dirname);
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`});
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
