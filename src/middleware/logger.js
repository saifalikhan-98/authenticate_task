import morgan from 'morgan';
import { createLogger, transports, format } from 'winston';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { format as dateFormat} from 'date-fns';

// Get the current date in the format YYYY-MM-DD
const currentDate = dateFormat(new Date(), 'yyyy-MM-dd');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure the logger
const logger = createLogger({
  transports: [
    new transports.File({
      filename: join(__dirname, `../../logs/error_${currentDate}.log`),
      level: 'error', // Log only errors
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    }),
    new transports.File({
      filename: join(__dirname, `../../logs/access_${currentDate}.log`),
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
});

// Create a stream for morgan to write to
const accessLogStream = {
  write: (message) => {
    logger.info(message.trim()); // Trim the message to remove extra new lines
  }
};

// Middleware to log HTTP requests
export const loggerMiddleware = morgan('combined', { stream: accessLogStream });

// Middleware to log errors
export const errorLoggerMiddleware = (err, req, res, next) => {
  logger.error(err.stack); // Log the stack trace of the error
  next(err);
};
