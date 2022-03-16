const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const authorizePermissions = require("../middleware/authorization");

const {
   getAllOrders,
   getSingleOrder,
   getCurrentUserOrder,
   createOrder,
   updateOrder
} = require("../controllers/OrderController");

router
   .route("/")
   .post(authenticateUser, createOrder)
   .get([authenticateUser, authorizePermissions("admin")], getAllOrders);

router
   .route("/:id")
   .get(authenticateUser, getSingleOrder)
   .patch(authenticateUser, updateOrder);

router
   .route("/showAllMyOrders")
   .get(authenticateUser, getSingleOrder);

module.exports = router;