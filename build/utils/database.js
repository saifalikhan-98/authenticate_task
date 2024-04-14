"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DataTypes", {
  enumerable: true,
  get: function () {
    return _sequelize.DataTypes;
  }
});
exports.sequelize = void 0;
var _sequelize = require("sequelize");
var _config = require("../../config.js");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Adjust the path as needed

// Load environment variables from .env file
_dotenv.default.config();

// Get the database configuration based on the current environment
const {
  dialect,
  ...rest
} = _config.databaseConfig.getDatabaseConfig();
console.log("data", dialect);
const nodeEnv = process.env.NODE_ENV;
// Initialize Sequelize with the appropriate configuration
let sequelize = exports.sequelize = void 0;
if (nodeEnv === 'test') {
  exports.sequelize = sequelize = new _sequelize.Sequelize({
    dialect: 'sqlite',
    storage: rest.storage
  });
} else if (nodeEnv === 'dev') {
  exports.sequelize = sequelize = new _sequelize.Sequelize(_config.databaseConfig.dev.databaseName, _config.databaseConfig.dev.username, _config.databaseConfig.dev.password, {
    host: _config.databaseConfig.dev.host,
    dialect: 'postgres'
  });
} else if (nodeEnv === 'prod') {
  exports.sequelize = sequelize = new _sequelize.Sequelize(_config.databaseConfig.dev.databaseName, _config.databaseConfig.dev.username, _config.databaseConfig.dev.password, {
    host: _config.databaseConfig.dev.host,
    dialect: 'postgres'
  });
} else {
  throw new Error('Unsupported database dialect');
}