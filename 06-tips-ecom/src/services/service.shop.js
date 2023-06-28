'use strict'

const modelShop = require("../models/model.shop")

const findByEmail = async ({email, select = {
    email: 1, password: 2, name: 1, status: 1, roles: 1
}}) => {
    return await modelShop.findOne({email}).select(select).lean();
}

module.exports = findByEmail;