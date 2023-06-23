"use strict";

const keyTokenModel = require("../models/model.keyToken");

class KeyTokenService {
  static createToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey
      });

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log('===> ERROR: Cannot create key token...');
      return null;
    }
  };
}

module.exports = KeyTokenService;
