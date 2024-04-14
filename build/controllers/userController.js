"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;
var _sequelize = require("sequelize");
var _User = require("../models/User.js");
var _Spam = _interopRequireDefault(require("../models/Spam.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _passwordValidator = require("../utils/passwordValidator.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Add this import statement for Sequelize operators

// Import password validator utility

// Load environment variables from .env file
_dotenv.default.config();
// Controller for user-related operations
const UserController = exports.UserController = {
  async register(req, res) {
    try {
      const {
        name,
        phoneNumber,
        email,
        password
      } = req.body;

      // Check if user with the same phone number already exists
      const existingUser = await _User.User.findOne({
        where: {
          phoneNumber
        }
      });
      if (existingUser) {
        return res.status(400).json({
          error: 'User already exists with this phone number'
        });
      }
      const passwordError = (0, _passwordValidator.passwordValidator)(password);
      if (passwordError) {
        return res.status(400).json({
          error: passwordError
        });
      }

      // Hash the password
      const hashedPassword = await _bcrypt.default.hash(password, 10);

      // Create user
      const user = await _User.User.create({
        name,
        phoneNumber,
        email,
        password: hashedPassword // Save the hashed password
      });
      res.status(201).json({
        "name": name,
        "email": email,
        "phoneNumber": phoneNumber
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal server error:-' + error
      });
    }
  },
  async login(req, res) {
    try {
      const {
        phoneNumber,
        password
      } = req.body;

      // Check if user exists
      const user = await _User.User.findOne({
        where: {
          phoneNumber
        }
      });
      if (!user) {
        return res.status(401).json({
          error: 'Invalid credentials'
        });
      }

      // Validate password

      const validPassword = await _bcrypt.default.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          error: 'Invalid credentials'
        });
      }

      // Generate JWT token
      // we can provide extra layer of security by encrypting and signing payload but I have kept very basic security for now
      const token = _jsonwebtoken.default.sign({
        user: {
          userId: user.id,
          name: user.name,
          phoneNumber: user.phoneNumber
        }
      }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      // Send token to client
      res.json({
        token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  },
  async markSpam(req, res) {
    try {
      const {
        phoneNumber
      } = req.body;

      // Check if the phone number is already marked as spam
      const existingSpam = await _Spam.default.findOne({
        where: {
          phoneNumber
        }
      });
      if (existingSpam) {
        return res.status(400).json({
          error: 'This number is already marked as spam'
        });
      }

      // Create a new spam record

      const spamRecord = await _Spam.default.create({
        phoneNumber
      });
      res.status(201).json(spamRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  },
  async search(req, res) {
    try {
      const {
        query
      } = req.query;
      console.log(query);
      // Search by name
      const searchByNameResults = await _User.User.findAll({
        where: {
          name: {
            [_sequelize.Op.iLike]: `%${query}%`
          }
        }
      });

      // Search by phone number
      let searchByPhoneNumberResults = [];
      if (!isNaN(query)) {
        // If the query is a valid phone number, search contacts
        searchByPhoneNumberResults = await _User.User.findAll({
          where: {
            phoneNumber: {
              [_sequelize.Op.iLike]: `%${query}%`
            }
          }
        });
      } else {
        // If the query is not a valid phone number, search users
        searchByPhoneNumberResults = await _User.User.findAll({
          where: {
            phoneNumber: {
              [_sequelize.Op.iLike]: `%${query}%`
            }
          }
        });
      }

      // Merge and format search results
      const mergedResults = [...searchByNameResults, ...searchByPhoneNumberResults];
      const formattedResults = mergedResults.map(result => ({
        name: result.name,
        phoneNumber: result.phoneNumber,
        spamLikelihood: result.spamLikelihood // Add spam likelihood if available
      }));
      res.json(formattedResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
};