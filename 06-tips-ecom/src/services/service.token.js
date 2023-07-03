"use strict";

const keyTokenModel = require("../models/model.keyToken");
const {Types} = require('mongoose');

class KeyTokenService {
  static createToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
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

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({user: Types.ObjectId(userId)}).lean();
  }

  static removeKeyById = async (id) => {
    return await keyTokenModel.remove(id);
  }
}

module.exports = KeyTokenService;
