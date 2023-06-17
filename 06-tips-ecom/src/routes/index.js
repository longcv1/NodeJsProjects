const express = require('express');
const { signUp } = require('../controllers/controller.access');
const router = express.Router();

router.use('/shop', signUp);

module.exports = router;