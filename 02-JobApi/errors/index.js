const CustomApiError = require("./custom-api");
const UnAuthenticatedError = require("./un-authenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");

module.exports = {
  CustomApiError,
  UnAuthenticatedError,
  NotFoundError,
  BadRequestError,
};
