"use strict";

const JWT = require("jsonwebtoken");
const asyncHandler = require("../libs/async.handler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { findByUserId } = require("../services/service.token");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });
    console.debug("---> DEBUG::file: authUtils.js:10  accessToken-", accessToken);

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "5 days",
    });
    console.debug("---> DEBUG::file: authUtils.js:15  refreshToken-", refreshToken);

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log("--->[DEBUG]  file: authUtils.js:20  err::", err)
        return err;
      }

      console.log("--->[DEBUG]  file: authUtils.js:19  decode::", decode)
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("--->[DEBUG]  file: authUtils.js:29  error::", error)
    return null;
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  //1.
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError('Invalid request!');

  //2.
  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError('Not found token key');

  //3.
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError('Invalid access token');

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId)  throw new AuthFailureError('Invalid User id');
    req.keyStore = keyStore;
    return next();
  } catch (error) {
    console.log("--->[DEBUG]  file: authUtils.js:61  error::", error);
    throw error;
  }
})

const verifyJwt = async (token, keySecret) => {
  return await JWT.verify(token, keySecret);
}

module.exports = {
  createTokenPair,
  authentication,
  verifyJwt,
};
