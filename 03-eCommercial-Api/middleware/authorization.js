const CustomError = require('../errors');

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError('Not have permission!');
        }
        next();
    };
};

module.exports = authorizePermissions;