"use strict";

const StatusCodes = {
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  CONFLICTED: 409,
};

const ReasonStatusCode = {
  BAD_REQUEST: "Bad request",
  FORBIDDEN: "Forbidden",
  CONFLICTED: "Conflicted",
};

class ErrorHandler extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictError extends ErrorHandler {
  constructor(
    message = ReasonStatusCode.CONFLICTED,
    statusCode = StatusCodes.CONFLICTED
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorHandler {
  constructor(
    message = ReasonStatusCode.BAD_REQUEST,
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

class ForbiddenError extends ErrorHandler {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    statusCode = StatusCodes.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  ConflictError,
  BadRequestError,
  ForbiddenError,
};
