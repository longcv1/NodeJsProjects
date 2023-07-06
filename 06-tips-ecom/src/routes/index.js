const express = require("express");
const { checkApiKey, checkPermission } = require("../auth/checkAuth");
const router = express.Router();

// Check Api Key and permission
router.use(checkApiKey);
router.use(checkPermission('0000'));
router.use('/v1/api', require("./access"));
router.use('/v1/api/product', require('./product'));

module.exports = router;
