"use strict";

const { findById } = require("../services/service.apikey");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const checkApiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    
    if (!key) {
      return res.status(403).json({
        message: "Forbidden...!",
      });
    }

    const objKey = await findById(key);
    if (!objKey) {
      res.status(403).json({
        message: "Cannot find you api key....!",
      });
    }

    req.objKey = objKey[0];
    return next();
  } catch (error) {
    console.log(error);
  }
};

const checkPermission = (permissions) => {
  return (req, res, next) => {

    if (!req?.objKey?.permissions) {
      return res.status(403).json({
        message: "Permission denied...!",
      });
    }
    
    const isValid = req?.objKey?.permissions.includes(permissions);
    if (!isValid) {
      return res.status(403).json({
        message: "Permission invalid...!",
      });
    }

    return next();
  };
};

module.exports = { checkApiKey, checkPermission };
