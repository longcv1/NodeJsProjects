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
        message: "Forbidden....!",
      });
    }

    req.objKey = objKey;
    return next();
  } catch (error) {
    res.status(404).json({
      message: "Cannot find you api key.....",
    });
  }
};

const checkPermission = async (permissions) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Permission denied...!",
      });
    }

    const isValid = req.objKey.permissions.include(permissions);
    if (!isValid) {
      return res.status(403).json({
        message: "Permission denied...!",
      });
    }

    return next();
  };
};

module.exports = { checkApiKey, checkPermission };
