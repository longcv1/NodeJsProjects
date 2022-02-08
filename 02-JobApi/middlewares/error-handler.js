const CustomApiError = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const ErrorHandlerMiddleware = (err, req, res) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message
  };

  // if (err.name === 'ValidationError') {
  //   customError.msg = Object.values(err.errors).map((item) => item.message).join(',');
  //   customError.statusCode = 400;
  // }
  return res.status(customError.statusCode).json({msg: customError.msg});
};

module.exports = ErrorHandlerMiddleware;
