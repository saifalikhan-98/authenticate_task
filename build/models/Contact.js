"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = void 0;
var _database = require("../utils/database.js");
var _User = require("./User.js");
// Importing User model to define associations

const Contact = exports.Contact = _database.sequelize.define('Contact', {
  name: {
    type: _database.DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: _database.DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 10],
      // Specifies that the length of the phoneNumber field should be exactly 10 characters
      isNumeric: true // Ensures that the phoneNumber contains only numeric characters
    }
  },
  createdAt: {
    type: _database.DataTypes.DATE,
    allowNull: false,
    defaultValue: _database.DataTypes.NOW // Set default value to current timestamp
  },
  updatedAt: {
    type: _database.DataTypes.DATE,
    allowNull: false,
    defaultValue: _database.DataTypes.NOW,
    // Set default value to current timestamp
    onUpdate: _database.DataTypes.NOW // Update timestamp when record is updated
  }
});