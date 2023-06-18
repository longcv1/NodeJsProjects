const serviceAccess = require("../services/service.access");

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log("🚀 ~ AccessController::signUp= ~ body:", req.body);
      return res.status(201).json(await serviceAccess.signup(req.body));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
