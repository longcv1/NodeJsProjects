const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const authorizePermissions = require('../middleware/authorization');

const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = require('../controllers/UserController');

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router.route('/about').get(authenticateUser, showCurrentUser);
router.route('/:id').get(authenticateUser, getSingleUser);
router.route('/updateuser').patch(updateUser);
router.route('/updateuserpassword').patch(updateUserPassword);

module.exports = router;