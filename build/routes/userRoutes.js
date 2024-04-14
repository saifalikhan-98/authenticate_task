"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../controllers/userController.js");
var _contactController = require("../controllers/contactController.js");
var _verifyToken = require("../middleware/verifyToken.js");
var _userSerializer = require("../serializers/userSerializer.js");
var _responseMiddleware = require("../middleware/responseMiddleware.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userRouter = _express.default.Router();
userRouter.post('/register/', _userSerializer.validateRegistrationUserInput, _userController.UserController.register, _responseMiddleware.responseMiddleware);
userRouter.post('/login', _userController.UserController.login, _responseMiddleware.responseMiddleware);
userRouter.get('/search', _verifyToken.verifyToken, _userController.UserController.search, _responseMiddleware.responseMiddleware);
var _default = exports.default = userRouter;