"use strict";

const { SuccessResponse } = require("../core/sucess.response");
const {
  createComment,
  getCommentsByParentId,
  deleteComments,
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

  deleteComments = async (req, res) => {
    new SuccessResponse({
      message: "delete comments success",
      metadata: await deleteComments(req.query),
    }).send(res);
  };
}

module.exports = new CommentController();
