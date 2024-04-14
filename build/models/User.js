"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.User = void 0;
var _database = require("../utils/database.js");
var _Contact = require("./Contact.js");
var _Spam = require("./Spam.js");
const User = exports.User = _database.sequelize.define('User', {
  name: {
    type: _database.DataTypes.STRING,
    allowNull: false
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
  email: {
    type: _database.DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true // Ensures that the value of the email field is a valid email address
    }
  },
  password: {
    type: _database.DataTypes.STRING,
    allowNull: false
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

// Define associations with Contact model
User.hasMany(_Contact.Contact);
_Contact.Contact.belongsTo(User);
_Spam.Spam.belongsToMany(User, {
  through: 'SpamUser'
});
var _default = exports.default = User;