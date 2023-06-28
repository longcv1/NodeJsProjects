"use strict";

const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "5 days",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log("🚀 ~ file: authUtils.js:19 ~ JWT.verify ~ err:", err);
        return err;
      }

      console.log("🚀 ~ file: authUtils.js:18 ~ JWT.verify ~ decode:", decode);
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.debug("---> DEBUG::  file: authUtils.js:26  error-", error);
    return null;
  }
};

module.exports = {
  createTokenPair,
};
