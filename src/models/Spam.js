import { sequelize, DataTypes } from '../utils/database.js';
import { User } from './User.js'; // Importing User model to define associations

export const Spam = sequelize.define('Spam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [10, 10], // Specifies that the length of the phoneNumber field should be exactly 10 characters
      isNumeric: true, // Ensures that the phoneNumber contains only numeric characters
    }
  },
  spamReport: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Set default value to current timestamp
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Set default value to current timestamp
    onUpdate: DataTypes.NOW // Update timestamp when record is updated
  }
});

// Define associations with User model

export default Spam;
