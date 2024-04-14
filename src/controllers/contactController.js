import { Op } from 'sequelize'; // Add this import statement for Sequelize operators
import { Contact } from "../models/Contact.js";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
// Controller for user-related operations
export const ContactController = {


    async addContact(req, res) {
        try {
          const userId = req.user.userId;
          const { name, phoneNumber } = req.body;
          
         //check if contact already added
          const contactAdded=await Contact.findOne({where:{phoneNumber:phoneNumber, UserId:userId}})
          if(contactAdded){
            return res.status(400).json({ error: 'Contact already exists with this phone number' });
          }

           // Create a new contact for the user
          const contact = await Contact.create({
            name,
            phoneNumber,
            UserId: userId // Associate the contact with the user
          });
    
          res.status(201).json(contact);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
  
  async getContacts(req, res) {
    try {
        const userId = req.user.userId;

      // Find all contacts for the specified user
      const contacts = await Contact.findAll({ where: { UserId:userId } });

      res.json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server'})
    }
  },
  async searchContacts(req, res) {
    try {
      const userId = req.user.userId;
      const { query } = req.query;

      // Search contacts for the specified user by name or phone number
      const searchResults = await Contact.findAll({
        where: {
          UserId:userId,
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } },
            { phoneNumber: { [Op.iLike]: `%${query}%` } }
          ]
        }
      });

      res.json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
