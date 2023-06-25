"use strict";

const StatusCodes = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: "OK",
  CREATED: "Created",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.OK,
    reason = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = !message ? reason : message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reason = ReasonStatusCode.CREATED,
    metadata,
  }) {
    super({ message, statusCode, reason, metadata });
  }
}

module.exports = {
  OK,
  CREATED,
};
