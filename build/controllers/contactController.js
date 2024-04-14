"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactController = void 0;
var _sequelize = require("sequelize");
var _Contact = require("../models/Contact.js");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Add this import statement for Sequelize operators

// Load environment variables from .env file
_dotenv.default.config();
// Controller for user-related operations
const ContactController = exports.ContactController = {
  async addContact(req, res) {
    try {
      const userId = req.user.userId;
      const {
        name,
        phoneNumber
      } = req.body;

      //check if contact already added
      const contactAdded = await _Contact.Contact.findOne({
        where: {
          phoneNumber: phoneNumber,
          UserId: userId
        }
      });
      if (contactAdded) {
        return res.status(400).json({
          error: 'Contact already exists with this phone number'
        });
      }

      // Create a new contact for the user
      const contact = await _Contact.Contact.create({
        name,
        phoneNumber,
        UserId: userId // Associate the contact with the user
      });
      res.status(201).json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  },
  async getContacts(req, res) {
    try {
      const userId = req.user.userId;

      // Find all contacts for the specified user
      const contacts = await _Contact.Contact.findAll({
        where: {
          UserId: userId
        }
      });
      res.json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal server'
      });
    }
  },
  async searchContacts(req, res) {
    try {
      const userId = req.user.userId;
      const {
        query
      } = req.query;

      // Search contacts for the specified user by name or phone number
      const searchResults = await _Contact.Contact.findAll({
        where: {
          UserId: userId,
          [_sequelize.Op.or]: [{
            name: {
              [_sequelize.Op.iLike]: `%${query}%`
            }
          }, {
            phoneNumber: {
              [_sequelize.Op.iLike]: `%${query}%`
            }
          }]
        }
      });
      res.json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
};