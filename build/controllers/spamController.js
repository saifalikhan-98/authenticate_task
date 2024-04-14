"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpamController = void 0;
var _Spam = require("../models/Spam.js");
var _database = require("../utils/database.js");
const SpamController = exports.SpamController = {
  async markSpam(req, res) {
    try {
      const {
        phoneNumber
      } = req.body;
      const currentUser = req.user.userId;

      // Find the spam record with the provided phone number
      let spamRecord = await _Spam.Spam.findOne({
        where: {
          phoneNumber
        }
      });
      if (!spamRecord) {
        // If the spam number does not exist, create a new record
        spamRecord = await _Spam.Spam.create({
          phoneNumber
        });
      }

      // Check if the current user is already associated with the spam record
      const userAlreadyAssociated = await spamRecord.hasUser(currentUser);
      console.log(userAlreadyAssociated);
      if (!userAlreadyAssociated) {
        // If the user is not associated, associate the user with the spam record
        let currentSpamReport = spamRecord.spamReport || 0;

        // Increment spamReport count
        currentSpamReport++;

        // Update the spamReport count
        await spamRecord.update({
          spamReport: currentSpamReport
        });

        // Associate the spam record with the current user
        await spamRecord.addUser(currentUser.id);
      }
      res.status(201).json({
        message: 'Number marked as spam successfully'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  },
  async getSpamByPhoneNumber(req, res) {
    try {
      const {
        phoneNumber
      } = req.query;
      let spamRecord = await _Spam.Spam.findOne({
        where: {
          phoneNumber
        }
      });
      if (!spamRecord) {
        // If the spam number is not present, return "not spam"
        return res.json({
          spam: 'not spam'
        });
      }
      const spamReports = spamRecord.spamReport;

      // Determine the spam status based on the spamReports count
      let spamStatus;
      if (spamReports >= 6) {
        spamStatus = 'spam';
      } else if (spamReports >= 2) {
        spamStatus = 'potential spam';
      } else {
        spamStatus = 'not spam';
      }
      res.json({
        spam: spamStatus
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
};