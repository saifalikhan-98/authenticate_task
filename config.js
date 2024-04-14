import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


export const databaseConfig = {
    getDatabaseConfig: function() {
      const env = process.env.NODE_ENV || 'dev ';
      console.log(this[env])
      return this[env];
    },
    
    dev: {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {
            require: false,
          }
        },
        username:process.env.DB_USERNAME,
        host:process.env.DB_HOST,
        password:process.env.DB_PASSWORD,
        databaseName:process.env.DB_NAME,
        connectionString: process.env.DATABASE_URL
      
    },
    test: {
      dialect: 'sqlite',
      storage: 'database.test.sqlite'
    },
    prod: {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: false,
        }
      },
      username:process.env.DB_USERNAME,
      host:process.env.DB_HOST,
      password:process.env.DB_PASSWORD,
      databaseName:process.env.DB_NAME,
      connectionString: process.env.DATABASE_URL

    }
  };
  
