"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loggerMiddleware = exports.errorLoggerMiddleware = void 0;
var _morgan = _interopRequireDefault(require("morgan"));
var _winston = require("winston");
var _url = require("url");
var _path = require("path");
var _dateFns = require("date-fns");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Get the current date in the format YYYY-MM-DD
const currentDate = (0, _dateFns.format)(new Date(), 'yyyy-MM-dd');
const _filename = (0, _url.fileURLToPath)(import.meta.url);
const _dirname = (0, _path.dirname)(_filename);

// Configure the logger
const logger = (0, _winston.createLogger)({
  transports: [new _winston.transports.File({
    filename: (0, _path.join)(_dirname, `../../logs/error_${currentDate}.log`),
    level: 'error',
    // Log only errors
    format: _winston.format.combine(_winston.format.timestamp(), _winston.format.json())
  }), new _winston.transports.File({
    filename: (0, _path.join)(_dirname, `../../logs/access_${currentDate}.log`),
    format: _winston.format.combine(_winston.format.timestamp(), _winston.format.json())
  })]
});

// Create a stream for morgan to write to
const accessLogStream = {
  write: message => {
    logger.info(message.trim()); // Trim the message to remove extra new lines
  }
};

// Middleware to log HTTP requests
const loggerMiddleware = exports.loggerMiddleware = (0, _morgan.default)('combined', {
  stream: accessLogStream
});

// Middleware to log errors
const errorLoggerMiddleware = (err, req, res, next) => {
  logger.error(err.stack); // Log the stack trace of the error
  next(err);
};
exports.errorLoggerMiddleware = errorLoggerMiddleware;