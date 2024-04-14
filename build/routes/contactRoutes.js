"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _contactController = require("../controllers/contactController.js");
var _verifyToken = require("../middleware/verifyToken.js");
var _responseMiddleware = require("../middleware/responseMiddleware.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const contactRouter = _express.default.Router();
contactRouter.post('', _verifyToken.verifyToken, _contactController.ContactController.addContact);
contactRouter.get('', _verifyToken.verifyToken, _contactController.ContactController.getContacts, _responseMiddleware.responseMiddleware);
contactRouter.get('/search', _verifyToken.verifyToken, _contactController.ContactController.searchContacts, _responseMiddleware.responseMiddleware);
var _default = exports.default = contactRouter;