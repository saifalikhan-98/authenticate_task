// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes.js'
import contactRouter from './routes/contactRoutes.js';
import spamRouter from './routes/spamRoutes.js';
import { sequelize } from './utils/database.js';
import { loggerMiddleware, errorLoggerMiddleware } from './middleware/logger.js'; // Import errorLoggerMiddleware
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();
// Create Express application
const app = express();
const PORT = process.env.PORT;
console.log(PORT)

// Use JSON middleware for parsing request bodies
app.use(bodyParser.json());
app.use(loggerMiddleware);


// Add CORS middleware with custom settings , note that this is just a sample Cors settings, it may vary if this will be used by frontend
app.use(cors({
  origin: 'http://localhost:3000/', // Allow requests from this origin
  methods: ['GET', 'POST', 'DELETE','PUT','PATCH'], // Allow only specified HTTP methods
  credentials: true // Allow sending cookies cross-origin
}));

// API routes
app.use('/user/', userRouter);
app.use('/contacts/', contactRouter)
app.use('/spam', spamRouter)


// Error handling middleware
app.use(errorLoggerMiddleware);

// Synchronize the database models with the database and start the servers
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
