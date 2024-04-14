import { sequelize, DataTypes } from '../utils/database.js';
import { User } from './User.js'; // Importing User model to define associations

export const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 10], // Specifies that the length of the phoneNumber field should be exactly 10 characters
      isNumeric: true, // Ensures that the phoneNumber contains only numeric characters
    }
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
