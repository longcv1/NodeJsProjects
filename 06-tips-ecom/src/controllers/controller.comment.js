"use strict";

const { SuccessResponse } = require("../core/sucess.response");
const {
  createComment,
  getCommentsByParentId,
} = require("../services/service.comment");

class CommentController {
  createComment = async (req, res) => {
    new SuccessResponse({
      message: "create new comment",
      metadata: await createComment(req.body),
    }).send(res);
  };

  getCommentsByParentId = async (req, res) => {
    new SuccessResponse({
      message: "get comment by parent id",
      metadata: await getCommentsByParentId(req.query),
    }).send(res);
  };
}

module.exports = new CommentController();
