"use strict";

const { Types } = require("mongoose");
const { NotFoundError } = require("../core/error.response");
const Comment = require("../models/model.comment");
const { findProduct } = require("./service.product");

class CommentService {
  static async createComment({
    productId,
    userId,
    content,
    parentCommentId = null,
  }) {
    const comment = new Comment({
      comment_productId: productId,
      comment_userId: userId,
      comment_content: content,
      comment_parentId: parentCommentId,
    });
    let rightValue;
    if (parentCommentId) {
      // reply comments
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) throw new NotFoundError("parent comment not found");

      rightValue = parentComment.comment_right;

      await Comment.updateMany(
        {
          comment_productId: Types.ObjectId(productId),
          comment_right: { $gte: rightValue },
        },
        {
          $inc: { comment_right: 2 },
        }
      );
    } else {
      const maxRightValue = await Comment.findOne(
        {
          comment_productId: Types.ObjectId(productId),
        },
        "comment_right",
        { sort: { comment_right: -1 } }
      );
      if (maxRightValue) {
        rightValue = maxRightValue.right + 1;
      } else {
        rightValue = 1;
      }
    }

    // insert comment
    comment.comment_left = rightValue;
    comment.comment_right = rightValue + 1;

    await comment.save();
    return comment;
  }

  static async getCommentsByParentId({ productId, parentCommentId = null }) {
    let comments;
    if (parentCommentId) {
      const parent = await Comment.findById(parentCommentId);
      if (!parent) throw new NotFoundError("Not found comment for product");

      comments = await Comment.find({
        comment_productId: Types.ObjectId(productId),
        comment_left: { $gt: parent.comment_left },
        comment_right: { $lte: parent.comment_right },
      })
        .select({
          comment_left: 1,
          comment_right: 1,
          comment_content: 1,
          comment_parentId: 1,
        })
        .sort({
          comment_left: 1,
        });

      return comments;
    }

    comments = await Comment.find({
      comment_productId: Types.ObjectId(productId),
      comment_parentId: parentCommentId,
    })
      .select({
        comment_left: 1,
        comment_right: 1,
        comment_content: 1,
        comment_parentId: 1,
      })
      .sort({
        comment_left: 1,
      });
  }

  static async deleteComments({commentId, productId}) {
    const foundProduct = await findProduct({
      product_id: productId,
    });

    if(!foundProduct) throw new NotFoundError('Product not found');

    const comment = await Comment.findById(commentId);
    if(!comment) throw new NotFoundError('Comment not found');

    const leftValue = comment.comment_left;
    const rightValue = comment.comment_right;

    const width = rightValue - leftValue + 1;

    await Comment.deleteMany({
      comment_productId: Types.ObjectId(productId),
      comment_left: {$gte: leftValue, $lte: rightValue},
    });

    await Comment.updateMany({
      comment_productId: Types.ObjectId(productId),
      comment_right: {$gt: rightValue},
    });

    await Comment.updateMany({
      comment_productId: Types.ObjectId(productId),
      comment_left: {$gt: rightValue},
    }, {
      $inc: {comment_right: -width},
    });

    return true;
  }
}

module.exports = CommentService;
