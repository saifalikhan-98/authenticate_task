"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _userRoutes = _interopRequireDefault(require("./src/routes/userRoutes.js"));
var _contactRoutes = _interopRequireDefault(require("./src/routes/contactRoutes.js"));
var _spamRoutes = _interopRequireDefault(require("./src/routes/spamRoutes.js"));
var _database = require("./src/utils/database.js");
var _logger = require("./src/middleware/logger.js");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Import necessary modules

// Import errorLoggerMiddleware

// Load environment variables from .env file
_dotenv.default.config();
// Create Express application
const app = (0, _express.default)();
const PORT = process.env.PORT;
console.log(PORT);

// Use JSON middleware for parsing request bodies
app.use(_bodyParser.default.json());
app.use(_logger.loggerMiddleware);

// Add CORS middleware with custom settings , note that this is just a sample Cors settings, it may vary if this will be used by frontend
app.use((0, _cors.default)({
  origin: 'http://localhost:3000/',
  // Allow requests from this origin
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  // Allow only specified HTTP methods
  credentials: true // Allow sending cookies cross-origin
}));

// API routes
app.use('/user/', _userRoutes.default);
app.use('/contacts/', _contactRoutes.default);
app.use('/spam', _spamRoutes.default);

// Error handling middleware
app.use(_logger.errorLoggerMiddleware);

// Synchronize the database models with the database and start the servers
_database.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});