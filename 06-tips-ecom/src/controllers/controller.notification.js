'use strict';

const { SuccessResponse } = require("../core/sucess.response");
const {
  publishNotiToSystem,
  listNotiByUser,
} = require("../services/service.notification");

class NotificationController {
    publishNotiToSystem = async (req, res) => {
    new SuccessResponse({
      message: "Publish notification to system",
      metadata: await publishNotiToSystem(req.body),
    }).send(res);
  };

  listNotiByUser = async (req, res) => {
    new SuccessResponse({
      message: "Get list notification by user",
      metadata: await listNotiByUser(req.query),
    }).send(res);
  };
}

module.exports = new NotificationController();
