const express = require("express");
const { checkApiKey, checkPermission } = require("../auth/checkAuth");
const router = express.Router();

// Check Api Key and permission
router.use(checkApiKey);
router.use(checkPermission('0000'));
router.use("/shop", require("./access/signup"));

module.exports = router;
