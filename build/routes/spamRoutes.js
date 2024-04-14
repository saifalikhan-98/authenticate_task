"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _spamController = require("../controllers/spamController.js");
var _verifyToken = require("../middleware/verifyToken.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const spamRouter = _express.default.Router();
spamRouter.post('', _verifyToken.verifyToken, _spamController.SpamController.markSpam);
spamRouter.get('', _spamController.SpamController.getSpamByPhoneNumber);
var _default = exports.default = spamRouter;