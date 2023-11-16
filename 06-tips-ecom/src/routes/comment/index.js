const express = require('express');
const router = express.Router();

const commentController = require('../../controllers/controller.comment');
const asyncHandler = require('../../libs/async.handler');

router.post('/', asyncHandler(commentController.createComment));
router.delete('/', asyncHandler(commentController.deleteComments));
router.get('/', asyncHandler(commentController.getCommentsByParentId));

module.exports = router;