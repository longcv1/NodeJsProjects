"use strict";

const modelShop = require("../models/model.shop");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const KeyTokenService = require("./service.token");
const { createTokenPair } = require("../auth/authUtils");
const { ConflictError, BadRequestError, AuthFailureError } = require("../core/error.response");
const findByEmail = require("./service.shop");

const ShopRoles = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {

  static login = async ({ email, password }) => {
    // 1 - check email in db
    // 2 - match password
    // 3 - create access token and refresh token and save
    // 4 - generate tokens
    // 5 - get data return login

    //1.
    const foundShop = await findByEmail({email});
    if (!foundShop) {
      throw new BadRequestError('Shop is not registered....');
    }

    //2.
    const isMatchPassword = bcrypt.compare(password, foundShop.password);
    if (!isMatchPassword) {
      throw new AuthFailureError('Authentication failure...');
    }

    //3.
    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');

    //4.
    const {_id: userId} = foundShop;

    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createToken({
      userId,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });
    
    //5.
    return {
      code: 200,
      message: "Login succesfully...",
      metadata: {
        shop: foundShop,
        tokens,
      },
    };
  }

  static signup = async ({ name, email, password }) => {
    try {
      // check email exist
      const isEmailExisted = await modelShop.findOne({ email }).lean();
      if (isEmailExisted) {
        throw new ConflictError('Error: Email already existed');
      }

      const passwordEncrypted = await bcrypt.hash(password, 10);

      const newShop = await modelShop.create({
        name,
        email,
        password: passwordEncrypted,
        roles: [ShopRoles.SHOP],
      });

      if (newShop) {
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const keyStore = await KeyTokenService.createToken({
          userId: newShop._id,
          publicKey,
          privateKey
        });

        if (!keyStore) {
          return {
            code: "400",
            message: "Cannot creat tokens......"
          };
        }

        // create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );

        return {
          code: 201,
          message: "Shop has been created succesfully...",
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      }
    } catch (error) {
      return {
        error: "500",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
