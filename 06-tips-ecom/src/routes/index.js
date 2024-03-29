const express = require("express");
const { checkApiKey, checkPermission } = require("../auth/checkAuth");
const router = express.Router();

// Check Api Key and permission
router.use(checkApiKey);
router.use(checkPermission('0000'));

router.use('/v1/api/checkout', require('./checkout'));
router.use('/v1/api/product', require('./product'));
router.use('/v1/api', require("./access"));
router.use('/v1/api/discount', require('./discount'));
router.use('/v1/api/cart', require('./cart'));
router.use('/v1/api/comment', require('./comment'));
router.use('/v1/api/notification', require('./notification'));

module.exports = router;
