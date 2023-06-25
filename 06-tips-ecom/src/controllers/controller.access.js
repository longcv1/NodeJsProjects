const { CREATED } = require("../core/sucess.response");
const serviceAccess = require("../services/service.access");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      new CREATED({
        message: "Registered successfully....",
        metadata: await serviceAccess.signUp(req.body),
      }).send(res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
