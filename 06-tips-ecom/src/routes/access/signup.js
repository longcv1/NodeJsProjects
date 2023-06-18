const express = require('express');
const controllerAccess = require('../../controllers/controller.access');
const router = express.Router();

router.post('/signup', controllerAccess.signUp);

module.exports = router;