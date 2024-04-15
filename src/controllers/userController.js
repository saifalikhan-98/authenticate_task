import { Op } from 'sequelize'; // Add this import statement for Sequelize operators

import { User } from "../models/User.js"
import Spam from "../models/Spam.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { passwordValidator } from '../utils/passwordValidator.js'; // Import password validator utility


// Load environment variables from .env file
dotenv.config();
// Controller for user-related operations
export const UserController = {

  // Please note that user registration can be leveraged with a method to add verification code , due to no free sms providers I dint do this implementation
  async register(req, res) {
    try {
      const { name, phoneNumber, email, password } = req.body;

      // Check if user with the same phone number already exists
      const existingUser = await User.findOne({ where: { phoneNumber } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists with this phone number' });
      }

      const passwordError = passwordValidator(password);
      if (passwordError) {
      return res.status(400).json({ error: passwordError });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        name,
        phoneNumber,
        email,
        password: hashedPassword // Save the hashed password
      });

      res.status(201).json({
        "name":name,"email":email, "phoneNumber":phoneNumber
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error:-' + error });
    }
  },

  // this method can be leveraged with check if user is verified and let user login
  async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ where: { phoneNumber } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Validate password
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      // we can provide extra layer of security by encrypting and signing payload but I have kept very basic security for now
      const token = jwt.sign({ user: {userId:user.id,name:user.name, phoneNumber:user.phoneNumber} }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send token to client
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  
  async markSpam(req, res) {
    try {
      const { phoneNumber } = req.body

      // Check if the phone number is already marked as spam
      const existingSpam = await Spam.findOne({ where: { phoneNumber } });
      if (existingSpam) {
        return res.status(400).json({ error: 'This number is already marked as spam' });
      }

      // Create a new spam record
      
      const spamRecord = await Spam.create({
        phoneNumber
      });

      res.status(201).json(spamRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async search(req, res) {
    try {
      const { query } = req.query;
      console.log(query)
      // Search by name
      const searchByNameResults = await User.findAll({
        where: {
          name: { [Op.iLike]: `%${query}%` }
        }
      });

      // Search by phone number
      let searchByPhoneNumberResults = [];
      if (!isNaN(query)) {
        // If the query is a valid phone number, search contacts
        searchByPhoneNumberResults = await  User.findAll({
          where: {
            phoneNumber: { [Op.iLike]: `%${query}%` }
          },
         
        });
      } else {
        // If the query is not a valid phone number, search users
        searchByPhoneNumberResults = await User.findAll({
          where: {
            phoneNumber: { [Op.iLike]: `%${query}%` }
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
      res.status(500).json({ error: 'Internal server error' });
    }
  },

 // This method is an unimplemented feature that would validate user with OTP to check user authenticity

  async matchVerificationCode(userId, verificationCode) {
    try {
      // Find the UserVerification entry associated with the user
      const userVerification = await UserVerification.findOne({ where: { UserId: userId } });

      if (!userVerification) {
        return false; // No verification entry found
      }

      // Compare the provided verification code with the saved hashed code
      return await bcrypt.compare(verificationCode, userVerification.verificationCode);
    } catch (error) {
      console.error(error);
      throw new Error('Error matching verification code');
    }
  },
};
