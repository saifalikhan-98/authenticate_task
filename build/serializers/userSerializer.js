"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRegistrationUserInput = void 0;
var _validatorSerializer = require("../utils/validatorSerializer.js");
var _User = require("../models/User.js");
const validateRegistrationUserInput = (req, res, next) => {
  const userValidator = new _validatorSerializer.FieldValidator(_User.User);

  // Use the validator to validate user data
  const userData = req.body;
  const validationResult = userValidator.validate(userData);
  if (validationResult) {
    console.error('Validation failed:');
    console.error(validationResult);
    return res.status(400).json({
      error: validationResult
    });
  }
  next();
};
exports.validateRegistrationUserInput = validateRegistrationUserInput;