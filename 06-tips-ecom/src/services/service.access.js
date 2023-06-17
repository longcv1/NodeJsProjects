'use strict'

const modelShop = require("../models/model.shop");
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');

const ShopRoles = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
};

class AccessService {

    static signup = async ({ name, email, password }) => {
        try {
            // check email exist
            const isEmailExisted = await modelShop.findOne({email}).lean();
            if(isEmailExisted) {
                return {
                    code: 409,
                    message: 'Email had already existed! Please use another one...'
                }
            }

            const passwordEncrypted = await bcrypt.hash(password, 10);

            const newShop = await modelShop.create({
                name,
                email,
                passwordEncrypted,
                roles: [ShopRoles.SHOP],
            });

            if(newShop) {
                // Create private key and public key
                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                      type: 'spki',
                      format: 'pem',
                    },
                    privateKeyEncoding: {
                      type: 'pkcs8',
                      format: 'pem',
                      cipher: 'aes-256-cbc',
                      passphrase: 'top secret',
                    },
                });

                console.log("🚀 ~ file: service.access.js:51 ~ AccessService ~ signup= ~ publicKey:", publicKey)
                console.log("🚀 ~ file: service.access.js:39 ~ AccessService ~ signup= ~ privateKey:", privateKey)

                return {
                    code: 201,
                    message: 'Shop has been created succesfully...'
                }
            }
        } catch (error) {
            return {
                error: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }

}

module.exports = AccessService;