const { CREATED, SuccessResponse } = require("../core/sucess.response");
const serviceAccess = require("../services/service.access");

class AccessController {
  login = async (req, res, next) => {
    try {
      new SuccessResponse({
        message: "Login success....",
        metadata: await serviceAccess.login(req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  signup = async (req, res, next) => {
    try {
      new CREATED({
        message: "Registered successfully....",
        metadata: await serviceAccess.signup(req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      new SuccessResponse({
        message: 'Logout success',
        metadata: await serviceAccess.logout(req.keyStore)
      }).send(res);
    } catch (error) {
      next(error);
    }
  }

  handleRefreshToken = async (req, res, next) => {
    try {
      new SuccessResponse({
        message: 'Get tokens success',
        metadata: await serviceAccess.handleRefreshToken(req.body?.refreshToken)
      }).send(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccessController();
