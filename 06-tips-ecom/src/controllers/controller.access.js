const serviceAccess = require('../services/service.access');

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log("🚀 ~ AccessController::signUp= ~ body:", req.body);
            const { name, email, password } = req.body;
            serviceAccess.signup({name, email, password})
            return res.status(201).json({
                code: '201',
                metadata: {userId: 1}
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AccessController();