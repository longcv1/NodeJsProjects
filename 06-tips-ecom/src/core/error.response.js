"use strict";

const StatusCodes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICTED: 409,
};

const ReasonStatusCode = {
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Un-authorized",
  FORBIDDEN: "Forbidden",
  CONFLICTED: "Conflicted",
  NOT_FOUND: "Not found"
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

class AuthFailureError extends ErrorHandler {
  constructor(
    message = ReasonStatusCode.UNAUTHORIZED,
    statusCode = StatusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

class NotFoundError extends ErrorHandler {
  constructor(
    message = ReasonStatusCode.NOT_FOUND,
    statusCode = StatusCodes.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  ConflictError,
  BadRequestError,
  ForbiddenError,
  AuthFailureError,
  NotFoundError
};
