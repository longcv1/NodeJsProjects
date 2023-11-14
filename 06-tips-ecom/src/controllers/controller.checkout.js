'use strict'

const { SuccessResponse } = require("../core/sucess.response");
const CheckoutService = require("../services/service.checkout");


class CheckoutController {
   checkoutReview = async(req, res) => {
      new SuccessResponse({
         message: 'Checkout Review Success',
         metadata: await CheckoutService.checkoutReview(req.body),
      }).send(res);
   }
}

module.exports = new CheckoutController;