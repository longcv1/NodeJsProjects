const { CREATED, SuccessResponse } = require("../core/sucess.response");
const serviceAccess = require("../services/service.access");

class AccessController {
  login = async (req, res, next) => {
    new SuccessResponse({
      message: 'Login success',
      metadata: await serviceAccess.login(req.body)
    }).send(res);
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
    new SuccessResponse({
      message: 'Logout success',
      metadata: await serviceAccess.logout(req.keyStore)
    }).send(res);
  }
}

module.exports = new AccessController();
