"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Spam = void 0;
var _database = require("../utils/database.js");
var _User = require("./User.js");
// Importing User model to define associations

const Spam = exports.Spam = _database.sequelize.define('Spam', {
  id: {
    type: _database.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phoneNumber: {
    type: _database.DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [10, 10],
      // Specifies that the length of the phoneNumber field should be exactly 10 characters
      isNumeric: true // Ensures that the phoneNumber contains only numeric characters
    }
  },
  spamReport: {
    type: _database.DataTypes.INTEGER,
    defaultValue: 0
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

// Define associations with User model
var _default = exports.default = Spam;