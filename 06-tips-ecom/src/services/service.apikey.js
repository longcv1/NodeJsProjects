'use strict'

const modelApiKey = require("../models/model.apiKey")

const findById = async (key) => {
    const objKey = await modelApiKey.findOne({
        key,
        status: true
    }).lean();

    return objKey;
}

module.exports = {
    findById,
}