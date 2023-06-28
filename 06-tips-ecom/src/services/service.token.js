"use strict";

const keyTokenModel = require("../models/model.keyToken");

class KeyTokenService {
  static createToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
      // LEVEL 1
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // });

      // return tokens ? tokens.publicKey : null;

      const filter = {user: userId};
      const update = {
        publicKey,
        privateKey,
        refreshTokenUsed: [],
        refreshToken,
      };
      const options = {
        upsert: true,
        new: true,
      }

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log('===> ERROR: Cannot create key token...');
      return null;
    }
  };
}

module.exports = KeyTokenService;
