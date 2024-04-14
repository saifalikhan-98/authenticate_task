import { sequelize, DataTypes } from '../utils/database.js';
import { Contact } from './Contact.js';
import { Spam } from './Spam.js'

export const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Ensures that the value of the email field is a valid email address
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
   
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

// Define associations with Contact model
User.hasMany(Contact);
Contact.belongsTo(User);
Spam.belongsToMany(User, { through: 'SpamUser' });


export default User;
