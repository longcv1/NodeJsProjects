const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const authorizePermissions = require("../middleware/authorization");

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/ProductController");

const {getSingleProductReviews} = require('../controllers/ReviewController');

router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createProduct)
  .get(getAllProducts);

router
  .route("/upload/image")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

router
  .route('/:id/reviews')
  .get(authenticateUser, getSingleProductReviews);

module.exports = router;
