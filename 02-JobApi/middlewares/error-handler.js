const CustomApiError = require("../errors/custom-api");
const { StatusCodes } = require("http-status-codes");

const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  next();
};

module.exports = ErrorHandlerMiddleware;
