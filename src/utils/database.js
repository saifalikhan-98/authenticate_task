import { Sequelize, DataTypes } from 'sequelize';
import { databaseConfig } from '../../config.js'; // Adjust the path as needed
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the database configuration based on the current environment
const { dialect, ...rest } = databaseConfig.getDatabaseConfig();
console.log("data",dialect)
const nodeEnv=process.env.NODE_ENV
// Initialize Sequelize with the appropriate configuration
let sequelize;
if (nodeEnv === 'test') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: rest.storage
  });
} else if (nodeEnv === 'dev') {
  sequelize = new Sequelize(databaseConfig.dev.databaseName,databaseConfig.dev.username,databaseConfig.dev.password, {
    host:databaseConfig.dev.host,
    dialect: 'postgres',

  });
}else if (nodeEnv === 'prod') {
  sequelize =new Sequelize(databaseConfig.dev.databaseName,databaseConfig.dev.username,databaseConfig.dev.password, {
    host:databaseConfig.dev.host,
    dialect: 'postgres',

  });
}
else {
  throw new Error('Unsupported database dialect');
}

export {sequelize, DataTypes};