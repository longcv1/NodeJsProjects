const CustomError = require('../errors');
const {isTokenValid} = require('../utils');

const authenticateUer = async(req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Token Invalid!');
    }
    try {
        const {name, userId, role} = isTokenValid({ token });
        req.user = {name, userId, role};
        next();
    } catch (e) {
        throw new CustomError.UnauthenticatedError('Authentication Failed!');
    }
}

module.exports = authenticateUer;