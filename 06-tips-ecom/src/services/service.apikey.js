'use strict'
const crypto = require('node:crypto');
const modelApiKey = require("../models/model.apiKey")

const findById = async (key) => {
    // const newKey = await modelApiKey.create({key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']});
    // console.log("🚀 ~ file: service.apikey.js:7 ~ findById ~ newKey:", newKey);    
    const objKey = await modelApiKey.find({ key }).lean();
    return objKey;
}

module.exports = {
    findById,
}