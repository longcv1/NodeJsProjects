"use strict";

const { SuccessResponse } = require("../core/sucess.response");
const CartService = require("../services/service.cart");

class CartController {
    addToCart = async(req, res, /* next */) => {
        new SuccessResponse({
            message: 'Create new Cart success',
            metadata: await CartService.addToCart(req.body),
        }).send(res);
    }

    deleteCart = async(req, res, /* next */) => {
        new SuccessResponse({
            message: 'Delete cart success',
            metadata: await CartService.deleteUserCart(req.body)
        }).send(res);
    }

    listToCart = async(req, res) => {
        new SuccessResponse({
            message: 'List cart',
            metadata: await CartService.getListUserCart(req.query)
        }).send(res);
    }

    // updateCart = async(req, res) => {
    //     new SuccessResponse({
    //         message: 'Update cart success',
    //         metadata: await CartService.addToCartV2(req.body),
    //     }).send(res);
    // }
}

module.exports = new CartController();
