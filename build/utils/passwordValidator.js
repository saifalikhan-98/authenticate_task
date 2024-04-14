"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordValidator = void 0;
const passwordValidator = password => {
  // Check if password is at least 8 characters long
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  // Check if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  // Check if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  // Check if password contains at least one digit
  if (!/\d/.test(password)) {
    return 'Password must contain at least one digit';
  }

  // Check if password contains at least one special character
  if (!/[!@#$%^&*()-_=+{};:,<.>]/.test(password)) {
    return 'Password must contain at least one special character';
  }

  // Password meets all requirements
  return null;
};
exports.passwordValidator = passwordValidator;